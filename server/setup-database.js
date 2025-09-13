const mysql = require('mysql2/promise');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupDatabase() {
  console.log('🔧 MySQL Database Setup for Sunrise School');
  console.log('==========================================\n');

  try {
    // Get database credentials
    const host = await question('MySQL Host (default: localhost): ') || 'localhost';
    const user = await question('MySQL Username (default: root): ') || 'root';
    const password = await question('MySQL Password: ');
    const port = await question('MySQL Port (default: 3306): ') || '3306';
    const dbName = await question('Database Name (default: sunrise_school): ') || 'sunrise_school';

    console.log('\n📊 Testing connection...');

    // Test connection
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      port: parseInt(port)
    });

    console.log('✅ Connected to MySQL successfully!');

    // Create database
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' created or already exists`);

    // Use the database
    await connection.execute(`USE \`${dbName}\``);

    // Create tables
    console.log('\n📋 Creating database tables...');

    // Users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'teacher', 'staff') DEFAULT 'staff',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created');

    // Admissions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        parent_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        grade_applying VARCHAR(10) NOT NULL,
        previous_school VARCHAR(255),
        birth_date DATE NOT NULL,
        address TEXT NOT NULL,
        documents JSON,
        emergency_contact VARCHAR(20),
        medical_conditions TEXT,
        special_needs TEXT,
        additional_info TEXT,
        status ENUM('pending', 'under_review', 'accepted', 'rejected', 'waitlisted') DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Admissions table created');

    // News table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        author VARCHAR(255) NOT NULL,
        featured_image VARCHAR(255),
        status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
        published_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ News table created');

    // Events table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        event_date DATE NOT NULL,
        event_time TIME,
        location VARCHAR(255),
        event_type ENUM('academic', 'sports', 'cultural', 'other') DEFAULT 'other',
        status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Events table created');

    // Gallery table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS gallery (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(255) NOT NULL,
        category ENUM('events', 'academics', 'sports', 'cultural', 'infrastructure') DEFAULT 'events',
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Gallery table created');

    // Contact messages table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        status ENUM('unread', 'read', 'replied', 'archived') DEFAULT 'unread',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Contact messages table created');

    // Create admin user
    const bcrypt = require('bcryptjs');
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    await connection.execute(`
      INSERT IGNORE INTO users (name, email, password, role, is_active) 
      VALUES (?, ?, ?, ?, ?)
    `, ['Admin User', 'admin@sunriseschool.com', adminPassword, 'admin', true]);
    
    console.log('✅ Admin user created (email: admin@sunriseschool.com, password: admin123)');

    // Create .env file
    const envContent = `# Database Configuration
DB_HOST=${host}
DB_USER=${user}
DB_PASSWORD=${password}
DB_NAME=${dbName}
DB_PORT=${port}

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_${Date.now()}

# Server Configuration
PORT=5000
NODE_ENV=development
`;

    require('fs').writeFileSync('.env', envContent);
    console.log('✅ .env file created with database configuration');

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Start the client: cd ../client && npm run dev');
    console.log('3. Access admin panel: http://localhost:3002/admin');
    console.log('4. Login with: admin@sunriseschool.com / admin123');

    await connection.end();
    rl.close();

  } catch (error) {
    console.error('❌ Setup error:', error.message);
    console.log('\n💡 Make sure:');
    console.log('- MySQL is running');
    console.log('- You have the correct username and password');
    console.log('- MySQL server is accessible on the specified host and port');
    rl.close();
  }
}

setupDatabase();
