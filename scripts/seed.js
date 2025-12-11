import pool from "../db.js";
import dotenv from "dotenv";
dotenv.config();

const seedData = async () => {
  const connection = await pool.getConnection();  // promise pool has this

  try {
    await connection.beginTransaction();

    // Clear existing data
    await connection.query("DELETE FROM orders");
    await connection.query("DELETE FROM menu_items");
    await connection.query("DELETE FROM restaurants");

    console.log("✓ Cleared existing data");

    // Insert restaurants
    const restaurantsData = [
      { name: "Hyderabadi Spice House", city: "Hyderabad" },
      { name: "Mumbai Masala Kitchen", city: "Mumbai" },
      { name: "Delhi Delights", city: "Delhi" },
      { name: "Kolkata Biryani Palace", city: "Kolkata" },
      { name: "Chennai Flavors", city: "Chennai" },
      { name: "Bangalore Spice Corner", city: "Bangalore" },
      { name: "Lucknow Kebab House", city: "Lucknow" },
      { name: "Jaipur Royal Cuisine", city: "Jaipur" },
    ];

    const restaurantIds = {};

    for (const r of restaurantsData) {
      const [result] = await connection.query(
        "INSERT INTO restaurants (name, city) VALUES (?, ?)",
        [r.name, r.city]
      );
      restaurantIds[r.name] = result.insertId;
    }

    console.log(`✓ Inserted ${restaurantsData.length} restaurants`);

    // Insert menu items and orders
    const menuData = [
      // Hyderabadi
      { restaurantName: "Hyderabadi Spice House", name: "Chicken Biryani", price: 220, orders: 96 },
      { restaurantName: "Hyderabadi Spice House", name: "Mutton Biryani", price: 280, orders: 78 },
      { restaurantName: "Hyderabadi Spice House", name: "Vegetable Biryani", price: 180, orders: 45 },
      { restaurantName: "Hyderabadi Spice House", name: "Biryani Combo", price: 350, orders: 62 },

      // Mumbai
      { restaurantName: "Mumbai Masala Kitchen", name: "Chicken Biryani", price: 200, orders: 84 },
      { restaurantName: "Mumbai Masala Kitchen", name: "Vegetable Biryani", price: 160, orders: 52 },
      { restaurantName: "Mumbai Masala Kitchen", name: "Egg Biryani", price: 170, orders: 38 },
      { restaurantName: "Mumbai Masala Kitchen", name: "Paneer Biryani", price: 190, orders: 41 },

      // Delhi
      { restaurantName: "Delhi Delights", name: "Chicken Biryani", price: 210, orders: 71 },
      { restaurantName: "Delhi Delights", name: "Mutton Biryani", price: 270, orders: 65 },
      { restaurantName: "Delhi Delights", name: "Vegetable Biryani", price: 150, orders: 48 },
      { restaurantName: "Delhi Delights", name: "Fish Biryani", price: 290, orders: 55 },

      // Kolkata
      { restaurantName: "Kolkata Biryani Palace", name: "Chicken Biryani", price: 195, orders: 89 },
      { restaurantName: "Kolkata Biryani Palace", name: "Mutton Biryani", price: 260, orders: 76 },
      { restaurantName: "Kolkata Biryani Palace", name: "Vegetable Biryani", price: 140, orders: 60 },
      { restaurantName: "Kolkata Biryani Palace", name: "Prawn Biryani", price: 310, orders: 51 },

      // Chennai
      { restaurantName: "Chennai Flavors", name: "Chicken Biryani", price: 230, orders: 73 },
      { restaurantName: "Chennai Flavors", name: "Vegetable Biryani", price: 170, orders: 44 },
      { restaurantName: "Chennai Flavors", name: "Fish Biryani", price: 280, orders: 58 },

      // Bangalore
      { restaurantName: "Bangalore Spice Corner", name: "Chicken Biryani", price: 215, orders: 79 },
      { restaurantName: "Bangalore Spice Corner", name: "Vegetable Biryani", price: 165, orders: 50 },
      { restaurantName: "Bangalore Spice Corner", name: "Mutton Biryani", price: 275, orders: 68 },

      // Lucknow
      { restaurantName: "Lucknow Kebab House", name: "Chicken Biryani", price: 225, orders: 82 },
      { restaurantName: "Lucknow Kebab House", name: "Mutton Biryani", price: 285, orders: 70 },
      { restaurantName: "Lucknow Kebab House", name: "Vegetable Biryani", price: 155, orders: 46 },

      // Jaipur
      { restaurantName: "Jaipur Royal Cuisine", name: "Chicken Biryani", price: 240, orders: 88 },
      { restaurantName: "Jaipur Royal Cuisine", name: "Vegetable Biryani", price: 175, orders: 54 },
      { restaurantName: "Jaipur Royal Cuisine", name: "Mutton Biryani", price: 295, orders: 72 },
    ];

    let menuCount = 0, orderCount = 0;

    for (const item of menuData) {
      const restId = restaurantIds[item.restaurantName];

      const [menuRes] = await connection.query(
        "INSERT INTO menu_items (restaurant_id, name, price) VALUES (?, ?, ?)",
        [restId, item.name, item.price]
      );

      await connection.query(
        "INSERT INTO orders (menu_item_id, restaurant_id, order_count) VALUES (?, ?, ?)",
        [menuRes.insertId, restId, item.orders]
      );

      menuCount++;
      orderCount++;
    }

    console.log(`✓ Inserted ${menuCount} menu items`);
    console.log(`✓ Inserted ${orderCount} orders`);

    await connection.commit();
    console.log("\n✅ Database seeded successfully!");

  } catch (err) {
    await connection.rollback();
    console.error("❌ Seeding failed:", err);
  } finally {
    connection.release();
    pool.end();
  }
};

seedData();
