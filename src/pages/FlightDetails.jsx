import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FlightDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/flights/${id}`);
        setFlight(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFlightDetails();
  }, [id]);

  if (loading) return <p>Loading flight details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Flight Details</h1>
      <p><strong>Airline:</strong> {flight.airline}</p>
      <p><strong>From:</strong> {flight.origin}</p>
      <p><strong>To:</strong> {flight.destination}</p>
      <p><strong>Departure:</strong> {flight.date} at {flight.time}</p>
      <p><strong>Price:</strong> ${flight.price}</p>
      <p><strong>Available Seats:</strong> {flight.availableSeats}</p>
      <button onClick={() => navigate(`/book/${id}`)}>Book Now</button>
    </div>
  );
};

export default FlightDetails;
