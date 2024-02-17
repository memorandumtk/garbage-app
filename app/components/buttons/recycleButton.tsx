// Recycling waste bin
'use client';
import React, {useState, useEffect} from "react";
import {FiTrash} from "react-icons/fi";

interface RecycleButtonProps {
    handler: (recycle: boolean) => void;
}

const RecycleButton = ({handler}: RecycleButtonProps) => {
    const [recycle, setRecycle] = useState(false);

    useEffect(() => {
        console.log("recycle button is clicked and changed.");
        handler(recycle);
    }, [recycle]);

    const clickHandler = () => {
        setRecycle(true);
        console.log("recycle button is clicked.");
    };

    return (
        <button
            className="border-2 border-black rounded-md p-2 bg-blue-300 hover:bg-blue-400 text-black font-bold text-lg"
            onClick={clickHandler}>
            Recycle
        </button>
    )
};

export default RecycleButton;

