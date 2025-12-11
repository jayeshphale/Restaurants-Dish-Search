# ⚡ Quick Start Guide - 5 Minutes

Get the full-stack application running in minutes!

## 🎯 What You're Getting

- ✅ **Backend API** - Restaurant search on port 3000
- ✅ **Frontend UI** - Beautiful web interface on port 8080
- ✅ **Database** - Pre-loaded with 8 restaurants and 28 dishes
- ✅ **Ready to Deploy** - Production-ready code

## 📋 Prerequisites

- Node.js installed
- MySQL installed and running
- Web browser

## 🚀 Start in 2 Terminal Windows

### Terminal 1: Backend Server

```bash
cd "c:\Users\Jayesh Phale\Downloads\Restaurants Dish Search"
npm install
node setup-db.js
npm run seed
npm start
```

**Expected Output:**
```
🚀 Restaurant Dish Search API running on http://localhost:3000
Health check: http://localhost:3000/health
Search endpoint: http://localhost:3000/search/dishes?name=biryani&minPrice=150&maxPrice=300
```

### Terminal 2: Frontend Server

```bash
cd "c:\Users\Jayesh Phale\Downloads\Restaurants Dish Search"
node frontend-server.js
```

**Expected Output:**
```
🌐 Frontend available at http://localhost:8080
📡 Backend running at http://localhost:3000
```

## 🌐 Open in Browser

Visit: **http://localhost:8080**

## 🔍 Try These Searches

1. **Search "biryani"** with price ₹150 - ₹300
   - Should show 10+ results

2. **Search "chicken"** with price ₹100 - ₹250
   - Should show chicken dishes

3. **Search "paneer"** with price ₹100 - ₹200
   - Should show paneer varieties

## ✨ Features

- 🔍 Real-time search with live results
- 💰 Price range filtering
- ⭐ Results sorted by popularity (order count)
- 📱 Works on mobile, tablet, desktop
- 🎨 Modern gradient design

## 🆘 Troubleshooting

**"Cannot connect to database"?**
```bash
# Reseed the database
npm run seed
```

**"Port already in use"?**
```powershell
# Kill the process
Get-NetTCPConnection -LocalPort 3000 | Select-Object OwningProcess
Stop-Process -Id <PID> -Force
```

**"Backend not responding"?**
```bash
# Make sure backend terminal shows:
# 🚀 Restaurant Dish Search API running on http://localhost:3000
```

## 📁 File Structure

```
Root Directory
├── server.js              ← Backend API
├── db.js                  ← Database connection
├── routes/search.js       ← Search endpoint
├── scripts/seed.js        ← Sample data
├── frontend.html          ← Frontend UI (all-in-one)
├── frontend-server.js     ← Frontend server
└── package.json           ← Dependencies
```

## 🎓 What's Included

**Backend:**
- Express.js REST API
- MySQL database with 3 tables
- Connection pooling
- Error handling
- CORS support

**Frontend:**
- Responsive HTML/CSS/JS
- Search form with validation
- Results grid display
- Popularity badges
- Loading states and error handling

**Data:**
- 8 Restaurants
- 28 Menu items (various biryani types)
- 28 Order records
- Realistic pricing and popularity data

## 📊 Sample Restaurants

All Indian restaurants with different biryani styles:
- Hyderabadi Spice House (Hyderabad)
- Mumbai Masala Kitchen (Mumbai)
- Delhi Delights (Delhi)
- Kolkata Biryani Palace (Kolkata)
- Chennai Flavors (Chennai)
- Bangalore Spice Corner (Bangalore)
- Lucknow Kebab House (Lucknow)
- Jaipur Royal Cuisine (Jaipur)

## 🔗 API Endpoint

The frontend communicates with:

```
GET http://localhost:3000/search/dishes
  ?name=biryani
  &minPrice=150
  &maxPrice=300
```

Returns JSON with restaurant data sorted by order count.

## 🎉 You're All Set!

1. Both servers running ✅
2. Database seeded ✅
3. Frontend ready ✅
4. Go search for dishes! 🍽️

## 📚 More Information

- `README.md` - Full documentation
- `FULLSTACK_SETUP.md` - Complete setup guide
- `API_DOCS.md` - API reference
- `IMPLEMENTATION_NOTES.md` - Technical details

## 💡 Pro Tips

- Keep both terminals open while developing
- Restart backend if you make changes to routes/db
- Frontend changes reload automatically in browser
- Use browser F12 console for debugging
- Backend logs show all requests

## 🎯 Next Steps

**For Development:**
- Modify `frontend.html` for UI changes
- Edit `routes/search.js` for API changes
- Restart backend after backend changes

**For Deployment:**
- Push to GitHub
- Deploy backend to Railway/Heroku
- Deploy frontend to Vercel/Netlify

**For Interviews:**
- Be ready to explain the database schema
- Know the search query optimization
- Understand CORS and frontend-backend communication
- Practice live code modifications

---

**Happy searching! 🚀 Questions? Check the documentation files.**
