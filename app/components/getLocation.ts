"use client";
import React, { useState, useEffect } from "react";

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const getLocationOptions = {
  enableHighAccuracy: true, 
  timeout: 10000,            
  maximumAge: 0             
};

const GetLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      getLocationOptions
    );
  });
};

export default GetLocation;


// This is no option, provided a not correct result in my case.
// const getLocation = (): Promise<Location> => {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// };

// export default getLocation;

// Below code is the code I wrote at first, Above is from ChatGPT..
// const getLocation = () => {
//   const [location, setLocation] = useState<Location>({
//     latitude: null,
//     longitude: null,
//   });
//   const currentGeo = async () => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const newLocation: Location = {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       };
//       return location;
//     });
//   };
//   currentGeo;

// };

// export default getLocation;
