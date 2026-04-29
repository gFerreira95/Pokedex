import { useState, useEffect, useCallback } from 'react';
import { pokemonService } from '../services/api';

export function useRandomPokemons(count = 12) {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Envolvemos a função em useCallback para evitar recriações desnecessárias (Performance/Clean Code)
  const fetchRandomPokemons = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Gera um array com 'count' números aleatórios entre 1 e 1025
      const randomIds = Array.from({ length: count }, () => 
        Math.floor(Math.random() * 1025) + 1
      );

      // 2. Prepara todas as requisições para rodarem ao mesmo tempo (Paralelismo)
      const requests = randomIds.map(id => pokemonService.getPokemonDetails(id));

      // 3. Aguarda todas as requisições terminarem
      const results = await Promise.all(requests);
      
      setPokemons(results);
    } catch (err) {
      setError('Falha ao buscar os Pokémon. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [count]);

  // Executa a busca automaticamente quando o componente é montado
  useEffect(() => {
    fetchRandomPokemons();
  }, [fetchRandomPokemons]);

  // O hook retorna apenas o que o componente precisa para renderizar a interface
  return { pokemons, isLoading, error, refetch: fetchRandomPokemons };
}