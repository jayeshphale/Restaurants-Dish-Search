# API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
None (public API)

## Content Type
All responses are in JSON format

---

## Endpoints

### 1. Health Check

**Endpoint:** `GET /health`

**Description:** Check if the API server is running and healthy.

**Request:**
```bash
GET /health HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
```json
{
  "status": "OK",
  "message": "Restaurant Dish Search API is running"
}
```

---

### 2. Search Restaurants by Dish

**Endpoint:** `GET /search/dishes`

**Description:** Search for restaurants where a specific dish is available, filtered by price range. Returns the top 10 restaurants where that dish has been ordered the most.

**Request Parameters:**

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| name | string | Yes | Dish name to search (case-insensitive, partial match) | biryani |
| minPrice | number | Yes | Minimum dish price (inclusive) | 150 |
| maxPrice | number | Yes | Maximum dish price (inclusive) | 300 |

**Query String Example:**
```
/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

**Full URL Example:**
```
http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

**Request:**
```bash
GET /search/dishes?name=biryani&minPrice=150&maxPrice=300 HTTP/1.1
Host: localhost:3000
```

**Response (200 OK):**
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
    },
    {
      "restaurantId": 8,
      "restaurantName": "Jaipur Royal Cuisine",
      "city": "Jaipur",
      "dishName": "Chicken Biryani",
      "dishPrice": 240,
      "orderCount": 88
    }
  ]
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| restaurantId | number | Unique identifier for the restaurant |
| restaurantName | string | Name of the restaurant |
| city | string | City where the restaurant is located |
| dishName | string | Name of the dish |
| dishPrice | number | Price of the dish at this restaurant |
| orderCount | number | Total number of times this dish was ordered at this restaurant |

**Sorting:**
Results are sorted in descending order by `orderCount` (most ordered first). Maximum 10 results returned.

---

## Error Responses

### 400 Bad Request - Missing Dish Name
```json
{
  "error": "Dish name (name) is required"
}
```

### 400 Bad Request - Missing Price Range
```json
{
  "error": "Both minPrice and maxPrice are required"
}
```

### 400 Bad Request - Invalid Price Values
```json
{
  "error": "minPrice and maxPrice must be valid non-negative numbers"
}
```

### 400 Bad Request - Invalid Price Range
```json
{
  "error": "minPrice must be less than or equal to maxPrice"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "The requested resource does not exist"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "message": "Error details here"
}
```

---

## Usage Examples

### cURL Examples

**Search for Biryani (150-300 price range):**
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

**Search for Chicken (200-250 price range):**
```bash
curl "http://localhost:3000/search/dishes?name=chicken&minPrice=200&maxPrice=250"
```

**Search for Vegetable (100-200 price range):**
```bash
curl "http://localhost:3000/search/dishes?name=vegetable&minPrice=100&maxPrice=200"
```

### JavaScript/Node.js Example

```javascript
const axios = require('axios');

async function searchRestaurants() {
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

searchRestaurants();
```

### Python Example

```python
import requests

response = requests.get('http://localhost:3000/search/dishes', params={
    'name': 'biryani',
    'minPrice': 150,
    'maxPrice': 300
})

print(response.json())
```

### PowerShell Example

```powershell
$uri = "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
$response = Invoke-WebRequest -Uri $uri -Method Get
$response.Content | ConvertFrom-Json | ConvertTo-Json
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success - Valid request and response returned |
| 400 | Bad Request - Invalid parameters or missing required fields |
| 404 | Not Found - Endpoint doesn't exist |
| 500 | Internal Server Error - Server-side error |

---

## Rate Limiting
Currently no rate limiting. Production deployment should implement rate limiting.

## Data Format Notes

- **Prices** are returned as decimal numbers (e.g., 220.00)
- **OrderCount** is an integer
- **Dish names** are matched case-insensitively with partial matching
- **Results** are limited to maximum 10 restaurants
- **Empty results** return an empty `restaurants` array

---

## Database Schema

The API uses the following database structure:

**restaurants** table:
```sql
id (INT, Primary Key)
name (VARCHAR 255)
city (VARCHAR 255)
created_at (TIMESTAMP)
```

**menu_items** table:
```sql
id (INT, Primary Key)
restaurant_id (INT, Foreign Key)
name (VARCHAR 255)
price (DECIMAL 10,2)
created_at (TIMESTAMP)
```

**orders** table:
```sql
id (INT, Primary Key)
menu_item_id (INT, Foreign Key)
restaurant_id (INT, Foreign Key)
order_count (INT)
created_at (TIMESTAMP)
```

---

## Sample Workflow

1. User searches for "biryani" with price range 150-300
2. API searches `menu_items` for dishes matching "biryani"
3. Filters by price range (150 <= price <= 300)
4. Joins with `restaurants` and `orders` tables
5. Groups by restaurant and sums order counts
6. Sorts by order count (descending)
7. Returns top 10 results

---

## Pagination
Currently not implemented. Results are limited to top 10 by default. Future versions may include pagination support.

---

For setup and installation, see `README.md`
For testing examples, see `TESTING.md`
