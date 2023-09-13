// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const api = (props) => {
//   const [pokeData, setPokeData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resp = await axios.get(
//           "https://pokeapi.co/api/v2/pokemon?limit=10"
//         );
//         const pokeList = resp.data.results;

//         const pokeDetails = await Promise.all(
//           pokeList.map(async (pokemon) => {
//             const detailResp = await axios.get(pokemon.url);
//             return {
//               name: pokemon.name,
//               sprite: detailResp.data.sprites.front_default,
//             };
//           })
//         );
//         setPokeData(pokeDetails);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error Fetching Data:", error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);
// };
// export { pokeData };

// export default api;
