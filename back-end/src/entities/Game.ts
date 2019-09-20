
export interface IGame {
    id?: number;
    winner: number;
    moves: number[];
}

export class Game implements IGame {

    public id?: number;
    public winner: number;
    public moves: number[];

    constructor(winnerOrGame: number | IGame, moves?: number[]) {
        if (typeof winnerOrGame === 'number') {
            this.winner = winnerOrGame;
            this.moves = [...(moves || [])];
        } else {
            this.winner = winnerOrGame.winner;
            this.moves = [...(winnerOrGame.moves)];
        }
    }
}

export interface IGameSummary {
    wins1: number;
    wins2: number;
    draws: number;
}
