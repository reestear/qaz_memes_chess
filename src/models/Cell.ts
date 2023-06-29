import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    color: Colors;

    figure: Figure | null;
    board: Board
    available: boolean; // Figure can or cannot move to this Cell
    id: number;

    constructor(x: number, y: number, color: Colors, figure: Figure | null, board: Board) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random()
    }

    isInBorders(x: number, y: number) : boolean{
        if(0 <= x && x < 8 && 0 <= y && y < 8) return true;
        return false;
    }

    isEmpty(): boolean { 
        return this.figure === null;
    }

    isEnemy(target: Cell): boolean {
        if (target.figure) {
            return this.figure?.color !== target.figure.color;
        }

        return false;
    }

    checkForCheck(x: number, y: number, oppColor: string) : boolean{
        if(this.board.getCell(x, y).figure?.name === FigureNames.KING && this.board.getCell(x, y).figure?.color === oppColor) 
            return true;
            
        return false;
    }

    isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x) return false;
        
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    checkKingOnVertical(from: Cell, oppColor: string): boolean {
        const y = from.y;
        for(let i = from.x + 1; i < 8; i++){
            if(this.checkForCheck(i, y, oppColor)) 
                return true;
            if(this.board.getCell(i, y).figure) break;
        }
        for(let i = from.x - 1; i >= 0; i--){
            if(this.checkForCheck(i, y, oppColor)) 
                return true;
            if(this.board.getCell(i, y).figure) break;
        }
        return false;
    }

    isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y) return false;
        
        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    checkKingOnHorizontal(from: Cell, oppColor: string): boolean {
        const x = from.x;
        for(let i = 0; i < 8; i++){
            if(this.checkForCheck(x, i, oppColor)) 
                return true;
        }
        return false;
    }

    /*
          0 1 2 3
        0 * * * *
        1 * * * *
        2 * * * *
        3 * * * *
    */

    isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);

        if (absY !== absX) return false;

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for (let d = 1; d < absY; d++) {
            if (!this.board.getCell(this.x + dx * d, this.y + dy * d).isEmpty()) {
                return false;
            }
        }

        return true;
    }

    checkKingOnDiagonal(from: Cell, oppColor: string): boolean {
        const min_min = Math.min(from.x, from.y);
        let startX = from.x - min_min, startY = from.y - min_min;
        for(let i = 0; i < 8; i++){
            const newX = startX + i, newY = startY + i;
            if(newX == 8 || newY == 8) break;

            if(this.checkForCheck(newX, newY, oppColor))
                return true;
        }
        const min_pl = Math.min(from.x, 7 - from.y);
        startX = startX = from.x - min_pl, startY = from.y + min_pl;
        for(let i = 0; i < 8; i++){
            const newX = startX + i, newY = startY - i;
            if(newX == 8 || newY == -1) break;

            if(this.checkForCheck(newX, newY, oppColor))
                return true;
        }

        return false;
    }

    checkKingOnKnight(from: Cell, oppColor: string) : boolean {
        const dy = [-2, -1, 1, 2, 2, 1, -1, -2];
        const dx = [1, 2, 2, 1, -1, -2, -2, -1];
        const startX = from.x, startY = from.y;

        for(let i = 0; i < 8; i++){
            const newX = startX + dx[i], newY = startY + dy[i];
            if(this.isInBorders(newX, newY)) {
                if(this.checkForCheck(newX, newY, oppColor)) return true;
            }
        }
        return false;
    }

    checkKingOnPawn(from: Cell, oppColor: string) : boolean {
        const startX = from.x, startY = from.y;
        if(oppColor === oppColor) {
            let newX = startX + 1, newY = startY + 1;
            if(this.isInBorders(newX, newY) && this.checkForCheck(newX, newY, oppColor)) return true;
            newX = startX + 1, newY = startY - 1;
            if(this.isInBorders(newX, newY) && this.checkForCheck(newX, newY, oppColor)) return true;
            return false;
        }
        else {
            let newX = startX - 1, newY = startY - 1;
            if(this.isInBorders(newX, newY) && this.checkForCheck(newX, newY, oppColor)) return true;
            newX = startX - 1, newY = startY + 1;
            if(this.isInBorders(newX, newY) && this.checkForCheck(newX, newY, oppColor)) return true;
            return false;
        }
    }

    // function isKingUnderAttack(opponentPieces, kingPosition):
    // for each piece in opponentPieces:
    //     if piece.type is "queen" or "rook" or "bishop":
    //         if piece can attack in a straight line or along a diagonal to kingPosition:
    //             return true
    //     else if piece.type is "knight":
    //         if piece can attack in an L-shaped pattern to kingPosition:
    //             return true
    //     else if piece.type is "pawn":
    //         if piece can attack diagonally to kingPosition:
    //             return true
    
    // return false

    isKingUnderAttackSome(myColor: string, oppColor: string): boolean {
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                const cell = this.board.getCell(i, j);
                if(cell.figure?.color === myColor) {
                    if(cell.figure?.name === FigureNames.QUEEN){
                        if(this.checkKingOnDiagonal(this.board.getCell(i, j), oppColor)
                        || this.checkKingOnHorizontal(this.board.getCell(i, j), oppColor)
                        || this.checkKingOnVertical(this.board.getCell(i, j), oppColor)) 
                            return true;

                    }
                    if(cell.figure?.name === FigureNames.BISHOP){
                        if(this.checkKingOnDiagonal(this.board.getCell(i, j), oppColor)) 
                            return true;
                    }
                    if(cell.figure?.name === FigureNames.ROOK){
                        if(this.checkKingOnHorizontal(this.board.getCell(i, j), oppColor)
                        || this.checkKingOnVertical(this.board.getCell(i, j), oppColor)) 
                            return true;
                    }
                    if(cell.figure?.name === FigureNames.KNIGHT){
                        if(this.checkKingOnKnight(this.board.getCell(i, j), oppColor)) 
                            return true;
                    }
                    if(cell.figure?.name === FigureNames.PAWN){
                        if(this.checkKingOnPawn(this.board.getCell(i, j), oppColor))
                            return true;
                    }
                }
            }
        }
        return false;
    }

    isKingUnderAttackWhite(): boolean {
        return this.isKingUnderAttackSome(Colors.BLACK, Colors.WHITE);
    }

    isKingUnderAttackBlack(): boolean {
        return this.isKingUnderAttackSome(Colors.WHITE, Colors.BLACK)
    }

    colorKing(myColor: string): void {
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                const cell = this.board.getCell(i, j);
                if(cell.figure?.name === FigureNames.KING && cell.figure?.color === myColor){
                    console.log(cell.color)
                    cell.color = Colors.ORANGE;
                }
            }
        }
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK 
            ? this.board.lostBlackFigures.push(figure)
            : this.board.lostWhiteFigures.push(figure)
    }

    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    moveFigure(target: Cell) {
        if (this.figure && this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            if (target.figure) {
                this.addLostFigure(target.figure)
            }

            target.setFigure(this.figure);
            this.figure = null;
            if(this.isKingUnderAttackBlack()) console.log("BLACK KING GET CHECKED"), this.colorKing(Colors.WHITE)
            if(this.isKingUnderAttackWhite()) console.log("WHITE KING GET CHECKED"), this.colorKing(Colors.BLACK)
        }
    }
}