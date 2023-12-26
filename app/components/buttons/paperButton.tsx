// Paper waste
'use client';
import React, { useState, useEffect } from "react";

interface PaperButtonProps {
  handler: (paper: boolean) => void;
}

const PaperButton = ({ handler }: PaperButtonProps) => {
  const [paper, setPaper] = useState(false);

  useEffect(() => {
    console.log("papeer button is clicked and changed.");
    handler(paper);
  }, [paper]);

  const clickHandler = () => {
    setPaper(true);
    console.log("papeer button is clicked.");
  };

  return <button onClick={clickHandler}>Paper Garbage Box</button>;
};

export default PaperButton;
