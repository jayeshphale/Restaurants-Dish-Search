const express = require("express");
const pool = require("../db"); // promise pool

const router = express.Router();

router.get("/dishes", async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;

    const [results] = await pool.query(
      `SELECT 
         r.id as restaurantId,
         r.name as restaurantName,
         r.city,
         m.name as dishName,
         m.price as dishPrice,
         SUM(o.order_count) as orderCount
       FROM restaurants r
       JOIN menu_items m ON r.id = m.restaurant_id
       JOIN orders o ON m.id = o.menu_item_id
       WHERE LOWER(m.name) LIKE ?
         AND m.price BETWEEN ? AND ?
       GROUP BY r.id, m.id
       ORDER BY orderCount DESC
       LIMIT 10`,
      [`%${name}%`, minPrice, maxPrice]
    );

    res.json({ restaurants: results });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
