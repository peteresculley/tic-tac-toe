import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';
import { Player1, Player2, Draw } from '../types';
import './DisplayResult.css';

interface IDisplayResult {
    resultMessage: string
}

const DisplayResult: React.FC<IDisplayResult> = ({ resultMessage }) => (
    <div className='DisplayResult'>
        {resultMessage}
    </div>
);

const mapStateToProps = (state: AppState): IDisplayResult => {
    const winner = state.game.winner;
    switch(winner) {
        case Player1:
            return {
                resultMessage: `${Player1} won!`
            };
        case Player2:
            return {
                resultMessage: `${Player2} won!`
            };
        case Draw:
            return {
                resultMessage: `It is a draw.`
            };
        default:
            return {
                resultMessage: ''
            };
    }
};

export default connect(mapStateToProps)(DisplayResult);
