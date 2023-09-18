import React, { useEffect } from "react";
import { useState } from "react";

const Card = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const clearState = () => {
    console.log("clear state");
    setIsClicked(false);
  };

  useEffect(() => {
    clearState();
  }, [props.index]);

  const handleClick = () => {
    if (isClicked) {
      console.log("already clicked");
      props.setGameOver();
    } else {
      setIsClicked(true);
      const elem = { name: props.name };
      props.incrementScore();
      props.handleClickedElem(elem);
    }
  };

  return (
    <div onClick={handleClick} className="pokemon-card">
      <h3>{props.name}</h3>
      <img className="pokemon-image" src={props.img} alt={props.name} />
    </div>
  );
};

export default Card;
