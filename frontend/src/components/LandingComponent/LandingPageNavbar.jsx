import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPageNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // Nouvel état pour le modal
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear()
    setIsAuthenticated(false);
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  const handleConsulter = () => {
    navigate("/dashboard");
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div 
            className="flex items-center cursor-pointer"
            onClick={()=>navigate('/')}
          >
            <img src="/src/assets/logo.png" alt="Infinity" className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-blue-600"></span>
          </div>

          {/* Menu desktop */}
          <div className="hidden md:flex space-x-6 ml-auto">
            <a href="#features" className="text-gray-700 hover:text-blue-600">
              Fonctionnalités
            </a>
            <a href="#temoignages" className="text-gray-700 hover:text-blue-600">
              Avantages
            </a>
            {/* <a href="#prix" className="text-gray-700 hover:text-blue-600">
              Tarifs
            </a> */}
          </div>

          {/* Boutons d'action */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* <button
                  onClick={handleConsulter}
                  className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md"
                >
                  Consulter
                </button> */}
                <button
                  onClick={openLogoutModal}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md"
                >
                  Connexion
                </button>
                {/* <button
                  onClick={() => navigate("/langue")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Commencer
                </button> */}
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 pt-2 pb-4 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-blue-600">
                Fonctionnalités
              </a>
              <a href="#prix" className="block text-gray-700 hover:text-blue-600">
                Tarifs
              </a>
              <a href="#temoignages" className="block text-gray-700 hover:text-blue-600">
                Témoignages
              </a>
              <div className="space-y-2 pt-2 border-t">
                {isAuthenticated ? (
                  <>
                    {/* <button
                      onClick={handleConsulter}
                      className="w-full text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md"
                    >
                      Consulter
                    </button> */}
                    <button
                      onClick={openLogoutModal}
                      className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md"
                    >
                      Connexion
                    </button>
                    <button
                      onClick={() => navigate("/langue")}
                      className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Commencer
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Modal de confirmation */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-800">Confirmer la déconnexion</h2>
            <p className="text-gray-600 mt-2">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPageNavbar;
