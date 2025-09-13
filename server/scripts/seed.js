const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedDatabase = async () => {
  let connection;
  try {
    // Connect to database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'sunrise_school',
      port: process.env.DB_PORT || 3306
    });

    console.log('🌱 Starting database seeding...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    await connection.execute(`
      INSERT IGNORE INTO users (name, email, password, role, is_active) 
      VALUES (?, ?, ?, ?, ?)
    `, ['Admin User', 'admin@sunriseschool.com', adminPassword, 'admin', true]);
    
    console.log('✅ Admin user created (email: admin@sunriseschool.com, password: admin123)');

    // Add sample news
    await connection.execute(`
      INSERT IGNORE INTO news (title, content, excerpt, author, status, published_at) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `, [
      'Welcome to Sunrise Public School',
      'We are excited to welcome all students and parents to another academic year filled with learning, growth, and achievement. Our dedicated faculty is committed to providing the best education possible.',
      'Welcome message for the new academic year',
      'Principal',
      'published'
    ]);

    await connection.execute(`
      INSERT IGNORE INTO news (title, content, excerpt, author, status, published_at) 
      VALUES (?, ?, ?, ?, ?, NOW())
    `, [
      'Annual Sports Day 2024',
      'Our annual sports day was a huge success with students participating in various athletic events. Congratulations to all participants and winners!',
      'Annual sports day celebration highlights',
      'Sports Department',
      'published'
    ]);

    console.log('✅ Sample news articles added');

    // Add sample events
    await connection.execute(`
      INSERT IGNORE INTO events (title, description, event_date, event_time, location, event_type, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      'Parent-Teacher Meeting',
      'Quarterly parent-teacher meeting to discuss student progress and academic performance.',
      '2024-12-15',
      '09:00:00',
      'School Auditorium',
      'academic',
      'upcoming'
    ]);

    await connection.execute(`
      INSERT IGNORE INTO events (title, description, event_date, event_time, location, event_type, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      'Annual Day Celebration',
      'Annual day celebration with cultural programs, awards ceremony, and student performances.',
      '2024-12-20',
      '18:00:00',
      'School Ground',
      'cultural',
      'upcoming'
    ]);

    console.log('✅ Sample events added');

    // Add sample gallery items
    await connection.execute(`
      INSERT IGNORE INTO gallery (title, description, image_url, category, is_featured) 
      VALUES (?, ?, ?, ?, ?)
    `, [
      'School Building',
      'Main school building with modern infrastructure',
      '/images/school-building.jpg',
      'infrastructure',
      true
    ]);

    await connection.execute(`
      INSERT IGNORE INTO gallery (title, description, image_url, category, is_featured) 
      VALUES (?, ?, ?, ?, ?)
    `, [
      'Science Lab',
      'Well-equipped science laboratory for practical learning',
      '/images/science-lab.jpg',
      'academics',
      true
    ]);

    console.log('✅ Sample gallery items added');

    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

// Run seeding
seedDatabase();
