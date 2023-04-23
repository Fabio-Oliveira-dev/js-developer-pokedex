const pokemonNameInput = document.getElementById("pokemon-name-input");
const searchButton = document.getElementById("search-button");
const pokemonDetailsDiv = document.getElementById("pokemon-details");

      function showPokemonDetails(pokemon) {
        const html = `
          <h2>${pokemon.name}</h2>
          <p>Tipo ${pokemon.types.map(type => type.type.name).join(' ')}</p>
          <p>Na lista ${pokemon.id}</p>
          <p>Competição ${pokemon.flavor_text}</p>
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        `;
        pokemonDetailsDiv.innerHTML = html;
      }

      searchButton.addEventListener("click", () => {
        const pokemonName = pokemonNameInput.value.toLowerCase();
        /*https://pokeapi.co/api/v2/pokemon/*/
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
          .then(response => {
            if (!response.ok) {
              throw new Error("Pokémon não encontrado.");
            }
            return response.json();
          })
          .then(pokemon => {
            showPokemonDetails(pokemon);
          })
          .catch(error => {
            pokemonDetailsDiv.innerHTML = `<p>${error.message}</p>`;
          });
      });