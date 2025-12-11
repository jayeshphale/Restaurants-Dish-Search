import React, { useState } from 'react';

function SearchForm({ onSearch, loading }) {
  const [formData, setFormData] = useState({
    name: '',
    minPrice: 100,
    maxPrice: 500
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'name' ? value : parseInt(value) || 0
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Please enter a dish name');
      return;
    }

    if (formData.minPrice > formData.maxPrice) {
      alert('Minimum price cannot be greater than maximum price');
      return;
    }

    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="form-group">
        <label htmlFor="name">Dish Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="e.g., Biryani, Chicken, Paneer..."
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="minPrice">Min Price (₹)</label>
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          min="0"
          value={formData.minPrice}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="maxPrice">Max Price (₹)</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          min="0"
          value={formData.maxPrice}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <button 
        type="submit" 
        className="search-btn"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchForm;
