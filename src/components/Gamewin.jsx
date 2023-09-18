import React from "react";

const Gamewin = (props) => {
  return (
    <div>
      <h1>You Won</h1>
      <button onClick={props.restartGame} className="restart-button">
        Restart
      </button>
    </div>
  );
};

export default Gamewin;
