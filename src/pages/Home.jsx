import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?origin=${origin}&destination=${destination}&date=${date}`);
  };

  return (
    <div>
      <h1>Welcome to the Flight Booking System</h1>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Origin" 
          value={origin} 
          onChange={(e) => setOrigin(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Destination" 
          value={destination} 
          onChange={(e) => setDestination(e.target.value)} 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
        <button type="submit">Search Flights</button>
      </form>
    </div>
  );
};

export default Home;
