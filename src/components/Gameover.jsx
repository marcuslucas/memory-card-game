import React from "react";

const Gameover = (props) => {
  return (
    <div className="gameover">
      <h1>Game Over</h1>
      <h2>Your Best Score: {props.bestScore}</h2>
      <button onClick={props.restartGame} className="restart-button">
        Restart
      </button>
    </div>
  );
};

export default Gameover;
