import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const flightRes = await axios.get('http://localhost:5000/api/flights');
        const bookingRes = await axios.get('http://localhost:5000/api/bookings');
        setFlights(flightRes.data);
        setBookings(bookingRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminData();
  }, []);

  if (loading) return <p>Loading admin data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Manage Flights</h2>
      {flights.map((flight) => (
        <div key={flight._id}>
          <p>Flight: {flight.flightNumber}</p>
          <p>Airline: {flight.airline}</p>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      ))}
      <h2>Manage Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id}>
          <p>User: {booking.userId}</p>
          <p>Flight ID: {booking.flightId}</p>
          <button>Cancel Booking</button>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
