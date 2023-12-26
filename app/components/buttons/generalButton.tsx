// General waste bin
'use client';
import React, { useState, useEffect } from "react";

interface GeneralButtonProps {
  handler: (general: boolean) => void;
}

const GeneralButton = ({ handler }: GeneralButtonProps) => {
  const [general, setGeneral] = useState(false);

  useEffect(() => {
    console.log("general button is clicked and changed.");
    handler(general);
  }, [general]);

  const clickHandler = () => {
    setGeneral(true);
    console.log("genera button is clicked.");
  };

  return <button onClick={clickHandler}>General Garbage Box</button>;
};

export default GeneralButton;
