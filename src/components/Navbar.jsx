import { NavLink, Link } from 'react-router-dom';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import logoImg from '../assets/pokeball-icon.png'; 

export function Navbar() {
  const { searchTerm, setSearchTerm, filteredPokemons, isOpen, closeSearch } = usePokemonSearch();

  const getNavStyle = ({ isActive }) =>
    isActive
      ? 'text-black font-bold border-b-2 border-white pb-1'
      : 'text-black/80 hover:text-blue transition-colors pb-1';

  return (
    <nav className="bg-white shadow-md border-b px-6 py-4 flex justify-between items-center relative z-50" aria-label="Navegação Principal">
      
      {/* Grupo da Esquerda: Apenas Links agora */}
      <ul className="flex gap-4 sm:gap-6 items-center m-0 p-0 list-none z-10">
        
      
      </ul>

      {/* Centro Absoluto: Logo */}
      {/* Usamos left-1/2 e -translate-x-1/2 para fixar o logo perfeitamente no meio da tela */}
      <Link 
        to="/" 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-white rounded z-10 group"
      >
        <img 
          src={logoImg} 
          alt="Logo Pokédex" 
          className="h-14 sm:h-18 w-auto object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
        />
       
      </Link>

      {/* Container da Barra de Pesquisa (Direita) */}
      <div className="relative w-48 sm:w-72 z-10">
        <label htmlFor="pokemon-search" className="sr-only">Search Pokémon</label>
        <input
          id="pokemon-search"
          type="search"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          autoComplete="off"
          className="w-full px-4 py-2 bg-white text-slate-800 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-slate-400 shadow-inner"
        />

        {/* Menu Dropdown de Resultados */}
        {isOpen && (
          <ul className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden list-none p-0 m-0 z-50">
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon) => (
                <li key={pokemon.name} className="border-b border-slate-100 last:border-none">
                  <Link
                    to={`/pokemon/${pokemon.name}`}
                    onClick={closeSearch}
                    className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-600 capitalize transition-colors focus:bg-red-50 focus:outline-none"
                  >
                    <img 
                      src={pokemon.imageUrl} 
                      alt="" 
                      className="w-10 h-10 object-contain" 
                      loading="lazy" 
                    />
                    <span className="font-medium">{pokemon.name}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-slate-500 text-sm text-center">
                Nenhum Pokémon encontrado.
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}