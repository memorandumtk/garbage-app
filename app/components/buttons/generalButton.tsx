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

  return (
      <button
          className="border-2 border-black rounded-md p-2 bg-slate-700 hover:bg-slate-900 text-white font-bold text-lg"
          onClick={clickHandler}>
        General
      </button>
  )
};

export default GeneralButton;
