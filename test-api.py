import requests
import json
import time

# Wait for server to start
time.sleep(2)

# Test 1: Health Check
print("=" * 60)
print("TEST 1: Health Check")
print("=" * 60)
try:
    response = requests.get('http://localhost:3000/health')
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")

print("\n")

# Test 2: Search Biryani (150-300 price range)
print("=" * 60)
print("TEST 2: Search Biryani (Price: ₹150-₹300)")
print("=" * 60)
try:
    response = requests.get('http://localhost:3000/search/dishes', params={
        'name': 'biryani',
        'minPrice': 150,
        'maxPrice': 300
    })
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Found {len(data['restaurants'])} restaurants\n")
    
    # Display top 5 results
    for i, restaurant in enumerate(data['restaurants'][:5], 1):
        print(f"{i}. {restaurant['restaurantName']} ({restaurant['city']})")
        print(f"   Dish: {restaurant['dishName']}")
        print(f"   Price: ₹{restaurant['dishPrice']}")
        print(f"   Orders: {restaurant['orderCount']}")
        print()
except Exception as e:
    print(f"Error: {e}")

print()

# Test 3: Search Chicken (190-250 price range)
print("=" * 60)
print("TEST 3: Search Chicken (Price: ₹190-₹250)")
print("=" * 60)
try:
    response = requests.get('http://localhost:3000/search/dishes', params={
        'name': 'chicken',
        'minPrice': 190,
        'maxPrice': 250
    })
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Found {len(data['restaurants'])} restaurants\n")
    
    for i, restaurant in enumerate(data['restaurants'], 1):
        print(f"{i}. {restaurant['restaurantName']} - {restaurant['dishName']} - ₹{restaurant['dishPrice']} - {restaurant['orderCount']} orders")
except Exception as e:
    print(f"Error: {e}")

print("\n")

# Test 4: Search Vegetable (100-200 price range)
print("=" * 60)
print("TEST 4: Search Vegetable (Price: ₹100-₹200)")
print("=" * 60)
try:
    response = requests.get('http://localhost:3000/search/dishes', params={
        'name': 'vegetable',
        'minPrice': 100,
        'maxPrice': 200
    })
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Found {len(data['restaurants'])} restaurants\n")
    
    for i, restaurant in enumerate(data['restaurants'], 1):
        print(f"{i}. {restaurant['restaurantName']} - {restaurant['dishName']} - ₹{restaurant['dishPrice']} - {restaurant['orderCount']} orders")
except Exception as e:
    print(f"Error: {e}")

print("\n")

# Test 5: Error case - Missing parameter
print("=" * 60)
print("TEST 5: Error Case - Missing minPrice parameter")
print("=" * 60)
try:
    response = requests.get('http://localhost:3000/search/dishes', params={
        'name': 'biryani',
        'maxPrice': 300
    })
    print(f"Status: {response.status_code}")
    print(json.dumps(response.json(), indent=2))
except Exception as e:
    print(f"Error: {e}")

print("\n" + "=" * 60)
print("All tests completed!")
print("=" * 60)
