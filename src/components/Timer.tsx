import { useState, useRef, useEffect } from "react";

import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

export const Timer = ({currentPlayer, restart}: TimerProps) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)
    
    const startTimer = () => {
        if (timer.current) {
            clearInterval(timer.current);
        }

        const callback = currentPlayer?.color === Colors.WHITE 
            ? decrementWhiteTimer 
            : decrementBlackTimer

        timer.current = setInterval(callback, 1000);
    }

    const handleRestart = () => {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    }

    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    const decrementBlackTimer = () => {
        setBlackTime(prev => prev - 1)
    }

    const decrementWhiteTimer = () => {
        setWhiteTime(prev => prev - 1)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-40 text-center text-2xl mt-16">
            <h2>Черные - {blackTime} </h2>

            <div className="bg-red-500 text-white font-bold p-4 rounded-2xl">
                <button onClick={handleRestart} >Restart</button>
            </div>

            <h2>Белые - {whiteTime} </h2>
        </div>
    )
}