const pokemonNameInput = document.getElementById("pokemon-name-input");
const searchButton = document.getElementById("search-button");
const pokemonDetailsDiv = document.getElementById("pokemon-details");

      function showPokemonDetails(pokemon) {
        const html = `
          <h2>${pokemon.name}</h2>
          <p>Tipo: ${pokemon.types.map(type => type.type.name).join(' ')}</p>
          <p>Posição Na Lista: ${pokemon.id}ª</p>
          <p>Experiência: ${pokemon.base_experience}</p>
          <p>Habilidades: ${pokemon.abilities.map(abilities => abilities.ability.name).join(' ')}</p>
          <p>Peso: ${pokemon.weight} Kilogramas</p>
          <p>Altura: ${pokemon.height} Centimetros</p>
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