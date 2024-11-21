import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBooking = async () => {
    if (!token) {
      alert("Please log in to book a flight.");
      navigate('/login');
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `http://localhost:5000/api/bookings`,
        { flightId: id, seats },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Booking successful!");
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Book Flight</h1>
      <label>
        Number of Seats:
        <input 
          type="number" 
          min="1" 
          value={seats} 
          onChange={(e) => setSeats(e.target.value)} 
        />
      </label>
      <button onClick={handleBooking} disabled={loading}>
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default BookingPage;
