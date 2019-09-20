import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../redux/store';
import { Player, GameSquare, GameMove } from '../../types';
import GameSquareComp from './square';
import './index.css';

export const EmptySquare = '';
export type SquareValue = typeof EmptySquare | Player

function findSquareValue(moves: GameMove[], square: GameSquare): SquareValue {
    const move = moves.find(move => move.square === square);
    if(move) {
        return move.player;
    } else {
        return EmptySquare;
    }
}

interface ITicTacToeGame {
    moves: GameMove[]
}

const TicTacToeGame: React.FC<ITicTacToeGame> = ({ moves }) => (
    <div className='TicTacToeGame'>
        <table>
            <tr>
                <td><GameSquareComp value={findSquareValue(moves, 0)} square={0} /></td>
                <td><GameSquareComp value={findSquareValue(moves, 1)} square={1} /></td>
                <td><GameSquareComp value={findSquareValue(moves, 2)} square={2} /></td>
            </tr>
            <tr>
                <td><GameSquareComp value={findSquareValue(moves, 3)} square={3} /></td>
                <td><GameSquareComp value={findSquareValue(moves, 4)} square={4} /></td>
                <td><GameSquareComp value={findSquareValue(moves, 5)} square={5} /></td>
            </tr>
            <tr>
                <td><GameSquareComp value={findSquareValue(moves, 6)} square={6} /></td>
                <td><GameSquareComp value={findSquareValue(moves, 7)} square={7} /></td>
                <td><GameSquareComp value={findSquareValue(moves, 8)} square={8} /></td>
            </tr>
        </table>
    </div>
);

const mapStateToProps = (state: AppState): ITicTacToeGame => {
    return {
        moves: state.game.moves
    };
};

export default connect(mapStateToProps)(TicTacToeGame);
