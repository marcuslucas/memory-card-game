import React from "react";
import Card from "./Card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Board = (props) => {
  const [clickedElem, setClickedElem] = useState([]);
  const [index, setIndex] = useState(0);

  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=5"
        );
        const pokeList = resp.data.results;
        // console.log(pokeList);

        const pokeDetails = await Promise.all(
          pokeList.map(async (pokemon) => {
            const detailResp = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              sprite: detailResp.data.sprites.front_default,
            };
          })
        );
        // console.log(pokeDetails);
        setPokeData(pokeDetails);
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClickedElem = (elem) => {
    console.log("Setting Elem");
    setClickedElem(clickedElem.concat(elem));
  };

  const cleanClickedElem = () => {
    console.log("Cleaning...");
    setClickedElem([]);
    setIndex(0);
  };

  const incrementIndex = () => {
    setIndex(index + 1);
  };

  const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    if (clickedElem.length >= data.length && index < 5) {
      incrementIndex();
      cleanClickedElem();
    }
  }, []);

  const data = pokeData.map((pokemon, index) => {
    console.log(pokeData[index]);
    return (
      <div key={index} className="pokemon-cards">
        <Card
          name={pokemon.name}
          img={pokemon.sprite}
          handleClickedElem={handleClickedElem}
          incrementScore={props.incrementScore}
          setGameOver={props.setGameOver}
        />
      </div>
    );
  });

  shuffle(data);

  if (loading) {
    return <div className="">loading...</div>;
  }

  return <div className="board">{data}</div>;
};

export default Board;
