const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { auth, adminAuth } = require('../middleware/auth');

// Get all news articles (Public)
router.get('/', async (req, res) => {
  try {
    const { status = 'published', limit = 10, offset = 0 } = req.query;
    
    let whereClause = '';
    let queryParams = [];
    
    if (status !== 'all') {
      whereClause = 'WHERE status = ?';
      queryParams.push(status);
    }
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM news ${whereClause}`;
    const [countResult] = await pool.execute(countQuery, queryParams);
    const total = parseInt(countResult[0].count);

    // Get articles
    const articlesQuery = `
      SELECT * FROM news 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    
    queryParams.push(parseInt(limit), parseInt(offset));
    const [result] = await pool.execute(articlesQuery, queryParams);

    res.json({
      articles: result,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single news article (Public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Get news article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create news article (Admin only)
router.post('/', auth, adminAuth, async (req, res) => {
  try {
    const { title, content, excerpt, author, status = 'draft' } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required' });
    }

    const [result] = await pool.execute(`
      INSERT INTO news (title, content, excerpt, author, status, published_at) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      title,
      content,
      excerpt || '',
      author,
      status,
      status === 'published' ? new Date() : null
    ]);

    const article = {
      id: result.insertId,
      title,
      content,
      excerpt,
      author,
      status,
      published_at: status === 'published' ? new Date() : null,
      created_at: new Date(),
      updated_at: new Date()
    };

    res.status(201).json({
      message: 'Article created successfully',
      article
    });
  } catch (error) {
    console.error('Create news article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update news article (Admin only)
router.put('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, excerpt, author, status } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: 'Title, content, and author are required' });
    }

    // Check if article exists
    const [existing] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Update article
    const [result] = await pool.execute(`
      UPDATE news 
      SET title = ?, content = ?, excerpt = ?, author = ?, status = ?, 
          published_at = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [
      title,
      content,
      excerpt || '',
      author,
      status,
      status === 'published' && existing[0].status !== 'published' ? new Date() : existing[0].published_at,
      id
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Get updated article
    const [updatedArticle] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    res.json({
      message: 'Article updated successfully',
      article: updatedArticle[0]
    });
  } catch (error) {
    console.error('Update news article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete news article (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM news WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete news article error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get news statistics (Admin only)
router.get('/stats/overview', auth, adminAuth, async (req, res) => {
  try {
    const [statusResult] = await pool.execute(`
      SELECT 
        status,
        COUNT(*) as count
      FROM news 
      GROUP BY status
      ORDER BY count DESC
    `);

    const [totalResult] = await pool.execute('SELECT COUNT(*) as total FROM news');
    const total = parseInt(totalResult[0].total);

    const [monthlyResult] = await pool.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM news 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month
    `);

    res.json({
      total,
      statusBreakdown: statusResult,
      monthlyTrends: monthlyResult
    });
  } catch (error) {
    console.error('Get news stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;