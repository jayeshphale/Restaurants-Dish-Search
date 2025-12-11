# 🍽️ Restaurant Dish Search - Visual Guide

## 📌 At a Glance

```
User searches for a dish with price range
           ↓
   [GET /search/dishes]
   name=biryani&minPrice=150&maxPrice=300
           ↓
   System searches database
   - Finds restaurants with that dish
   - Filters by price range
   - Groups by restaurant
   - Counts total orders
           ↓
   Returns top 10 restaurants
   sorted by popularity (order count)
```

---

## 🚀 Get Started in 3 Steps

### Step 1: Setup
```bash
npm install
node scripts/setup.js
npm run seed
```

### Step 2: Run
```bash
npm start
```

### Step 3: Test
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

---

## 📊 Database Structure

```
Restaurants (8 total)
├── Hyderabadi Spice House
├── Mumbai Masala Kitchen
├── Delhi Delights
├── Kolkata Biryani Palace
├── Chennai Flavors
├── Bangalore Spice Corner
├── Lucknow Kebab House
└── Jaipur Royal Cuisine

     ↓ Each has Menu Items
     
Menu Items (30+ total)
├── Chicken Biryani (₹195-₹240)
├── Vegetable Biryani (₹140-₹180)
├── Mutton Biryani (₹260-₹295)
├── Fish Biryani (₹280-₹290)
└── ... and more

     ↓ Each has Order Records
     
Orders (30+ total)
├── Order count: 38-96
├── Linked to menu item
└── Linked to restaurant
```

---

## 🔌 API Response Example

**Request:**
```
GET /search/dishes?name=biryani&minPrice=150&maxPrice=300
```

**Response:**
```json
{
  "restaurants": [
    {
      "restaurantId": 1,
      "restaurantName": "Hyderabadi Spice House",
      "city": "Hyderabad",
      "dishName": "Chicken Biryani",
      "dishPrice": 220,
      "orderCount": 96          ← Most popular
    },
    {
      "restaurantId": 4,
      "restaurantName": "Kolkata Biryani Palace",
      "city": "Kolkata",
      "dishName": "Chicken Biryani",
      "dishPrice": 195,
      "orderCount": 89          ← 2nd most popular
    }
    // ... up to 10 results
  ]
}
```

---

## 📁 Project Files

```
.
├── 🔴 Core Application
│   ├── server.js              Main Express server
│   ├── db.js                  Database connection
│   └── dbSetup.js             Schema setup
│
├── 🟡 API & Routes
│   └── routes/
│       └── search.js          Search endpoint
│
├── 🟢 Utilities
│   └── scripts/
│       ├── setup.js           Create database
│       └── seed.js            Load sample data
│
├── 🔵 Configuration
│   ├── package.json           Dependencies
│   ├── .env                   Environment variables
│   └── .gitignore             Git configuration
│
└── 📚 Documentation (7 files)
    ├── README.md              Complete guide
    ├── QUICKSTART.md          5-minute start
    ├── API_DOCS.md            API reference
    ├── TESTING.md             Test examples
    ├── CONFIG.md              Configuration
    ├── PROJECT_SUMMARY.md     Project overview
    └── IMPLEMENTATION_NOTES.md Design decisions
```

---

## 🧪 Quick Test Commands

### Search for Biryani
```bash
curl "http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300"
```

### Search for Chicken
```bash
curl "http://localhost:3000/search/dishes?name=chicken&minPrice=190&maxPrice=250"
```

### Health Check
```bash
curl "http://localhost:3000/health"
```

### Using Browser
```
http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

---

## 🛠️ Setup Summary

| Step | Command | Purpose |
|------|---------|---------|
| 1 | `npm install` | Install dependencies |
| 2 | `node scripts/setup.js` | Create database & tables |
| 3 | `npm run seed` | Load sample data |
| 4 | `npm start` | Start server |
| 5 | Test API | Send requests |

---

## 📊 Data Overview

| Metric | Count |
|--------|-------|
| Restaurants | 8 |
| Menu Items | 30+ |
| Orders | 30+ |
| Dishes Vary By | Chicken, Vegetable, Mutton, Fish, etc. |
| Price Range | ₹140 - ₹350 |
| Order Count Range | 38 - 96 |

---

## 🔍 Query Flow

```
1. Receive Request
   ↓ Validate parameters
   ↓ Parse minPrice, maxPrice
   
