import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Menu from './Menu';
import GameSummary from './Summary';
import Scores from './Scores';
import { AppState } from '../redux/store';
import { MenuTab, MenuTabGame, MenuTabScores, GameForeignRecord } from '../types';
import { LOAD_GAMES, LoadGamesAction } from '../redux/actionTypes';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';
import { AnyAction, ActionCreator } from 'redux';

const getScoresActionCreator: ActionCreator<ThunkAction<any, GameForeignRecord[], null, LoadGamesAction>> = () => {
    return async (dispatch: Dispatch<any>) => {
        const apiHost = process.env.REACT_APP_API_HOST || '127.0.0.1';
        const apiPort = process.env.REACT_APP_API_PORT || '8081';
        const result = await fetch(`http://${apiHost}:${apiPort}/api/scores/getAll`);
        const resultJson = await result.json();
        const loadGameAction: LoadGamesAction = {
            type: LOAD_GAMES,
            payload: {
                games: resultJson as GameForeignRecord[]
            }
        };
        return dispatch(loadGameAction);
    };
};

interface IAppProps {
    tabOpen: MenuTab
}

interface IAppDispatch {
    getScores: () => Promise<LoadGamesAction>
}

interface IApp extends IAppProps, IAppDispatch {}

class App extends React.Component<IApp> {
    componentDidMount() {
        this.props.getScores();
    }

    render() {
        return <div className="App">
            <Menu />
            {this.props.tabOpen === MenuTabGame ? <GameSummary /> : ''}
            {this.props.tabOpen === MenuTabScores ? <Scores /> : ''}
        </div>
    }
}

const mapStateToProps = (state: AppState): IAppProps => {
    return {
        tabOpen: state.menu.tabOpen
    };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    return {
        getScores: () => dispatch(getScoresActionCreator())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
