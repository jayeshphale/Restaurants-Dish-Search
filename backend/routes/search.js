const express = require('express');
const router = express.Router();
const pool = require('../db');

/**
 * Search for restaurants by dish name with price range filter
 * GET /search/dishes?name=<dishName>&minPrice=<minPrice>&maxPrice=<maxPrice>
 * 
 * Returns top 10 restaurants where the dish has been ordered the most
 * within the specified price range
 */
router.get('/dishes', async (req, res) => {
  try {
    const { name, minPrice, maxPrice } = req.query;

    // Validate required parameters
    if (!name) {
      return res.status(400).json({
        error: 'Dish name (name) is required'
      });
    }

    if (!minPrice || !maxPrice) {
      return res.status(400).json({
        error: 'Both minPrice and maxPrice are required'
      });
    }

    // Validate price range
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (isNaN(min) || isNaN(max) || min < 0 || max < 0) {
      return res.status(400).json({
        error: 'minPrice and maxPrice must be valid non-negative numbers'
      });
    }

    if (min > max) {
      return res.status(400).json({
        error: 'minPrice must be less than or equal to maxPrice'
      });
    }

    const connection = await pool.getConnection();

    try {
      // Query to find restaurants with the dish in the price range
      const query = `
        SELECT 
          r.id as restaurantId,
          r.name as restaurantName,
          r.city,
          m.name as dishName,
          m.price as dishPrice,
          SUM(o.order_count) as orderCount
        FROM restaurants r
        INNER JOIN menu_items m ON r.id = m.restaurant_id
        INNER JOIN orders o ON m.id = o.menu_item_id
        WHERE LOWER(m.name) LIKE LOWER(?)
          AND m.price >= ?
          AND m.price <= ?
        GROUP BY r.id, m.id
        ORDER BY orderCount DESC
        LIMIT 10
      `;

      const [results] = await connection.execute(query, [
        `%${name}%`,
        min,
        max
      ]);

      const restaurants = results.map(row => ({
        restaurantId: row.restaurantId,
        restaurantName: row.restaurantName,
        city: row.city,
        dishName: row.dishName,
        dishPrice: parseFloat(row.dishPrice),
        orderCount: parseInt(row.orderCount)
      }));

      res.json({
        restaurants
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

module.exports = router;
