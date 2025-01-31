import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Header } from '../../pages/Etudiants/Accueil/Header/Header';
import CONJUGAISON from '../../data/Conjugaison';

const Conjugaison = () => {
  const [conjugaison, setConjugaison] = useState([...CONJUGAISON]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const handleSearch = () => {
    if (search.trim() !== '') {
      let found = CONJUGAISON.find(word => word.verbe.toLowerCase() === search.toLowerCase());
      setConjugaison(found ? [found] : []);
    }
  };

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-900">
      <Header />
      
      {/* Title Section */}
      <div className="text-center mt-16">
        <div className="flex justify-center items-center gap-2 text-4xl font-bold text-gray-800">
          <BookOpen size={40} className="text-blue-600" />
          <span>Conjugaison</span>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-12">
        <div className="relative flex items-center bg-white shadow-md rounded-full overflow-hidden">
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Entrez un verbe..."
            className="w-full px-6 py-3 text-lg bg-transparent focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center transition-colors duration-300"
          >
            <Search size={20} className="mr-2" />
            <span>Rechercher</span>
          </button>
        </div>
      </div>

      {/* Results Section */}
      {conjugaison.length > 0 ? (
        conjugaison.map((conj) => (
          <div key={conj.id} className="max-w-4xl mx-auto px-6 pb-16">
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
              {capitalize(conj.verbe)}
            </h2>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {conj.conjugaisons.map((temps, idx) => (
                <button
                  key={temps.temps}
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md 
                    ${activeTab === idx 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-700 hover:bg-gray-200'}`}
                >
                  {temps.temps}
                </button>
              ))}
            </div>

            {/* Conjugaison Table */}
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto animate-fade-in">
              <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
                {conj.conjugaisons[activeTab].temps}
              </h3>
              <ul className="space-y-3">
                {conj.conjugaisons[activeTab].conjugaison.map((forme, idx) => (
                  <li 
                    key={idx}
                    className="p-3 bg-gray-100 rounded-lg text-lg text-gray-800 hover:bg-gray-200 transition duration-200 cursor-pointer"
                  >
                    {capitalize(forme)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-800 text-lg mt-10">Aucun verbe trouvé.</p>
      )}
    </div>
  );
};

export default Conjugaison;
