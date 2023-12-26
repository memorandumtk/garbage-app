"use client";
import React, { useState, useEffect } from "react";
import LocationButton from "./buttons/locationButton";
import PaperButton from "./buttons/paperButton";
import GeneralButton from "./buttons/generalButton";
import RecycleButton from "./buttons/recycleButton";

interface Record {
  general: number | null;
  paper: number | null;
  recycle: number | null;
  latitude: number | null;
  longitude: number | null;
}

const ButtonSection = () => {
  const [record, setRecord] = useState<Record>({
    general: null,
    paper: null,
    recycle: null,
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    // If latitude and longitude entered from location button 
    // are true, trrigering that, send the recode to server.
    if (record.latitude && record.longitude) {
      sendDataToServer(record);
    }
  }, [record.latitude, record.longitude]);
  const locationHandler = (location: {
    latitude: number | null;
    longitude: number | null;
  }) => {
    setRecord((prevRecord) => ({ ...prevRecord, ...location }));
  };

  const recordHandler = (key: keyof Record, value: number | null) => {
    setRecord((prevRecord) => {
      return { ...prevRecord, [key]: value };
    });
  };

  const sendDataToServer = async (sentRecord: Record) => {
    try {
      const response = await fetch("/api/spot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sentRecord),
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

  return (
    <div className="flex-col flex">
      <p>Buttons Section</p>
      <PaperButton
        handler={(paperValue) => recordHandler("paper", paperValue ? 1 : 0)}
      />
      <GeneralButton
        handler={(generalValue) => recordHandler("general", generalValue ? 1 : 0)}
      />
      <RecycleButton
        handler={(recycleValue) => recordHandler("recycle", recycleValue ? 1 : 0)}
      />
      <LocationButton handler={locationHandler} />
    </div>
  );
};

export default ButtonSection;
