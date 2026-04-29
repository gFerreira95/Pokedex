import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export function MainLayout() {
  return (
    <div className="min-h-screen text-slate-900 font-sans">
      <a 
        href="#conteudo-principal" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-blue-600"
      >
        Pular para o conteúdo principal
      </a>

      <header>
        <Navbar />
      </header>

      <main id="conteudo-principal" tabIndex="-1" className="p-8 outline-none">
        <Outlet />
      </main>
    </div>
  );
}