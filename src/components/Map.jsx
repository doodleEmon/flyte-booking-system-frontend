import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';

const Map = ({ origin, destination, routeCoordinates }) => {
  return (
    <MapContainer center={origin} zoom={5} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={origin}></Marker>
      <Marker position={destination}></Marker>
      <Polyline positions={routeCoordinates} color="blue" />
    </MapContainer>
  );
};

export default Map;
