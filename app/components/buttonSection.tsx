"use client";
import React, { useState, useEffect } from "react";
import LocationButton from "./buttons/locationButton";
import PaperButton from "./buttons/paperButton";
import GeneralButton from "./buttons/generalButton";
import RecycleButton from "./buttons/recycleButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import { setCookie, getCookie, getCookies } from "cookies-next";

interface Record {
  general: number | null;
  paper: number | null;
  recycle: number | null;
  latitude: number | null;
  longitude: number | null;
}
// Define the props type for ButtonSection
interface ButtonSectionProps {
  fetchSpots: () => Promise<void>; // Assuming fetchSpots does not return any specific value
}

// Define the ButtonSection component with typed props
const ButtonSection: React.FC<ButtonSectionProps> = ({ fetchSpots }) => {
  const [record, setRecord] = useState<Record>({
    general: null,
    paper: null,
    recycle: null,
    latitude: null,
    longitude: null,
  });

  // If latitude and longitude entered from location button are true, triggering that, send the recode to server.
  useEffect(() => {
    if (record.latitude && record.longitude) {
      // Get cookie to make inserted record be legit by getting user info.
      const userEmail = getCookie("auth0user");
      setRecord((prevRecord) => ({ ...prevRecord, userEmail: userEmail }));
      sendDataToServer(record);
    }
  }, [record.latitude, record.longitude]);

  // Handler for passing location information of thre record to location button.
  const locationHandler = (location: {
    latitude: number | null;
    longitude: number | null;
  }) => {
    setRecord((prevRecord) => ({ ...prevRecord, ...location }));
  };

  // Example button that when clicked, calls fetchSpots
  const handleButtonClick = async () => {
    await sendDataToServer(record);
    await fetchSpots();
  };

  // Handler for passing record to each button.
  const recordHandler = (key: keyof Record, value: number | null) => {
    setRecord((prevRecord) => {
      return { ...prevRecord, [key]: value };
    });
    console.log("button section line 50:  %s",key);
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
      console.log("button section line 67");
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
      <div className="flex-col flex items-center gap-4 py-4">
        <p className="text-xl">Share which garbage box you see when you found!</p>
        <div className="flex">
        <PaperButton
            handler={(paperValue) => recordHandler("paper", paperValue ? 1 : 0)}
        />
        <GeneralButton
            handler={(generalValue) =>
                recordHandler("general", generalValue ? 1 : 0)
            }
        />
        <RecycleButton
            handler={(recycleValue) =>
                recordHandler("recycle", recycleValue ? 1 : 0)
            }
        />
        </div>
        <LocationButton handler={locationHandler} handleButtonClick={handleButtonClick }/>
      </div>
  );
};

export default ButtonSection;
