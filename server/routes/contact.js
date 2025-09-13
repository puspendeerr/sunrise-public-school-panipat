const express = require('express');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const pool = require('../config/database');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || 'your-email@gmail.com',
      pass: process.env.SMTP_PASS || 'your-app-password'
    }
  });
};

// Submit contact form
router.post('/submit', [
  body('name').trim().isLength({ min: 1, max: 255 }),
  body('email').isEmail().normalizeEmail(),
  body('phone').optional().isMobilePhone(),
  body('subject').trim().isLength({ min: 1, max: 255 }),
  body('message').trim().isLength({ min: 10, max: 1000 }),
  body('department').optional().isIn(['general', 'admissions', 'academics', 'administration', 'other'])
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, subject, message, department = 'general' } = req.body;

    // Save to database
    const result = await pool.query(`
      INSERT INTO contact_messages (name, email, phone, subject, message, department)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, created_at
    `, [name, email, phone, subject, message, department]);

    const messageId = result.rows[0].id;

    // Send email notification
    try {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: process.env.SMTP_USER || 'your-email@gmail.com',
        to: process.env.ADMIN_EMAIL || 'admin@sunrisepublicschool.edu',
        subject: `New Contact Form Submission: ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Department:</strong> ${department}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Message ID: ${messageId}</small></p>
        `
      };

      await transporter.sendMail(mailOptions);

      // Send auto-reply to user
      const autoReplyOptions = {
        from: process.env.SMTP_USER || 'your-email@gmail.com',
        to: email,
        subject: 'Thank you for contacting Sunrise Public School',
        html: `
          <h2>Thank you for contacting us!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will get back to you within 24-48 hours.</p>
          <p><strong>Your message:</strong></p>
          <p>${message}</p>
          <hr>
          <p>Best regards,<br>Sunrise Public School Team</p>
        `
      };

      await transporter.sendMail(autoReplyOptions);
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Message sent successfully',
      messageId: messageId
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contact messages (Admin only)
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || '';
    const department = req.query.department || '';

    let whereClause = '';
    let queryParams = [];
    let paramCount = 1;

    const conditions = [];
    if (status) {
      conditions.push(`status = $${paramCount}`);
      queryParams.push(status);
      paramCount++;
    }

    if (department) {
      conditions.push(`department = $${paramCount}`);
      queryParams.push(department);
      paramCount++;
    }

    if (conditions.length > 0) {
      whereClause = `WHERE ${conditions.join(' AND ')}`;
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM contact_messages ${whereClause}`;
    const countResult = await pool.query(countQuery, queryParams);
    const total = parseInt(countResult.rows[0].count);

    // Get messages
    const messagesQuery = `
      SELECT * FROM contact_messages 
      ${whereClause}
      ORDER BY created_at DESC 
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;
    
    queryParams.push(limit, offset);
    const result = await pool.query(messagesQuery, queryParams);

    res.json({
      messages: result.rows,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single contact message (Admin only)
router.get('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'SELECT * FROM contact_messages WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get contact message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update message status (Admin only)
router.put('/:id/status', auth, adminAuth, [
  body('status').isIn(['unread', 'read', 'replied', 'closed']),
  body('reply').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status, reply } = req.body;

    const result = await pool.query(`
      UPDATE contact_messages 
      SET status = $1, replied_at = $2, updated_at = CURRENT_TIMESTAMP 
      WHERE id = $3 
      RETURNING *
    `, [
      status, 
      status === 'replied' ? new Date() : null, 
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Send reply email if provided
    if (reply && status === 'replied') {
      try {
        const transporter = createTransporter();
        
        const mailOptions = {
          from: process.env.SMTP_USER || 'your-email@gmail.com',
          to: result.rows[0].email,
          subject: `Re: ${result.rows[0].subject}`,
          html: `
            <h2>Reply from Sunrise Public School</h2>
            <p>Dear ${result.rows[0].name},</p>
            <p>Thank you for contacting us. Here is our response:</p>
            <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #f97316; margin: 20px 0;">
              ${reply.replace(/\n/g, '<br>')}
            </div>
            <p>If you have any further questions, please don't hesitate to contact us.</p>
            <p>Best regards,<br>Sunrise Public School Team</p>
          `
        };

        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error('Reply email sending error:', emailError);
      }
    }

    res.json({
      message: 'Status updated successfully',
      contactMessage: result.rows[0]
    });
  } catch (error) {
    console.error('Update contact message status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete contact message (Admin only)
router.delete('/:id', auth, adminAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM contact_messages WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Delete contact message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get contact statistics (Admin only)
router.get('/stats/overview', auth, adminAuth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        status,
        COUNT(*) as count,
        COUNT(*) * 100.0 / SUM(COUNT(*)) OVER() as percentage
      FROM contact_messages 
      GROUP BY status
      ORDER BY count DESC
    `);

    const totalResult = await pool.query('SELECT COUNT(*) as total FROM contact_messages');
    const total = parseInt(totalResult.rows[0].total);

    const unreadResult = await pool.query(
      'SELECT COUNT(*) as unread FROM contact_messages WHERE status = $1',
      ['unread']
    );
    const unread = parseInt(unreadResult.rows[0].unread);

    const todayResult = await pool.query(`
      SELECT COUNT(*) as today 
      FROM contact_messages 
      WHERE DATE(created_at) = CURRENT_DATE
    `);
    const today = parseInt(todayResult.rows[0].today);

    res.json({
      total,
      unread,
      today,
      statusBreakdown: result.rows
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
