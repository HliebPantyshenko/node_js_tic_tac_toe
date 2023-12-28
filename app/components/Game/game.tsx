'use client'
import React, { useState } from "react";
import Board from "../Board/board";

const Game: React.FC = () => {
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: (string | null)[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };
  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : `Restart Game`;
    const buttonClassName = move > 0 ? "regular-button" : "restart-button";

    return (
      <>
        <div>
          <button className={buttonClassName} onClick={() => jumpTo(move)}>
            {description}
          </button>
        </div>
      </>
      
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
