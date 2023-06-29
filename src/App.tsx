import { useEffect, useState } from "react";

import { Board } from "./models/Board";
import { BoardCt } from "./components/BoardCt"
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import { LostFigures } from "./components/LostFigures";
import { Timer } from "./components/Timer";

function App() {
    const [board, setBoard] = useState(new Board());

    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));

    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer)
    }, [])

    const restart = () => {
        const newBoard = new Board();

        newBoard.initCells();
        newBoard.addFigures();

        setBoard(newBoard)
    }

    const swapPlayer = () => {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
      <div className="flex justify-center items-center gap-40 w-full min-h-[100vh] bg-slate-300">
            <Timer restart={restart} currentPlayer={currentPlayer}/>
            <BoardCt 
                board={board} 
                setBoard={setBoard} 
                currentPlayer={currentPlayer} 
                swapPlayer={swapPlayer}
            />

            <div className="flex flex-col gap-10">
                <LostFigures 
                    title="Черные фигуры" 
                    figures={board.lostBlackFigures}
                />
                <LostFigures 
                    title="Белые фигуры" 
                    figures={board.lostWhiteFigures}
                />
            </div>
      </div>
    )
}

export default App
