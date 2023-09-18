import React, { useEffect, useState } from "react";
import Card from "./components/Card";
import Board from "./components/Board";
import Gameover from "./components/Gameover";
import Score from "./components/Score";
import Gamewin from "./components/Gamewin";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

const App = (props) => {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [difficulty, setDifficulty] = useState(0);

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

  const handleDifficulty = (e) => {
    console.log(e.target.value);
    if (e.target.value >= 0 && e.target.value <= 10) {
      setDifficulty(e.target.value);
    }
  };

  const handleGameOver = () => {
    console.log("Game over");
    setGameOver(true);
  };

  const handleGameWin = () => {
    console.log("Game Won");
    setGameWin(true);
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setGameWin(false);
  };

  useEffect(() => {
    incrementBestScore();
  }, [score]);

  return (
    <div className="container">
      <Score score={score} />
      {/* <div className="difficulty">
        <input
          placeholder="Enter 1 - 10"
          type="number"
          onChange={handleDifficulty}
        />
      </div> */}
      {gameWin ? (
        <Gamewin restartGame={handleRestart} />
      ) : (
        !gameOver && (
          <Board
            incrementScore={incrementScore}
            setGameOver={handleGameOver}
            gameOver={gameOver}
            setGameWin={handleGameWin}
            difficulty={difficulty}
          />
        )
      )}
      {gameOver && (
        <Gameover restartGame={handleRestart} bestScore={bestScore} />
      )}
    </div>
  );
};

export default App;
