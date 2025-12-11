# API Testing Guide

## Using cURL

### 1. Health Check
```bash
curl http://localhost:3000/health
```

### 2. Search for Biryani (150-300 price range)
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

### 3. Search for Chicken (190-250 price range)
```bash
curl "http://localhost:3000/search/dishes?name=chicken&minPrice=190&maxPrice=250"
```

### 4. Search for Vegetable (100-200 price range)
```bash
curl "http://localhost:3000/search/dishes?name=vegetable&minPrice=100&maxPrice=200"
```

### 5. Search for Mutton (250-320 price range)
```bash
curl "http://localhost:3000/search/dishes?name=mutton&minPrice=250&maxPrice=320"
```

### 6. Error Cases

#### Missing Dish Name
```bash
curl "http://localhost:3000/search/dishes?minPrice=150&maxPrice=300"
```

#### Missing Price Range
```bash
curl "http://localhost:3000/search/dishes?name=biryani"
```

#### Invalid Price Values
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=abc&maxPrice=300"
```

#### Min Price > Max Price
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=500&maxPrice=100"
```

## Using Postman

1. **Create a new request**
   - Method: GET
   - URL: `http://localhost:3000/search/dishes`

2. **Add Query Parameters**
   - name: biryani
   - minPrice: 150
   - maxPrice: 300

3. **Send request** and check the response

## Using JavaScript/Node.js

```javascript
// Example using node-fetch or axios
const axios = require('axios');

async function searchDishes() {
  try {
    const response = await axios.get('http://localhost:3000/search/dishes', {
      params: {
        name: 'biryani',
        minPrice: 150,
        maxPrice: 300
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

searchDishes();
```

## Sample Responses

### Success Response
```json
{
  "restaurants": [
    {
      "restaurantId": 1,
      "restaurantName": "Hyderabadi Spice House",
      "city": "Hyderabad",
      "dishName": "Chicken Biryani",
      "dishPrice": 220,
      "orderCount": 96
    },
    {
      "restaurantId": 4,
      "restaurantName": "Kolkata Biryani Palace",
      "city": "Kolkata",
      "dishName": "Chicken Biryani",
      "dishPrice": 195,
      "orderCount": 89
    }
  ]
}
```

### Error Response (Missing Parameter)
```json
{
  "error": "Dish name (name) is required"
}
```

## Expected Results for Sample Data

### Search for "biryani" with price 150-300
Expected results: ~20-30 restaurants (various biryani types)

### Search for "chicken" with price 190-250
Expected results: ~6-8 restaurants (chicken biryani within price range)

### Search for "vegetable" with price 100-200
Expected results: ~6-8 restaurants (vegetable biryani within price range)

### Search for "mutton" with price 250-320
Expected results: ~5-7 restaurants (mutton biryani within price range)

## Database Verification

```sql
-- Check all restaurants
SELECT * FROM restaurants;

-- Check all menu items
SELECT r.name as restaurant, m.name as dish, m.price FROM menu_items m
JOIN restaurants r ON m.restaurant_id = r.id;

-- Check orders
SELECT r.name, m.name, o.order_count FROM orders o
JOIN menu_items m ON o.menu_item_id = m.id
JOIN restaurants r ON o.restaurant_id = r.id;
```
