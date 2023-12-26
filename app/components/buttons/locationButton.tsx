"use client";
import { loadBindings } from "next/dist/build/swc";
import React, { useState, useEffect } from "react";
import GetLocation from "../getLocation";

interface Location {
  latitude: number | null;
  longitude: number | null;
}
interface LocationButtonProps {
  handler: (location: {
    latitude: number | null;
    longitude: number | null;
  }) => void;
}

// export default function LocationButton({handler}) {
export default function LocationButton({ handler }: LocationButtonProps) {
  const [location, setLocation] = useState<Location>({
    latitude: null,
    longitude: null,
  });

  // useEffect(() => {
  //   if (location.latitude && location.longitude) {
  //     sendDataToServer(location);
  //   }
  // }, [location.latitude, location.longitude]);

  const clickHandler = async () => {
    GetLocation()
      .then((loc) => {
        console.log(loc);
        setLocation(loc);
        handler(loc);
      })
      .catch((error) => console.error("Error getting location:", error));
  };

  // const sendDataToServer = async (sentLocation: Location) => {
  //   try {
  //     const response = await fetch("/api/spot", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(sentLocation),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to send location data");
  //     }
  //     // Handle response here
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  return <button onClick={clickHandler}>Send Location</button>;
}
