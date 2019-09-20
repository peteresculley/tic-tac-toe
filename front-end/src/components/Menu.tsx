import React from 'react';
import { connect } from 'react-redux';
import { NEW_GAME, OPEN_SCORES_MENU, NewGameAction, OpenScoresMenuAction } from '../redux/actionTypes';
import './Menu.css';

interface MenuDispatch {
    newGame: () => NewGameAction
    goToScores: () => OpenScoresMenuAction
}

interface Menu extends MenuDispatch {}

const Menu: React.FC<Menu> = ({ newGame, goToScores }) => (
    <div className='Menu'>
        <div className='MenuTab' onClick={newGame}>
            New Game
        </div>
        <div className='MenuTab' onClick={goToScores}>
            Scores
        </div>
    </div>
);

const mapDispatchToProps: MenuDispatch = {
    newGame: () => ({ type: NEW_GAME }),
    goToScores: () => ({ type: OPEN_SCORES_MENU })
};

export default connect(null, mapDispatchToProps)(Menu);
