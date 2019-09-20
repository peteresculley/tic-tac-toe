import { combineReducers } from 'redux';
import MenuReducer from './menuReducer';
import GameReducer from './gameReducer';
import ScoreReducer from './scoreReducer';

export default combineReducers({
    menu: MenuReducer,
    game: GameReducer,
    score: ScoreReducer
});
