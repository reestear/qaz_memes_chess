import { Cell } from "../models/Cell";
import { FigureNames } from "../models/figures/Figure";
import { boardstyle } from "../tailwind-styles";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
} 

export const CellCt = ({cell, selected, click}: CellProps) => {
    return (
        <div 
            onClick={() => click(cell)}
            className={`${boardstyle.cell} ${cell.color}Cell ${selected ? "selected" : ""}`}
            style={{background: cell.available && cell.figure ? 'green' : cell.figure?.name === FigureNames.KING ? cell.color : ""}}
        >
            {cell.available && !cell.figure && <div className={"available"}></div>}
            {cell.figure?.logo && <img src={cell.figure.logo} className={boardstyle.figure}></img>}
        </div>
    )
}