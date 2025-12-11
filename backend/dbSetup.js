const mysql = require('mysql2/promise');
require('dotenv').config();

// Connection for initial setup (without database specified)
async function setupDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || ''
    });

    console.log('Connected to MySQL server');

    // Create database if not exists
    const dbName = process.env.DB_NAME || 'restaurant_db';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database '${dbName}' ready`);

    // Switch to the database
    await connection.execute(`USE ${dbName}`);

    // Create tables
    const createRestaurantsTable = `
      CREATE TABLE IF NOT EXISTS restaurants (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    const createMenuTable = `
      CREATE TABLE IF NOT EXISTS menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        restaurant_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
      )
    `;

    const createOrdersTable = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        menu_item_id INT NOT NULL,
        restaurant_id INT NOT NULL,
        order_count INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE CASCADE,
        FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
      )
    `;

    await connection.execute(createRestaurantsTable);
    console.log('✓ restaurants table created');

    await connection.execute(createMenuTable);
    console.log('✓ menu_items table created');

    await connection.execute(createOrdersTable);
    console.log('✓ orders table created');

    await connection.end();
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
}

module.exports = { setupDatabase };
