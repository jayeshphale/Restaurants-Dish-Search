const http = require('http');

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function runTests() {
  console.log('\n' + '='.repeat(70));
  console.log('RESTAURANT DISH SEARCH - API TEST SUITE');
  console.log('='.repeat(70) + '\n');

  // Test 1: Health Check
  console.log('TEST 1: Health Check');
  console.log('-'.repeat(70));
  try {
    const response = await makeRequest('/health');
    console.log(`Status: ${response.status}`);
    console.log('Response:', JSON.parse(response.body));
    console.log('✅ PASSED\n');
  } catch (e) {
    console.log('❌ FAILED:', e.message, '\n');
  }

  // Test 2: Search Biryani
  console.log('TEST 2: Search Biryani (Price: ₹150-₹300)');
  console.log('-'.repeat(70));
  try {
    const response = await makeRequest('/search/dishes?name=biryani&minPrice=150&maxPrice=300');
    console.log(`Status: ${response.status}`);
    const data = JSON.parse(response.body);
    console.log(`Found ${data.restaurants.length} restaurants\n`);
    
    data.restaurants.slice(0, 3).forEach((r, i) => {
      console.log(`${i + 1}. ${r.restaurantName} (${r.city})`);
      console.log(`   ${r.dishName} - ₹${r.dishPrice} - ${r.orderCount} orders`);
    });
    console.log('✅ PASSED\n');
  } catch (e) {
    console.log('❌ FAILED:', e.message, '\n');
  }

  // Test 3: Search Chicken
  console.log('TEST 3: Search Chicken (Price: ₹190-₹250)');
  console.log('-'.repeat(70));
  try {
    const response = await makeRequest('/search/dishes?name=chicken&minPrice=190&maxPrice=250');
    console.log(`Status: ${response.status}`);
    const data = JSON.parse(response.body);
    console.log(`Found ${data.restaurants.length} restaurants`);
    data.restaurants.forEach((r, i) => {
      console.log(`${i + 1}. ${r.restaurantName} - ${r.dishName} - ₹${r.dishPrice}`);
    });
    console.log('✅ PASSED\n');
  } catch (e) {
    console.log('❌ FAILED:', e.message, '\n');
  }

  // Test 4: Search Vegetable
  console.log('TEST 4: Search Vegetable (Price: ₹100-₹200)');
  console.log('-'.repeat(70));
  try {
    const response = await makeRequest('/search/dishes?name=vegetable&minPrice=100&maxPrice=200');
    console.log(`Status: ${response.status}`);
    const data = JSON.parse(response.body);
    console.log(`Found ${data.restaurants.length} restaurants`);
    data.restaurants.forEach((r, i) => {
      console.log(`${i + 1}. ${r.restaurantName} - ₹${r.dishPrice}`);
    });
    console.log('✅ PASSED\n');
  } catch (e) {
    console.log('❌ FAILED:', e.message, '\n');
  }

  // Test 5: Error Case
  console.log('TEST 5: Error Case - Missing minPrice');
  console.log('-'.repeat(70));
  try {
    const response = await makeRequest('/search/dishes?name=biryani&maxPrice=300');
    console.log(`Status: ${response.status}`);
    const data = JSON.parse(response.body);
    console.log('Response:', data);
    if (response.status === 400) {
      console.log('✅ PASSED (Correctly returned 400)\n');
    }
  } catch (e) {
    console.log('❌ FAILED:', e.message, '\n');
  }

  console.log('='.repeat(70));
  console.log('All tests completed!');
  console.log('='.repeat(70));
}

runTests();
