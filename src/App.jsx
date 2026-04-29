import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/home';
import { Battle } from './pages/Battle';
import { Teams } from './pages/Teams';
// Adicione a importação no topo:
import { PokemonDetails } from './pages/pokemonDetails';



const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { 
        index: true, 
        element: <Home /> 
      },
      { 
        path: 'batalha', 
        element: <Battle /> 
      },
      { 
        path: 'equipes', 
        element: <Teams /> 
      },
      { path: 'pokemon/:identifier', element: <PokemonDetails /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;