import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { AppState } from '../redux/store';
import { Player, Player1, Player2, PlayerOrDraw } from '../types';
import './TurnIndication.css';

interface ITurnIndication {
    currentTurnPlayer: Player
    winner: PlayerOrDraw | undefined
}

const TurnIndication: React.FC<ITurnIndication> = ({ currentTurnPlayer, winner }) => (
    <div className='TurnIndication'>
        <div className={classnames('PlayerIndication', 'Player1', { 'highlight': currentTurnPlayer === Player1, 'winner': winner === Player1 })}>
            {Player1}
        </div>
        <div className={classnames('PlayerIndication', 'Player2', { 'highlight': currentTurnPlayer === Player2, 'winner': winner === Player2 })}>
            {Player2}
        </div>
    </div>
);

const mapStateToProps = (state: AppState): ITurnIndication => {
    return { currentTurnPlayer: state.game.currentTurnPlayer, winner: state.game.winner };
};

export default connect(mapStateToProps)(TurnIndication);
