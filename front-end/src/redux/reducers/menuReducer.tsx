import { ActionTypes, NEW_GAME, OPEN_SCORES_MENU } from '../actionTypes';
import { MenuTab, MenuTabGame, MenuTabScores } from '../../types';

const initialState = {
    tabOpen: MenuTabGame as MenuTab
};

export default function(state = initialState, action: ActionTypes) {
    switch(action.type) {
        case NEW_GAME:
            return { tabOpen: MenuTabGame as MenuTab };
        case OPEN_SCORES_MENU:
            return { tabOpen: MenuTabScores as MenuTab };
        default:
            return state;
    }
}
