/* eslint-disable react/no-unescaped-entities */
import { 
    Facebook, 
    Twitter, 
    Linkedin, 
    Instagram, 
    Mail, 
    Phone 
  } from 'lucide-react';
  
  function LandingPageFooter() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Colonne Entreprise */}
            <div>
              <h4 className="text-xl font-bold mb-4 text-blue-500">Infinity</h4>
              <p className="text-gray-300 mb-4">
                Votre partenaire pour l'apprentissage des langues, de manière simple et efficace.
              </p>
            </div>
  
            {/* Colonne Liens Rapides */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                {['Accueil', 'Fonctionnalités', 'Tarifs', 'Témoignages'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-300 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Colonne Légal */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                {['CGU', 'Confidentialité', 'Cookies', 'Mentions légales'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Colonne Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="mr-2 text-blue-500" size={20} />
                  <span>support@infinity.mg</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 text-blue-500" size={20} />
                  <span>+251 34 31 720 81</span>
                </div>
              </div>
              
              {/* Réseaux Sociaux */}
              <div className="flex space-x-4 mt-4">
                {[Facebook, Twitter, Linkedin, Instagram].map((Social, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="text-gray-300 hover:text-white"
                  >
                    <Social size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">
              © {currentYear} Infinity. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    );
  }
  
  export default LandingPageFooter;