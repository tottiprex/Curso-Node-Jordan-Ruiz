const getPokemons = async () => {
  const pokeData = await fetch("https://pokeapi.co/api/v2/pokemon");
  const pokemons = await pokeData.json();
  console.log(pokemons.results);
};

getPokemons();
