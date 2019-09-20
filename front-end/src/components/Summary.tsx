import React from 'react';
import TurnIndication from './TurnIndication';
import TicTacToeGame from './TicTacToeGame';
import DisplayResult from './DisplayResult';

const Summary: React.FC = () => (
    <div className='Summary'>
        <TurnIndication />
        <TicTacToeGame />
        <DisplayResult />
    </div>
);

export default Summary;
