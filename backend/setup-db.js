const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  console.log('Attempting to connect to MySQL...');
  
  try {
    // First, connect without database to create it
    const initialConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('✓ Connected to MySQL server');

    const dbName = process.env.DB_NAME || 'restaurant_db';
    
    // Create database
    await initialConnection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✓ Database '${dbName}' created/verified`);

    // Switch to database
    await initialConnection.query(`USE ${dbName}`);

    // Drop existing tables for fresh setup
    console.log('Recreating tables...');
    await initialConnection.query('DROP TABLE IF EXISTS orders');
    await initialConnection.query('DROP TABLE IF EXISTS menu_items');
    await initialConnection.query('DROP TABLE IF EXISTS restaurants');

    // Create restaurants table
    const createRestaurantsTable = `
      CREATE TABLE restaurants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await initialConnection.query(createRestaurantsTable);
    console.log('✓ restaurants table created');

    // Create menu_items table
    const createMenuTable = `
      CREATE TABLE menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
      )
    `;
    await initialConnection.query(createMenuTable);
    console.log('✓ menu_items table created');

    // Create orders table
    const createOrdersTable = `
      CREATE TABLE orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        menu_item_id INT NOT NULL,
        restaurant_id INT NOT NULL,
        order_count INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
      )
    `;
    await initialConnection.query(createOrdersTable);
    console.log('✓ orders table created');

    await initialConnection.end();
    console.log('✓ Database setup completed successfully!');
    return true;

  } catch (error) {
    console.error('✗ Database setup failed:');
    console.error('  Error:', error.message);
    console.error('\n  Make sure:');
    console.error('  1. MySQL server is running');
    console.error('  2. MySQL credentials in .env are correct');
    console.error('  3. MySQL user has permission to create databases');
    process.exit(1);
  }
}

setupDatabase();
