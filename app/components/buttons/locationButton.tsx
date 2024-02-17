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

  const clickHandler = async () => {
    GetLocation()
      .then((loc) => {
        console.log(loc);
        setLocation(loc);
        handler(loc);
      })
      .catch((error) => console.error("Error getting location:", error));
  };

  return (
      <button
          className="w-full border-2 border-black rounded-md p-2 bg-slate-200 hover:bg-slate-300 text-black font-bold text-lg"
          onClick={clickHandler}>
        Send!
      </button>
  )
}
