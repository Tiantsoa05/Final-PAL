import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md py-3">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center cursor-pointer"
          onClick={()=>navigate('/')}
        >
          <img 
            src="/src/assets/logo.png" 
            alt="Logo" 
            className="h-10 w-auto" 
          />
          <span className="ml-2 text-xl font-bold text-blue-600"></span>
        </div>

        {/* Bouton vers /langue */}
        {/* <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Commencer
        </button> */}
      </div>
    </nav>
  );
}

export default Navbar;
