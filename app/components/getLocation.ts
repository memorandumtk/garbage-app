
"use client";
import React, { useState, useEffect } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const getLocation = () => {

  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });
  
  useEffect(() => {
      currentGeo;
    }, [location.latitude, location.longitude]);
    
    const currentGeo = async () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const newLocation: Location = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };
            setLocation(newLocation);
        });
    };
    
    if (location.latitude ===null && location.longitude === null) currentGeo;

  return location;
}

export default getLocation;