2. Database Query
   ↓ Search menu_items by name (LIKE)
   ↓ Filter by price range
   ↓ JOIN with restaurants
   ↓ JOIN with orders
   
3. Aggregate Results
   ↓ GROUP BY restaurant
   ↓ SUM order counts
   ↓ ORDER BY order count DESC
   ↓ LIMIT 10
   
4. Format & Return
   ↓ Convert decimals to numbers
   ↓ Format response JSON
   ↓ Send to client
```

---

## ✅ Error Handling

| Error | Response |
|-------|----------|
| Missing name | 400 - "Dish name required" |
| Missing prices | 400 - "Both prices required" |
| Invalid values | 400 - "Valid numbers required" |
| Price range invalid | 400 - "minPrice ≤ maxPrice" |
| Server error | 500 - "Internal server error" |
| Wrong endpoint | 404 - "Not found" |

---

## 🎯 Key Features

✅ **Search by Dish Name**
- Case-insensitive
- Partial matching
- Multiple results

✅ **Price Range Filter**
- Mandatory for all searches
- Inclusive range
- Validation included

✅ **Popularity Ranking**
- Returns top 10 restaurants
- Sorted by order count
- Highest first

✅ **Complete Information**
- Restaurant name & city
- Dish name & price
- Total order count

✅ **Production Ready**
- Error handling
- Input validation
- Connection pooling
- Proper HTTP status codes

---

## 🚀 Deployment Platforms

Can be deployed to:
- ✓ Railway (recommended)
- ✓ Render.com
- ✓ AWS EC2 + RDS
- ✓ Digital Ocean
- ✓ Heroku (paid)
- ✓ Any Node.js hosting

---

## 📚 Documentation Map

| File | Purpose | Read Time |
|------|---------|-----------|
| **QUICKSTART.md** | Get running in 5 mins | 5 min |
| **README.md** | Complete setup guide | 15 min |
| **API_DOCS.md** | API reference & examples | 10 min |
| **TESTING.md** | Test cases & examples | 5 min |
| **CONFIG.md** | Configuration details | 5 min |
| **PROJECT_SUMMARY.md** | Project overview | 10 min |
| **IMPLEMENTATION_NOTES.md** | Design decisions | 15 min |
| **VERIFICATION.md** | Completion checklist | 5 min |

---

## 🎓 Interview Topics

This project demonstrates knowledge of:

✓ Node.js & Express.js
✓ MySQL database design
✓ SQL queries and aggregations
✓ RESTful API design
✓ Error handling
✓ Input validation
✓ Connection pooling
✓ Environment configuration
✓ Git version control
✓ Technical documentation

---

## 📞 Quick Reference

```
API Base URL: http://localhost:3000
Main Endpoint: /search/dishes
Required Params: name, minPrice, maxPrice
Response: Top 10 restaurants (JSON)
```

**Example:**
```
GET /search/dishes?name=biryani&minPrice=150&maxPrice=300
```

**Returns:**
```json
{
  "restaurants": [
    {restaurantId, restaurantName, city, dishName, dishPrice, orderCount},
    ...
  ]
}
```

---

## 🔄 Common Workflows

### Testing Flow
```
1. npm install
2. node scripts/setup.js
3. npm run seed
4. npm start
5. curl http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

### Customization Flow
```
1. Modify routes/search.js (API logic)
2. Or scripts/seed.js (sample data)
3. Or dbSetup.js (database schema)
4. Test changes
5. Commit to git
```

### Deployment Flow
```
1. Push to GitHub
2. Connect repository to Railway/Render
3. Set environment variables
4. Deploy
5. Test with public URL
```

---

## 💡 Tips

- Use `npm run dev` for development (auto-reload)
- Check `.env` if database connection fails
- See `TESTING.md` for more test queries
- Review `API_DOCS.md` for full API details
- Check `IMPLEMENTATION_NOTES.md` for design decisions

---

**Status:** ✅ Ready to Use | 🚀 Ready to Deploy | 📚 Well Documented

For detailed information, see the documentation files in the project root.
