import React, { useState } from 'react'
import { calculateWinner } from '../../utils/WinnerCalculator';

import { Board } from '../Board/Board';
import { ResultModal } from '../ResultModal/ResultModal';
import './Game.css';



export const Game = () => {
    const [cellValues, setCellValues] = useState(['', '', '', '', '', '', '', '', '']);
    const [xIsNext, setXIsNext] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [numberOfTurnsLeft, setNumberOfTurnsLeft] = useState(9);
    const [winner, setWinner] = useState();
    const [winningCombination, setWinningCombination] = useState([]);
    const [turn, setTurn] = useState('X');

    const isCellEmpty = (cellIndex) => cellValues[cellIndex] === '';

    const restartGame = () => {
        setCellValues(['', '', '', '', '', '', '', '', '']);
        setXIsNext(true);
        setTurn('X');
        setIsGameOver(false);
        setNumberOfTurnsLeft(9);
        setWinner(undefined);
        setWinningCombination([]);
    };

    const onCellClicked = (cellIndex) => {
        if (isCellEmpty(cellIndex)) {
            const newCellValues = [...cellValues];
            newCellValues[cellIndex] = xIsNext ? 'X' : 'O';
            const newNumberOfTurnsLeft = numberOfTurnsLeft - 1;

            // Calculate the Result 
            const calcResult = calculateWinner(newCellValues, newNumberOfTurnsLeft, cellIndex);

            setCellValues(newCellValues);
            setXIsNext(!xIsNext);
            setTurn(!xIsNext ? 'X' : 'O');
            setIsGameOver(calcResult.hasResult);
            setNumberOfTurnsLeft(newNumberOfTurnsLeft);
            setWinner(calcResult.winner);
            setWinningCombination(calcResult.winningCombination);
        }
    };

    return (
        <>
            <div id="game">
                <p className="con-span"><span className="left-span">Tic Tac Toe</span><span className="right-span">{winner?'Game Over':turn+"'s Turn"}</span></p>
                {/* <p>X's Turn</p> */}
                <Board cellValues={cellValues} winningCombination={winningCombination} cellClicked={onCellClicked} />
            </div>
            <ResultModal isGameOver={isGameOver} winner={winner} onNewGameClicked={restartGame} />
        </>
    );
}
