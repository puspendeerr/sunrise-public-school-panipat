const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/admissions/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDFs, and Word documents are allowed'));
    }
  }
});

// Submit admission application
router.post('/apply', upload.fields([
  { name: 'birthCertificate', maxCount: 1 },
  { name: 'previousMarksheet', maxCount: 1 },
  { name: 'transferCertificate', maxCount: 1 },
  { name: 'passportPhoto', maxCount: 1 },
  { name: 'medicalCertificate', maxCount: 1 }
]), [
  body('studentName').trim().isLength({ min: 1, max: 255 }),
  body('parentName').trim().isLength({ min: 1, max: 255 }),
  body('email').isEmail().normalizeEmail(),
  body('phone').isMobilePhone(),
  body('gradeApplying').isIn(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']),
  body('birthDate').isISO8601(),
  body('address').trim().isLength({ min: 10, max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      studentName,
      parentName,
      email,
      phone,
      gradeApplying,
      previousSchool,
      birthDate,
      address,
      emergencyContact,
      medicalConditions,
      specialNeeds,
      additionalInfo
    } = req.body;

    // Prepare documents object
    const documents = {};
    if (req.files) {
      Object.keys(req.files).forEach(fieldName => {
        if (req.files[fieldName] && req.files[fieldName][0]) {
          documents[fieldName] = req.files[fieldName][0].filename;
        }
      });
    }

    // Insert admission application
    const [result] = await pool.execute(`
      INSERT INTO admissions (
        student_name, parent_name, email, phone, grade_applying, 
        previous_school, birth_date, address, documents, 
        emergency_contact, medical_conditions, special_needs, additional_info
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      studentName,
      parentName,
      email,
      phone,
      gradeApplying,
      previousSchool || null,
      birthDate,
      address,
      JSON.stringify(documents),
      emergencyContact || null,
      medicalConditions || null,
      specialNeeds || null,
      additionalInfo || null
    ]);

    const application = {
      id: result.insertId,
      student_name: studentName,
      email: email,
      status: 'pending',
      created_at: new Date()
    };

    // TODO: Send confirmation email
    // TODO: Send notification to admin

    res.status(201).json({
      message: 'Application submitted successfully',
      applicationId: application.id,
      status: application.status
    });
  } catch (error) {
    console.error('Admission application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all admission applications (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || '';

    let whereClause = '';
    let queryParams = [];
    let paramCount = 1;

    if (status) {
      whereClause = `WHERE status = $${paramCount}`;
      queryParams.push(status);
      paramCount++;
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM admissions ${whereClause}`;
    const [countResult] = await pool.execute(countQuery, queryParams);
    const total = parseInt(countResult[0].count);

    // Get applications
    const applicationsQuery = `
      SELECT * FROM admissions 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;
    
    queryParams.push(limit, offset);
    const [result] = await pool.execute(applicationsQuery, queryParams);

    res.json({
      applications: result,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get admissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single admission application (Admin only)
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'SELECT * FROM admissions WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(result[0]);
  } catch (error) {
    console.error('Get admission application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update admission status (Admin only)
router.put('/:id/status', auth, adminAuth, [
  body('status').isIn(['pending', 'under_review', 'accepted', 'rejected', 'waitlisted']),
  body('notes').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status, notes } = req.body;

    const [result] = await pool.execute(`
      UPDATE admissions 
      SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `, [status, notes, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Get updated application
    const [updatedApp] = await pool.execute(
      'SELECT * FROM admissions WHERE id = ?',
      [id]
    );

    // TODO: Send status update email to applicant

    res.json({
      message: 'Status updated successfully',
      application: updatedApp[0]
    });
  } catch (error) {
    console.error('Update admission status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get admission statistics (Admin only)
router.get('/stats/overview', auth, adminAuth, async (req, res) => {
  try {
    const [result] = await pool.execute(`
      SELECT 
        status,
        COUNT(*) as count,
        COUNT(*) * 100.0 / (SELECT COUNT(*) FROM admissions) as percentage
      FROM admissions 
      GROUP BY status
      ORDER BY count DESC
    `);

    const [totalResult] = await pool.execute('SELECT COUNT(*) as total FROM admissions');
    const total = parseInt(totalResult[0].total);

    const [monthlyResult] = await pool.execute(`
      SELECT 
        DATE_FORMAT(created_at, '%Y-%m') as month,
        COUNT(*) as count
      FROM admissions 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY DATE_FORMAT(created_at, '%Y-%m')
      ORDER BY month
    `);

    res.json({
      total,
      statusBreakdown: result,
      monthlyTrends: monthlyResult
    });
  } catch (error) {
    console.error('Get admission stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Check application status (Public)
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const [result] = await pool.execute(
      'SELECT id, student_name, status, created_at, notes FROM admissions WHERE email = ? ORDER BY created_at DESC',
      [email]
    );

    res.json(result);
  } catch (error) {
    console.error('Check application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
