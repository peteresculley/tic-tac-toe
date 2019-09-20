import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';
import { Player1, Player2, Draw, GameRecord } from '../types';

interface IScores {
    Player1WinCount: number
    Player2WinCount: number
    DrawCount: number
}

const Scores: React.FC<IScores> = ({ Player1WinCount, Player2WinCount, DrawCount }) => (
    <div className='Scores'>
        <div className='WinCount'>
            <b>{Player1}</b> won: {Player1WinCount} times
        </div>
        <div className='WinCount'>
            <b>{Player2}</b> won: {Player2WinCount} times
        </div>
        <div className='WinCount'>
            <b>{Draw}</b>: {DrawCount} times
        </div>
    </div>
);

const mapStateToProps = (state: AppState) => {
    let Player1WinCount = 0;
    let Player2WinCount = 0;
    let DrawCount = 0;
    state.score.records.forEach((result: GameRecord) => {
        if(result.winner === Player1) {
            Player1WinCount++;
        }
        if(result.winner === Player2) {
            Player2WinCount++;
        }
        if(result.winner === Draw) {
            DrawCount++;
        }
    });
    return {
        Player1WinCount,
        Player2WinCount,
        DrawCount
    };
};

export default connect(mapStateToProps)(Scores);
