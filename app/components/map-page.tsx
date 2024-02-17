"use client";
import dynamic from "next/dynamic";
import React from "react";
import GetLocation from "./getLocation";
import {useState, useEffect} from "react";
import ButtonSection from "@/app/components/buttonSection";

interface Location {
    latitude: number | null;
    longitude: number | null;
}

const getSpots = async () => {
  const response = await fetch("/api/spot/get-spots", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  return data.result;
};

const MapPage: React.FC = () => {
    const [location, setLocation] = React.useState<Location>({
        latitude: null,
        longitude: null
    });

    useEffect(() => {
        GetLocation()
            .then((loc) => {
                setLocation(loc)
            })
            .catch((error) => console.error("Error getting location:", error));
    }, []);


    // const [spots, setSpots] = useState<any[]>([]);
    // useEffect(() => {
    //     // Fetch spots when the component mounts
    //     const fetchSpots = async () => {
    //         const fetchedSpots = await getSpots();
    //         setSpots(fetchedSpots);
    //     };
    //     fetchSpots();
    // }, []);

    const [spots, setSpots] = useState<any[]>([]);
    // Move fetchSpots outside so it can be passed as a prop
    const fetchSpots = async () => {
        const fetchedSpots = await getSpots();
        setSpots(fetchedSpots);
    };

    // Call fetchSpots inside a useEffect to load spots initially
    useEffect(() => {
        fetchSpots();
    }, []);

    const MyMap = React.useMemo(
        () =>
            dynamic(() => import("./map"), {
                loading: () => <p>A map is loading</p>,
                ssr: false, // This line is important. It's what prevents server-side render
            }),
        []
    );

    return (
        <>
            <MyMap location={location} spots={spots}/>
            <ButtonSection fetchSpots={fetchSpots}/>
        </>
    )
};

export default MapPage;
