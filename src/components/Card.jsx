import React from "react";
import { useState } from "react";

const Card = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    if (isClicked) {
      props.setGameOver();
    } else {
      setIsClicked(true);
      const elem = { name: props.name };
      props.incrementScore();
      props.handleClickedElem(elem);
    }
  };

  return (
    <div onClick={handleClick} className="card-container">
      {props.name}
    </div>
  );
};

export default Card;
