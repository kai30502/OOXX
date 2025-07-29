import React, { useState } from 'react';
import './Game.css'; 

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameOver, setGameOver] = useState(false);

  const checkWinner = () => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (gameOver || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    const winner = checkWinner();
    if (winner) {
        alert(`${winner} 贏了！`);
        setGameOver(true);
    } else if (!newBoard.includes(null)) {
        alert('平手！');
        setGameOver(true);
    } else {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const renderSquare = (index) => {
    return (
        <button 
            className="square" 
            onClick={() => handleClick(index)}>
            {board[index]}
        </button>
    );
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameOver(false);
  };

  return (
    <div className="game">
      <h1>圈圈叉叉</h1>
      <p>輪到： {currentPlayer}</p>
      <div className="board">
        {board.map((_, index) => (
          <div className="row" key={index}>
            {renderSquare(index)}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>重新開始</button>
      
    </div>
  );
};

export default Game;
