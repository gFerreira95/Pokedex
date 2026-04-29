import { useRandomPokemons } from '../hooks/useRandomPokemons';
import { Link } from 'react-router-dom';
import { TYPE_COLORS } from '../constants/typeColors';

export function Home() {
  // Consumindo nosso Custom Hook
  const { pokemons, isLoading, error, refetch } = useRandomPokemons(12);

  // Tratamento de Estado: Carregando
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64" aria-live="polite">
        <p className="text-xl font-semibold text-slate-600">Searching for wild Pokémon...</p>
      </div>
    );
  }

  // Tratamento de Estado: Erro
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64" role="alert">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button 
          onClick={refetch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors focus:ring-4 focus:ring-blue-300 outline-none"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Tratamento de Estado: Sucesso
  return (
    <section aria-labelledby="home-title">
      <div className="flex justify-between items-center mb-6">
        <h1 id="home-title" className="text-3xl font-extrabold text-slate-800">
          Random Pokémon
        </h1>
        <button 
          onClick={refetch}
          className="text-sm bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors focus:ring-4 focus:ring-slate-300 outline-none"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemons.map((pokemon) => (
          <article 
            key={pokemon.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md hover:ring-2 hover:ring-blue-400 transition-all border border-slate-200 relative"
          >
            <Link 
              to={`/pokemon/${pokemon.name}`} 
              className="flex flex-col items-center p-6 w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-xl"
            >
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                alt={`Ilustração do Pokémon ${pokemon.name}`} 
                className="w-32 h-32 object-contain mb-4"
              />
              <h2 className="text-xl font-bold text-slate-800 capitalize mb-2">
                {pokemon.name}
              </h2>
              {/* Exibição dos tipos nos Cards */}
      <div className="flex gap-2 mt-3">
        {pokemon.types.map((t) => (
          <span 
            key={t.type.name}
            className="text-[10px] text-white font-bold px-2 py-0.5 rounded capitalize"
            style={{ 
              backgroundColor: TYPE_COLORS[t.type.name] || '#94a3b8',
            }}
          >
            {t.type.name}
          </span>
        ))}
      </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}