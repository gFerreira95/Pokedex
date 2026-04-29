import axios from 'axios';

// 1. Instância centralizada do Axios (DRY)
export const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000, // Boa prática: aborta a requisição se demorar mais de 10 segundos
});

// 2. Encapsulamento das chamadas da API (Clean Code)
export const pokemonService = {
  /**
   * Busca uma lista de Pokémon.
   * @param {number} limit - Quantidade de itens retornados.
   * @param {number} offset - Ponto de partida (para paginação).
   */
  getPokemons: async (limit = 20, offset = 0) => {
    const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  },

  /**
   * Busca os detalhes completos de um Pokémon específico.
   * @param {string|number} identifier - Nome ou ID do Pokémon.
   */
getPokemonDetails: async (identifier) => {
    // String(identifier) garante que números não quebrem o toLowerCase()
    const response = await api.get(`/pokemon/${String(identifier).toLowerCase()}`);
    return response.data;
  },

  getPokemonSpecies: async (identifier) => {
    const response = await api.get(`/pokemon-species/${String(identifier).toLowerCase()}`);
    return response.data;
  }
};