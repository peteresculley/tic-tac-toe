import { Player, Draw, PlayerOrDraw, GameMove, Player1, Player2 } from '../../types';
import { NEW_GAME, GAME_MOVE, MARK_SCORE, ActionTypesWithMiddleware } from '../actionTypes';

function findWinner(moves: GameMove[]): PlayerOrDraw | undefined {
    const board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    moves.forEach(move => {
        const row = move.square % 3;
        const col = Math.floor(move.square / 3);
        board[row][col] = move.player === Player1 ? 1 : 2;
    });
    if(board[0][0] !== 0) {
        if(board[0][0] === board[0][1] && board[0][0] === board[0][2]) {
            return board[0][0] === 1 ? Player1 : Player2;
        }
        if(board[0][0] === board[1][0] && board[0][0] === board[2][0]) {
            return board[0][0] === 1 ? Player1 : Player2;
        }
        if(board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            return board[0][0] === 1 ? Player1 : Player2;
        }
    }
    if(board[1][1] !== 0) {
        if(board[1][1] === board[0][1] && board[1][1] === board[2][1]) {
            return board[1][1] === 1 ? Player1 : Player2;
        }
        if(board[1][1] === board[1][0] && board[1][1] === board[1][2]) {
            return board[1][1] === 1 ? Player1 : Player2;
        }
        if(board[1][1] === board[0][2] && board[1][1] === board[2][0]) {
            return board[1][1] === 1 ? Player1 : Player2;
        }
    }
    if(board[2][2] !== 0) {
        if(board[2][2] === board[0][2] && board[2][2] === board[1][2]) {
            return board[2][2] === 1 ? Player1 : Player2;
        }
        if(board[2][2] === board[2][0] && board[2][2] === board[2][1]) {
            return board[2][2] === 1 ? Player1 : Player2;
        }
    }
    if(moves.length === 9) {
        return Draw;
    }
}

const initialState = {
    currentTurnPlayer: Player1 as Player,
    winner: undefined as PlayerOrDraw | undefined,
    moves: [] as GameMove[]
};

export default function(state = initialState, action: ActionTypesWithMiddleware) {
    switch(action.type) {
        case NEW_GAME:
            return initialState;
        case GAME_MOVE:
            const newMove: GameMove = {
                player: state.currentTurnPlayer,
                square: action.payload
            };
            if(state.moves.some(move => move.square === newMove.square)) {
                return state;
            } else {
                const newMoves = [...state.moves, newMove];
                const winner = findWinner(newMoves);
                let nextPlayer = state.currentTurnPlayer === Player1 ? Player2 as Player : Player1 as Player;
                if(winner) {
                    nextPlayer = state.currentTurnPlayer;
                    action.asyncDispatch({
                        type: MARK_SCORE,
                        payload: {
                            winner: winner,
                            moves: newMoves
                        }
                    });
                }
                return {
                    currentTurnPlayer: nextPlayer,
                    moves: newMoves,
                    winner: winner
                };
            }
        default:
            return state;
    }
}
