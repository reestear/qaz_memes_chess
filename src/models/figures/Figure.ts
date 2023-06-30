import logo from "../../assets/black-king.png";
import { Cell } from "../Cell";
import { Colors } from "../Colors";

export enum FigureNames {
    KING = "Король",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    KNIGHT = "Конь",
    BISHOP = "Слон",
    PAWN = "Пешка",
    FIGURE = "Фигура"
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
    }

    canMove(target: Cell) : boolean {
        if (target.figure?.color === this.color) {
            return false;
        }

        if (target.figure?.name === FigureNames.KING) {
            return false;
        }

        return true;
    }

    moveFigure(target: Cell) : boolean {
        if (target.figure && this.name === 'Пешка' && this.color === "white") {
            const audioElement = new Audio('src/kaz-memes-chess-audio/tore.mp3');
            this.logo = 'src/assets/white-pawn-action.png';

            audioElement.play();

            audioElement.addEventListener('ended', () => {
                this.logo = 'src/assets/white-pawn.png';
            });
        }

        if (target.figure && this.name === 'Пешка' && this.color === "black") {
            const audioElement = new Audio('src/kaz-memes-chess-audio/kairosh.mp3');
            this.logo = 'src/assets/white-pawn-action.png';

            audioElement.play();

            audioElement.addEventListener('ended', () => {
                this.logo = 'src/assets/white-pawn.png';
            });
        }


        return true;
    }
}