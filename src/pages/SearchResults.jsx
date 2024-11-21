import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const [flights, setFlights] = useState([]);
  const [filters, setFilters] = useState({ airline: '', maxPrice: '', sortBy: '' });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/flights/search', {
        params: { ...filters, page },
      });
      setFlights(response.data.flights);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, [filters, page]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1); // Reset to page 1 on filter change
  };

  return (
    <div>
      <h1>Search Results</h1>
      <div>
        <label>
          Airline:
          <input
            type="text"
            name="airline"
            value={filters.airline}
            onChange={handleFilterChange}
            placeholder="e.g., Delta"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="e.g., 500"
          />
        </label>
        <label>
          Sort By:
          <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="duration">Duration</option>
          </select>
        </label>
      </div>
      <div>
        {flights.map((flight) => (
          <div key={flight._id}>
            <p>{flight.airline} - ${flight.price}</p>
            <button onClick={() => window.location.href = `/flights/${flight._id}`}>
              View Details
            </button>
          </div>
        ))}
      </div>
      <div>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResults;
