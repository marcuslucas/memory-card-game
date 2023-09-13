import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Board from "./components/Board";
import Gameover from "./components/Gameover";
import Score from "./components/Score";

const App = (props) => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const incrementScore = () => {
    setScore(score + 1);
  };

  const incrementBestScore = () => {
    if (bestScore === 0) {
      setBestScore(score);
    }
    if (bestScore > 0) {
      if (bestScore < score) {
        setBestScore(score);
      }
    }
  };

  const handleGameOver = () => {
    console.log("Game over");
    setGameOver(true);
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    incrementBestScore();
  }, [score]);

  return (
    <div>
      <Score score={score} />
      {!gameOver && (
        <Board
          incrementScore={incrementScore}
          setGameOver={handleGameOver}
          gameOver={gameOver}
        />
      )}
      {gameOver && (
        <Gameover restartGame={handleRestart} bestScore={bestScore} />
      )}
    </div>
  );
};

export default App;
