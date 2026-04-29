import { useState, useEffect, useMemo } from 'react';
import { pokemonService } from '../services/api';

export function usePokemonSearch() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Busca a lista mestre (apenas nomes e urls básicos) uma única vez
  useEffect(() => {
    const fetchMasterList = async () => {
      try {
        const data = await pokemonService.getPokemons(10000, 0);
        setAllPokemons(data.results);
      } catch (error) {
        console.error('Falha ao carregar lista de pesquisa', error);
      }
    };

    fetchMasterList();
  }, []);

  // useMemo processa a lista e gera as URLs das imagens (Performance)
  const filteredPokemons = useMemo(() => {
    if (!searchTerm.trim()) return [];
    
    const lowerTerm = searchTerm.toLowerCase();
    
    return allPokemons
      .filter((pokemon) => pokemon.name.includes(lowerTerm))
      .slice(0, 6) // Limita a 6 resultados
      .map(pokemon => {
        // Extrai o ID da URL. Ex: ".../pokemon/1/" -> extrai o "1"
        const id = pokemon.url.split('/').filter(Boolean).pop();
        
        // Constrói a URL do sprite padrão de frente (front_default)
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        
        return {
          ...pokemon,
          id,
          imageUrl
        };
      });
  }, [searchTerm, allPokemons]);

  // Abre o dropdown se houver texto, fecha se estiver vazio
  useEffect(() => {
    setIsOpen(searchTerm.trim().length > 0);
  }, [searchTerm]);

  const closeSearch = () => {
    setIsOpen(false);
    setSearchTerm('');
  };

  return { 
    searchTerm, 
    setSearchTerm, 
    filteredPokemons, 
    isOpen, 
    closeSearch 
  };
}