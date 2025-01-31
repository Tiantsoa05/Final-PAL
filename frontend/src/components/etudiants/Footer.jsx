/* eslint-disable react/no-unescaped-entities */
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              {/* Logo Infinity stylisé */}
              <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                ∞ Infinity
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Transformez votre avenir avec une éducation de qualité. Rejoignez notre communauté d'apprenants passionnés.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail size={18} className="mr-2" />
                <span>contact@infinity.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone size={18} className="mr-2" />
                <span>+261 34 00 000 00</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin size={18} className="mr-2" />
                <span>Fianaratsoa, Madagascar</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Accueil</Link></li>
              <li><Link to="/cours" className="hover:text-teal-400 transition-colors">Nos cours</Link></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-teal-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Recevez nos dernières actualités et offres spéciales.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-full w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <button className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-6 py-2 rounded-r-full hover:opacity-90 transition-opacity">
                OK
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Infinity. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-teal-400 transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Conditions d'utilisation</a>
              <a href="#" className="hover:text-teal-400 transition-colors">Mentions légales</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};