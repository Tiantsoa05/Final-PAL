import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
          ∞ Infinity
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
        <Link to="/" className="hover:text-teal-400 transition-colors">Accueil</Link>
          <Link to="/cours" className="hover:text-teal-400 transition-colors">Nos cours</Link>
          <a href="/examen" className="hover:text-teal-400 transition-colors">Examen</a>
          <a href="#" className="hover:text-teal-400 transition-colors">FAQ</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-900 text-white shadow-lg md:hidden">
            <nav className="flex flex-col items-center space-y-4 py-4">
              <Link to="/" className="hover:text-teal-400 transition-colors">Accueil</Link>
              <Link to="/cours" className="hover:text-teal-400 transition-colors">Nos cours</Link>
              <a href="#" className="hover:text-teal-400 transition-colors">Blog</a>
              <a href="#" className="hover:text-teal-400 transition-colors">FAQ</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};