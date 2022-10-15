import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export default defineStore('pokemon', () => {
  const pokemon = ref([])
  const pokemonDetails = {}
  let loaded = false;

  const fetchPokemon = async () => {
    if (loaded) return;

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=850';
    const response = await fetch(url);
    const data = await response.json();

    const loadedPokemon = data.results.map((pokemon, index) => ({
      name: pokemon.name,
      id: index + 1,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }))
    pokemon.value = loadedPokemon;
    loaded = true;
  }

  const getPokemonById = async (id) => {
    if (pokemonDetails[id]) return pokemonDetails[id];

    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      pokemonDetails[id] = data;
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  return { pokemon, fetchPokemon, getPokemonById }
})