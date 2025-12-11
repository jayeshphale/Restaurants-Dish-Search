import React from 'react';

function ResultsGrid({ results }) {
  return (
    <div className="results-grid">
      {results.map((result, index) => (
        <div key={index} className="result-card">
          <div className="result-header">
            <div>
              <div className="restaurant-name">{result.restaurantName || result.restaurant_name}</div>
              <div className="restaurant-city">{result.city}</div>
            </div>
            <div className="popularity-badge">
              ⭐ {(result.orderCount || result.order_count).toLocaleString()} orders
            </div>
          </div>
          <div className="result-body">
            <div className="dish-name">{result.dishName || result.dish_name}</div>
            <div className="dish-info">
              <div className="price">₹{result.dishPrice || result.price}</div>
              <div className="order-count">Popular</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsGrid;
