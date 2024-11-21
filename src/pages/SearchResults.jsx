import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFlights } from '../store/slices/flightSlice';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
    const { search } = useLocation();
    const dispatch = useDispatch();
    const { flights, loading, error } = useSelector((state) => state.flights);
    const [filters, setFilters] = useState({ price: '', airline: '', seats: '' });

    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        const origin = queryParams.get('origin');
        const destination = queryParams.get('destination');
        const date = queryParams.get('date');

        dispatch(fetchFlights({ origin, destination, date }));
    }, [dispatch, search]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const filteredFlights = flights.filter((flight) => {
        const priceFilter = filters.price ? flight.price <= filters.price : true;
        const airlineFilter = filters.airline ? flight.airline.includes(filters.airline) : true;
        const seatsFilter = filters.seats ? flight.availableSeats >= filters.seats : true;

        return priceFilter && airlineFilter && seatsFilter;
    });

    return (
        <div>
            <h1>Search Results</h1>
            <div>
                <label>Max Price: <input type="number" name="price" value={filters.price} onChange={handleFilterChange} /></label>
                <label>Airline: <input type="text" name="airline" value={filters.airline} onChange={handleFilterChange} /></label>
                <label>Seats: <input type="number" name="seats" value={filters.seats} onChange={handleFilterChange} /></label>
            </div>
            {loading ? (
                <p>Loading flights...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <div>
                    {filteredFlights.map((flight) => (
                        <div key={flight._id}>
                            <h2>{flight.airline}</h2>
                            <p>{flight.origin} → {flight.destination}</p>
                            <p>Price: ${flight.price}</p>
                            <p>Available Seats: {flight.availableSeats}</p>
                            <a href={`/flights/${flight._id}`}>View Details</a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
