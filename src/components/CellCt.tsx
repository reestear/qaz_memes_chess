import { Cell } from "../models/Cell";
import { boardstyle } from "../tailwind-styles";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
} 

export const CellCt = ({cell, selected, click}: CellProps) => {
    // console.log(cell);
    return (
        <div 
            onClick={() => click(cell)}
            className={`${boardstyle.cell} ${cell.color}Cell ${selected ? "selected" : ""} relative group`}
            style={{background: cell.available && cell.figure ? 'green' : ""}}
        >
            {cell.available && !cell.figure && <div className={"available"}></div>}
            {cell.figure?.logo && <img src={cell.figure.logo} className={boardstyle.figure}></img>}
            <div className={`${cell.color === "white" ? "text-black" : "text-white"} hidden group-hover:block w-full h-full absolute p-2 text-xs`}>{cell.figure?.name}</div>
        </div>
    )
}