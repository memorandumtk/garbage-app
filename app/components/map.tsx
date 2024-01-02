// If not use "use client", I got 'This window is not defined' error. which 'Error: window is not defined'.
"use client";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useState, useEffect } from "react";

interface MyMapProps {
  location: {
    latitude: number | null;
    longitude: number | null;
  };
}

const getSpots = async () => {
  const response = await fetch("/api/spot/get-spots", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  const result = data.result;
  return result;
};

const MyMap: React.FC<MyMapProps> = ({ location }) => {
  // Define a default center position as 'Vancouver city center station'
  const defaultCenter: L.LatLngExpression = [49.28301509909901, -123.1186127];
  // Use the provided location or the default center
  const center: L.LatLngExpression = [
    location.latitude ?? defaultCenter[0],
    location.longitude ?? defaultCenter[1],
  ];
  const username = process.env.NEXT_PUBLIC_MAP_BOX_USERNAME;
  const styleToken = process.env.NEXT_PUBLIC_MAP_BOX_STYPE_TOKEN;
  const accessToken = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN;

  const [spots, setSpots] = useState<any[]>([]);
  useEffect(() => {
    // Fetch spots when the component mounts
    const fetchSpots = async () => {
      const fetchedSpots = await getSpots();
      setSpots(fetchedSpots);
    };
    fetchSpots();
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={15}
      scrollWheelZoom={false}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/${username}/${styleToken}/tiles/256/{z}/{x}/{y}@2x?access_token=${accessToken}`}
      />
      <Marker position={center} draggable={true} >
        <Popup >
          This is where you are now!
        </Popup>
      </Marker>
      {spots.map((spot, key) => (
        <Circle
          key={key}
          center={[spot.latitude, spot.longitude]}
          radius={30}
          pathOptions={spot.colorOptions}
        />
      ))}
    </MapContainer>
  );
};

export default MyMap;
