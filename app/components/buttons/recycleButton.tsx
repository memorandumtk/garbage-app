// Recycling waste bin
'use client';
import React, { useState, useEffect } from "react";

interface RecycleButtonProps {
  handler: (recycle: boolean) => void;
}

const RecycleButton = ({ handler }: RecycleButtonProps) => {
  const [recycle, setRecycle] = useState(false);

  useEffect(() => {
    console.log("recyle button is clicked and changed.");
    handler(recycle);
  }, [recycle]);

  const clickHandler = () => {
    setRecycle(true);
    console.log("recycle button is clicked.");
  };

  return <button onClick={clickHandler}>Recycle Garbage Box</button>;
};

export default RecycleButton;

