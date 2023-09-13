import React from "react";
import Card from "./Card";
import { useState } from "react";

const Board = (props) => {
  const [clickedElem, setClickedElem] = useState([]);
  const [index, setIndex] = useState(0);

  const handleClickedElem = (elem) => {
    console.log("clicked clickedElem");
    setClickedElem(clickedElem.concat(elem));
  };

  const cleanClickedElem = () => {
    setClickedElem([]);
  };

  const incrementScore = () => {
    setIndex(index + 1);
    console.log("Increment Score");
  };

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const data = ["Item 1", "Item 2", "Item 3", "Item 4"];
  console.log(shuffle(data));
  const cards = data.map((item, index) => (
    <Card
      key={index}
      name={item}
      handleClickedElem={handleClickedElem}
      incrementScore={incrementScore}
    />
  ));

  return (
    <div>
      <h1>{index}</h1>
      {cards}
    </div>
  );
};

export default Board;
