// Paper waste
'use client';
import React, { useState, useEffect } from "react";

interface PaperButtonProps {
  handler: (paper: boolean) => void;
}

const PaperButton = ({ handler }: PaperButtonProps) => {
  const [paper, setPaper] = useState(false);

  useEffect(() => {
    console.log("paper button is clicked and changed.");
    handler(paper);
  }, [paper]);

  const clickHandler = () => {
    setPaper(true);
    console.log("paper button is clicked.");
  };

  return (
      <button
          className="border-2 border-black rounded-md p-2 bg-yellow-300 hover:bg-yellow-400 text-black font-bold text-lg"
          onClick={clickHandler}>
        Paper
      </button>
  )
};

export default PaperButton;
