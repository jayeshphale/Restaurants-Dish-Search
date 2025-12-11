import React, { useState } from 'react';
import './index.css';
import SearchForm from './components/SearchForm';
import ResultsGrid from './components/ResultsGrid';
import { searchDishes } from './api/client';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = async (params) => {
    setLoading(true);
    setError('');
    setSearched(true);
    setSearchParams(params);

    try {
      const data = await searchDishes(params);
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch results. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>🍽️ Restaurant Dish Finder</h1>
        <p>Search for your favorite dishes across top restaurants</p>
      </div>

      <div className="search-card">
        <SearchForm onSearch={handleSearch} loading={loading} />
      </div>

      {error && <div className="error">{error}</div>}

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching for dishes...</p>
        </div>
      )}

      {!loading && searched && results.length === 0 && !error && (
        <div className="no-results">
          <p>No dishes found matching "{searchParams?.name}" in the price range ₹{searchParams?.minPrice} - ₹{searchParams?.maxPrice}</p>
          <p style={{ marginTop: '10px', fontSize: '0.95rem', opacity: 0.8 }}>Try adjusting your search criteria</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <div className="results-header">
          <h2>Found {results.length} Result{results.length !== 1 ? 's' : ''}</h2>
          <p className="results-count">Showing dishes sorted by popularity</p>
        </div>
      )}

      {!loading && results.length > 0 && (
        <ResultsGrid results={results} />
      )}
    </div>
  );
}

export default App;
