import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { AppState } from '../../redux/store';
import { SquareValue } from './index';
import { GAME_MOVE, GameMoveAction } from '../../redux/actionTypes';
import { GameSquare, Player1, Player2 } from '../../types';
import { EmptySquare } from './index';
import './square.css';

interface IGameSquareProps {
    value: SquareValue
    square: GameSquare
    isGameActive: boolean
}

interface IGameSquareDispatch {
    click: (square: GameSquare) => GameMoveAction
}

interface IGameSquare extends IGameSquareProps, IGameSquareDispatch {}

const GameSquareComp: React.FC<IGameSquare> = ({ value, square, isGameActive, click }) => (
    <div className={classnames('GameSquare-Container',
        { 'clickable': value === EmptySquare && isGameActive })} onClick={() => handleClick(click, square, isGameActive)}>
        <div className={classnames('GameSquare', { 'Player1': value === Player1, 'Player2': value === Player2 })}>
            {value}
        </div>
    </div>
);

function handleClick(click: IGameSquareDispatch["click"], square: GameSquare, isGameActive: boolean): void {
    if(isGameActive) {
        click(square);
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        isGameActive: !state.game.winner
    };
};

const mapDispatchToProps: IGameSquareDispatch = {
    click: (square: GameSquare) => ({ type: GAME_MOVE, payload: square })
};

export default connect(mapStateToProps, mapDispatchToProps)(GameSquareComp);
