import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import Menu from './Menu';
import GameSummary from './Summary';
import Scores from './Scores';
import { AppState } from '../redux/store';
import { MenuTab, MenuTabGame, MenuTabScores } from '../types';

interface IApp {
    tabOpen: MenuTab
}

const App: React.FC<IApp> = ({ tabOpen }) => (
    <div className="App">
        <Menu />
        {tabOpen === MenuTabGame ? <GameSummary /> : ''}
        {tabOpen === MenuTabScores ? <Scores /> : ''}
    </div>
);

const mapStateToProps = (state: AppState): IApp => {
    return {
        tabOpen: state.menu.tabOpen
    };
};

export default connect(mapStateToProps)(App);
