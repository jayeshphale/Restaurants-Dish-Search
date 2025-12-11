# 🚀 Quick Start Guide

Get the Restaurant Dish Search API running in minutes!

## Prerequisites
- Node.js v14+
- MySQL Server (local or remote)
- npm

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Database Connection
Edit `.env` file with your MySQL credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=restaurant_db
```

### Step 3: Initialize Database
```bash
node scripts/setup.js
```

### Step 4: Load Sample Data
```bash
npm run seed
```

### Step 5: Start the Server
```bash
npm start
```

✅ Server is now running at `http://localhost:3000`

---

## Test the API

### Option A: Using Browser
Navigate to:
```
http://localhost:3000/health
```

### Option B: Using cURL
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

### Option C: Using PowerShell
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300" -Method Get
```

---

## Expected Output

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

---

## Key API Details

**Endpoint:** `GET /search/dishes`

**Required Parameters:**
- `name` - Dish name (string)
- `minPrice` - Minimum price (number)
- `maxPrice` - Maximum price (number)

**Returns:** Top 10 restaurants sorted by order count (highest first)

---

## Sample Data

8 restaurants with biryani dishes at prices ₹140-₹350

**Sample Searches:**
- `/search/dishes?name=biryani&minPrice=150&maxPrice=300` (most popular)
- `/search/dishes?name=chicken&minPrice=190&maxPrice=250`
- `/search/dishes?name=vegetable&minPrice=100&maxPrice=200`
- `/search/dishes?name=mutton&minPrice=250&maxPrice=320`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MySQL connection error | Check `.env` credentials and ensure MySQL is running |
| Port 3000 in use | Change `PORT` in `.env` |
| Tables not found | Run `node scripts/setup.js` again |
| No results | Run `npm run seed` to load sample data |

---

## Project Structure
```
.
├── server.js           # Main server
├── db.js              # Database connection
├── dbSetup.js         # Database initialization
├── routes/
│   └── search.js      # Search API endpoint
├── scripts/
│   ├── setup.js       # Create tables
│   └── seed.js        # Load sample data
├── .env               # Configuration
└── README.md          # Full documentation
```

---

## Next Steps

1. **Test other queries** - See `TESTING.md` for more examples
2. **Deploy** - Deploy to Railway, Render, or AWS
3. **Customize** - Modify `.env`, seed data, or API logic
4. **Extend** - Add more features like filtering, pagination, etc.

---

For detailed documentation, see `README.md`
