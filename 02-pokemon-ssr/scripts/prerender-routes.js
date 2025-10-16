
const TOTAL_POKEMONS = 10;
const TOTAL_PAGES = 5;

(async () => {

  const fs = require('fs');

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, index) => index + 1);

  let fileContent = pokemonIds.map(pokemon => `/pokemons/${pokemon}`).join('\n');

  const pages = Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1);

  fileContent = fileContent + '\n' + pages.map(page => `/pokemons/page/${page}`).join('\n');

  console.log(fileContent);

  // por nombres

  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`).then(response => response.json());

  fileContent += '\n' + pokemonNameList.results.map(pokemon => `/pokemon/${pokemon.name}`).join('\n');

  fs.writeFileSync('routes.txt', fileContent);

  console.log("Routes generated")

})();
