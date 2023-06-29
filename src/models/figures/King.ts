import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";

import blackLogo from "../../assets/black-king.png"
import whiteLogo from "../../assets/white-king.png"

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);

        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) return false;
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);
        return dx <= 1 && dy <= 1;
    }
}

// I am writing chess on the TypeScript and React, and I want to write code about king logic. You need to write code that has logic of the king's movement, code that checks that king checked and king mated.  

// Requirements: