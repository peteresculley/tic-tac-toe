import { ActionTypesWithMiddleware, MARK_SCORE, UPDATE_SCORE, LOAD_GAMES } from '../actionTypes';
import { PlayerOrDraw, Player1, Player2, Draw, GameMove, GameRecord, GameSquare, Player } from '../../types';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../store';

function createId(): string {
    // may not be truely random, but it doesn't matter here
    return Math.random().toString(36).substring(2);
}

function convertFromWinner(winner: PlayerOrDraw): number {
    switch(winner) {
        case Player1:
            return 1;
        case Player2:
            return 2;
        case Draw:
        default:
            return -1;
    }
}

function convertToWinner(winnerNumber: number): PlayerOrDraw {
    switch(winnerNumber) {
        case 1:
            return Player1;
        case 2:
            return Player2;
        case -1:
        default:
            return Draw;
    }
}

function convertFromMove(move: GameMove): GameSquare {
    return move.square;
}

function convertToMoves(squares: number[]): GameSquare[] {
    return squares as GameSquare[];
}

function sendGame(game: GameRecord): (ThunkAction<void, AppState, null, Action<GameRecord>>) {
    return async (dispatch) => {
        const postBody = {
            winner: convertFromWinner(game.winner),
            moves: [...game.moves]
        };
        const apiHost = process.env.REACT_APP_API_HOST || '127.0.0.1';
        const apiPort = process.env.REACT_APP_API_PORT || '8081';
        fetch(`http://${apiHost}:${apiPort}/api/scores/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        }).then(res => res.json()).then(body => {
            const backendId = body.id;
            dispatch(() => ({
                type: UPDATE_SCORE,
                payload: {
                    id: game.id,
                    backendId: backendId
                }
            }));
        }).catch((e) => console.log(e));
    }
}

function sendGameSimple(game: GameRecord): void {
    const postBody = {
        winner: convertFromWinner(game.winner),
        moves: [...game.moves]
    };
    const apiHost = process.env.REACT_APP_API_HOST || '127.0.0.1';
    const apiPort = process.env.REACT_APP_API_PORT || '8081';
    fetch(`http://${apiHost}:${apiPort}/api/scores/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postBody)
    }).then(res => res.json()).then(body => {
        const backendId = body.id;
        console.log(`Got id from backend: ${backendId}`);
    }).catch((e) => console.log(e));
}

const initialState = {
    records: [] as GameRecord[]
};

export default function(state = initialState, action: ActionTypesWithMiddleware) {
    switch(action.type) {
        case MARK_SCORE:
            const winner = action.payload.winner;
            const id = createId();
            const newRecord = {
                id: id,
                backendId: undefined,
                winner: winner,
                moves: action.payload.moves.map(convertFromMove)
            };
            sendGameSimple(newRecord);
            // action.asyncDispatch(sendGame(newRecord));
            return {
                records: [...state.records, newRecord]
            };
        case UPDATE_SCORE:
            const frontendId = action.payload.id;
            const backendId = action.payload.backendId;
            state.records.forEach(record => {
                if(record.id === frontendId) {
                    record.backendId = backendId;
                }
            });
            return state;
        case LOAD_GAMES:
            const games = action.payload.games;
            state.records = state.records.concat(games.map(game => {
                const winner = convertToWinner(game.winner);
                const moves = convertToMoves(game.moves);
                const backendId = game.backendId;
                return {
                    winner,
                    moves,
                    backendId,
                    id: undefined as string | undefined
                };
            }));
            return state;
        default:
            return state;
    }
}
