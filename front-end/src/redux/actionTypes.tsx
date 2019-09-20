import { PlayerOrDraw, GameSquare, GameMove } from '../types';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export const NEW_GAME = 'NEW_GAME';
export const OPEN_SCORES_MENU = 'OPEN_SCORES_MENU';
export const GAME_MOVE = 'GAME_MOVE';
export const MARK_SCORE = 'MARK_SCORE';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export interface NewGameAction {
    type: typeof NEW_GAME
}

export interface OpenScoresMenuAction {
    type: typeof OPEN_SCORES_MENU
}

export interface GameMoveAction {
    type: typeof GAME_MOVE
    payload: GameSquare
}

export interface MarkScoreAction {
    type: typeof MARK_SCORE
    payload: {
        winner: PlayerOrDraw
        moves: GameMove[]
    }
}

export interface UpdateScoreAction {
    type: typeof UPDATE_SCORE
    payload: {
        id: string
        backendId: number
    }
}

interface MiddlewareAdditions {
    asyncDispatch: Dispatch<any> | ThunkDispatch<any, never, any>
}

export type ActionTypes = NewGameAction | OpenScoresMenuAction | GameMoveAction | MarkScoreAction | UpdateScoreAction
export type ActionTypesWithMiddleware = ActionTypes & MiddlewareAdditions
