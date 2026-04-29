import { useState, useEffect } from 'react';
import { pokemonService } from '../services/api';

export function usePokemon(identifier) {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!identifier) return;

    const fetchPokemon = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Busca os detalhes e a espécie em paralelo (Alta Performance)
        const [detailsData, speciesData] = await Promise.all([
          pokemonService.getPokemonDetails(identifier),
          pokemonService.getPokemonSpecies(identifier)
        ]);

        // Filtra a descrição: tenta achar em português, se não tiver, pega em inglês
        const entry = speciesData.flavor_text_entries.find(e => e.language.name === 'pt' || e.language.name === 'pt-br') 
                   || speciesData.flavor_text_entries.find(e => e.language.name === 'en');
        
        // Limpa as quebras de linha estranhas que vêm nativas da PokeAPI (\f, \n)
        const cleanDescription = entry ? entry.flavor_text.replace(/[\n\f]/g, ' ') : 'Descrição não disponível.';

        // Unifica os dados em um único objeto
        setPokemon({
          ...detailsData,
          description: cleanDescription
        });

      } catch (err) {
        setError('Pokémon não encontrado.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, [identifier]);
  console.log(pokemon);
  return { pokemon, isLoading, error };
  
}