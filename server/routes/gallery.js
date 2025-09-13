const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, adminAuth } = require('../middleware/auth');

// Get all gallery items (Public)
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 20, offset = 0 } = req.query;
    
    let whereClause = '';
    let queryParams = [];
    let paramCount = 0;
    
    if (category && category !== 'all') {
      whereClause = `WHERE category = ?`;
      queryParams.push(category);
      paramCount++;
    }
    
    if (featured === 'true') {
      if (whereClause) {
        whereClause += ` AND is_featured = ?`;
      } else {
        whereClause = `WHERE is_featured = ?`;
      }
      queryParams.push(true);
      paramCount++;
    }
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM gallery ${whereClause}`;
    const [countResult] = await pool.execute(countQuery, queryParams);
    const total = parseInt(countResult[0].count);

    // Get gallery items
    const galleryQuery = `
      SELECT * FROM gallery 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    
    queryParams.push(parseInt(limit), parseInt(offset));
    const [result] = await pool.execute(galleryQuery, queryParams);

    res.json({
      items: result,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single gallery item (Public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'SELECT * FROM gallery WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Get gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create gallery item (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { title, description, image_url, category, is_featured = false } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({ message: 'Title and image URL are required' });
    }

    const [result] = await pool.execute(`
      INSERT INTO gallery (title, description, image_url, category, is_featured) 
      VALUES (?, ?, ?, ?, ?)
    `, [
      title,
      description || '',
      image_url,
      category || 'events',
      is_featured
    ]);

    const item = {
      id: result.insertId,
      title,
      description: description || '',
      image_url,
      category: category || 'events',
      is_featured,
      created_at: new Date(),
      updated_at: new Date()
    };

    res.status(201).json({
      message: 'Gallery item created successfully',
      item
    });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update gallery item (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image_url, category, is_featured } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({ message: 'Title and image URL are required' });
    }

    // Check if item exists
    const [existing] = await pool.execute(
      'SELECT * FROM gallery WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Update item
    const [result] = await pool.execute(`
      UPDATE gallery 
      SET title = ?, description = ?, image_url = ?, category = ?, is_featured = ?, 
          updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [
      title,
      description || '',
      image_url,
      category || 'events',
      is_featured || false,
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Get updated item
    const [updatedItem] = await pool.execute(
      'SELECT * FROM gallery WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Gallery item updated successfully',
      item: updatedItem[0]
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete gallery item (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM gallery WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get gallery statistics (Admin only)
router.get('/stats/overview', auth, adminAuth, async (req, res) => {
  try {
    const [categoryResult] = await pool.execute(`
      SELECT 
        category,
        COUNT(*) as count
      FROM gallery 
      GROUP BY category
      ORDER BY count DESC
    `);

    const [totalResult] = await pool.execute('SELECT COUNT(*) as total FROM gallery');
    const total = parseInt(totalResult[0].total);

    const [featuredResult] = await pool.execute('SELECT COUNT(*) as featured FROM gallery WHERE is_featured = true');
    const featured = parseInt(featuredResult[0].featured);

    res.json({
      total,
      featured,
      categoryBreakdown: categoryResult
    });
  } catch (error) {
    console.error('Get gallery stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;