import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePokemon } from '../hooks/usePokemon';
import { TYPE_COLORS } from '../constants/typeColors';


export function PokemonDetails() {
  const { identifier } = useParams();
  const { pokemon, isLoading, error } = usePokemon(identifier);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [availableImages, setAvailableImages] = useState([]);

  useEffect(() => {
    if (pokemon) {
      const images = [
        pokemon.sprites.other['official-artwork'].front_default,
        pokemon.sprites.front_default,
        pokemon.sprites.back_default,
        pokemon.sprites.front_shiny,
        pokemon.sprites.back_shiny,
      ].filter(Boolean);

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAvailableImages(images);
      setCurrentImageIndex(0);
    }
  }, [pokemon]);

  if (isLoading) return <div className="p-8 text-center" aria-live="polite">Loading...</div>;
  
  if (error) return (
    <div className="p-8 text-center" role="alert">
      <p className="text-red-500 mb-4">{error}</p>
      <Link to="/" className="text-blue-600 underline">Voltar para Home</Link>
    </div>
  );

  if (!pokemon) return null;

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden flex flex-col md:flex-row">
      
      {/* Coluna da Esquerda: Galeria de Imagens */}
      <div className="md:w-1/2 p-8 bg-slate-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 overflow-hidden">
        <div className="h-64 w-64 mb-6 flex items-center justify-center">
          <img 
            src={availableImages[currentImageIndex]} 
            alt={`Imagem atual de ${pokemon.name}`} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              // Filtro de sombra nativo do CSS para substituir o drop-shadow do Tailwind
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
              transition: 'transform 0.3s ease-in-out',
              // A Mágica Absoluta:
              imageRendering: currentImageIndex === 0 ? 'auto' : 'pixelated',
              transform: currentImageIndex === 0 ? 'scale(1)' : 'scale(1.5)'
            }}
          />
        </div>

        {/* Controles da Galeria usando Radio Buttons */}
        <fieldset className="flex gap-4">
          <legend className="sr-only">Escolha a imagem de visualização</legend>
          {availableImages.map((_, index) => (
            <label key={index} className="cursor-pointer relative">
              <input 
                type="radio" 
                name="pokemon-image" 
                value={index}
                checked={currentImageIndex === index}
                onChange={() => setCurrentImageIndex(index)}
                className="sr-only peer" 
              />
              <div className="w-4 h-4 rounded-full border-2 border-slate-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-focus:ring-2 peer-focus:ring-blue-400 transition-all" aria-hidden="true"></div>
              <span className="sr-only">Imagem {index + 1}</span>
            </label>
          ))}
        </fieldset>
      </div>

      {/* Coluna da Direita: Informações */}
      <div className="md:w-1/2 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-extrabold text-slate-800 capitalize">{pokemon.name}</h1>
          <span className="text-xl font-bold text-slate-400">#{String(pokemon.id).padStart(3, '0')}</span>
        </div>

        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          {pokemon.description}
        </p>

        <div className="mb-6 flex gap-3">
          {pokemon.types.map((t) => (
          <span 
          key={t.type.name} 
            className="text-white text-xs font-extrabold px-3 py-1 rounded capitalize drop-shadow-md border border-black/10"
          style={{ 
          backgroundColor: TYPE_COLORS[t.type.name] || '#94a3b8',
          textShadow: '0px 1px 2px rgba(0,0,0,0.4)'
        }}
        >
          {t.type.name}
          </span>
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="bg-slate-50 p-3 rounded border border-slate-100">
            <dt className="text-slate-500 font-semibold mb-1">Height</dt>
            <dd className="text-slate-900 font-bold">{pokemon.height / 10} m</dd>
          </div>
          <div className="bg-slate-50 p-3 rounded border border-slate-100">
            <dt className="text-slate-500 font-semibold mb-1">Weight</dt>
            <dd className="text-slate-900 font-bold">{pokemon.weight / 10} kg</dd>
          </div>
          <div className="col-span-2 bg-slate-50 p-3 rounded border border-slate-100">
            <dt className="text-slate-500 font-semibold mb-1">Abilities</dt>
            <dd className="text-slate-900 font-bold capitalize">
              {pokemon.abilities.map(a => a.ability.name).join(', ')}
            </dd>
          </div>
        </dl>

        <div>
          <h2 className="text-lg font-bold text-slate-800 mb-3 border-b border-slate-200 pb-2">Base Stats</h2>
          <ul className="space-y-2">
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name} className="flex items-center text-sm">
                <span className="w-1/3 text-slate-500 capitalize font-medium">{stat.stat.name.replace('-', ' ')}</span>
                <span className="w-1/6 font-bold text-right pr-2">{stat.base_stat}</span>
                <div className="w-1/2 bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full rounded-full" 
                    style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}