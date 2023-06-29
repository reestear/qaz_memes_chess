import { useEffect, useState } from "react";

import { Board } from "../models/Board"
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";

import { CellCt } from "./CellCt";

import { boardstyle } from "../tailwind-styles"
import { Colors } from "../models/Colors";


interface BoardProps {
    board: Board;
    currentPlayer: Player | null;

    setBoard: (board: Board) => void;
    swapPlayer: () => void;
}

export const BoardCt = ({board, setBoard, currentPlayer, swapPlayer}: BoardProps) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const click = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    const highlightCells = () => {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        
        setBoard(newBoard)
    } 

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    return (
        <div className={`flex flex-col gap-10 text-center font-bold text-2xl`}>
            <h2> Текущий игрок: {currentPlayer?.color === Colors.BLACK ? "Черный" : "Белый"} </h2>
            <div className={boardstyle.board}>
            {board.cells.map((row, index) => {
                return (
                    <div key={index}>
                        {
                            row.map(cell => <CellCt 
                                click={click}
                                cell={cell} 
                                key={cell.id}
                                selected={
                                    cell.x === selectedCell?.x 
                                    && 
                                    cell.y === selectedCell?.y
                                }
                            />)
                        }
                    </div>
                )
            })}
            </div>
        </div>
    )
}