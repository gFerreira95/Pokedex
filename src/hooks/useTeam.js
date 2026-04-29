import { useState, useEffect } from 'react';

export function useTeam() {
  // Inicializa lendo do LocalStorage ou com um array vazio
  const [team, setTeam] = useState(() => {
    const savedTeam = localStorage.getItem('@pokedex-team');
    return savedTeam ? JSON.parse(savedTeam) : [];
  });

  // Toda vez que o time mudar, salva automaticamente no LocalStorage
  useEffect(() => {
    localStorage.setItem('@pokedex-team', JSON.stringify(team));
  }, [team]);

  const addToTeam = (pokemon) => {
    if (team.length >= 6) {
      alert('Seu time já está cheio! (Máximo 6 Pokémon)');
      return;
    }
    
    // Verifica se já não está no time para evitar duplicatas
    if (team.some(p => p.name === pokemon.name)) {
      alert(`${pokemon.name} já está no seu time!`);
      return;
    }

    // Salvamos apenas o essencial para não pesar a memória
    const pokemonToSave = {
      id: pokemon.id,
      name: pokemon.name,
      sprite: pokemon.sprites.front_default,
      types: pokemon.types.map(t => t.type.name),
    };

    setTeam([...team, pokemonToSave]);
  };

  const removeFromTeam = (pokemonName) => {
    setTeam(team.filter(p => p.name !== pokemonName));
  };

  const isTeamFull = team.length >= 6;
  const isInTeam = (pokemonName) => team.some(p => p.name === pokemonName);

  return { team, addToTeam, removeFromTeam, isTeamFull, isInTeam };
}