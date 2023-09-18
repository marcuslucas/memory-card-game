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

  let limit = index + 4;
  let count = 40;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${count}`
        );
        const pokeList = resp.data.results;
        const randomPokemon = pokeList
          .sort(() => 0.5 - Math.random())
          .slice(0, limit);

        const pokeDetails = await Promise.all(
          randomPokemon.map(async (pokemon) => {
            const detailResp = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              sprite: detailResp.data.sprites.front_default,
              id: pokemon.id,
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
  }, [index]);

  const handleClickedElem = (elem) => {
    // console.log("Setting Elem");
    setClickedElem(clickedElem.concat(elem));
  };

  const cleanClickedElem = () => {
    // console.log("Cleaning...");
    setClickedElem([]);
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
    if (clickedElem.length >= pokeData.length && index < 5 && !loading) {
      // console.log(pokeData);
      incrementIndex();
      cleanClickedElem();
    }
    if (index >= 5) {
      console.log("Win Condition");
      props.setGameWin();
    }
  }, [clickedElem, loading]);

  const data = pokeData.map((pokemon, num) => {
    return (
      <div key={num} className="pokemon-cards">
        <Card
          id={pokemon.id}
          name={pokemon.name}
          img={pokemon.sprite}
          handleClickedElem={handleClickedElem}
          incrementScore={props.incrementScore}
          setGameOver={props.setGameOver}
          index={index}
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
