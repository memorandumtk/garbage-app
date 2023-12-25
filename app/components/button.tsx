"use client";
import { loadBindings } from "next/dist/build/swc";
import React, { useState, useEffect } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

export default function Button() {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (location.latitude && location.longitude) {
      sendDataToServer(location);
    }
  }, [location.latitude, location.longitude]);

  const handleClick = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const newLocation: Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setLocation(newLocation);
    });
  };

  const sendDataToServer = async (sentLocation: Location) => {
    try {
      const response = await fetch("/api/spot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentLocation),
      });

      if (!response.ok) {
        throw new Error("Failed to send location data");
      }
      // Handle response here
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={handleClick}>Send Location</button>;
}
