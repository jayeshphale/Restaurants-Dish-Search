import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import ResultsGrid from './components/ResultsGrid';
import { searchDishes } from './api/client';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async ({ name, minPrice, maxPrice }) => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchDishes({ name, minPrice, maxPrice });
      // backend returns { restaurants: [...] }
      setResults(data.restaurants || []);
    } catch (err) {
      setError(err.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Restaurant Dish Search</h1>
      <SearchForm onSearch={handleSearch} loading={loading} />
      {error && <div className="error">{error}</div>}
      <ResultsGrid results={results} />
    </div>
  );
}

export default App;
