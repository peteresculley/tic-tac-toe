export const Player1 = 'X';
export const Player2 = 'O';
export const Draw = 'Draw';
export type Player = typeof Player1 | typeof Player2
export type GameSquare = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
export type Draw = typeof Draw
export type PlayerOrDraw = Player | Draw

export type GameMove = {
    player: Player
    square: GameSquare
}

export type GameRecord = {
    id: string | undefined
    backendId: number | undefined
    winner: PlayerOrDraw
    moves: GameSquare[]
}

export type GameForeignRecord = {
    backendId: number | undefined
    winner: number
    moves: number[]
}

export const MenuTabGame = 'GAME_TAB';
export const MenuTabScores = 'SCORES_TAB';
export type MenuTab = typeof MenuTabGame | typeof MenuTabScores
