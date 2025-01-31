/* eslint-disable react/prop-types */
import { Search } from 'lucide-react';

export const SearchFilters = ({ filter, setFilter }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un cours par nom ou description..."
            value={filter.search}
            onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
          />
        </div>
        
        <div className="flex gap-3">
          <select
            onChange={(e) => setFilter({ ...filter, niveau: e.target.value })}
            className="pl-4 pr-10 py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Tous les niveaux</option>
            <option value="debutant">Débutant</option>
            <option value="intermediaire">Intermédiaire</option>
            <option value="avance">Avancé</option>
          </select>
          
          <select
            onChange={(e) => setFilter({ ...filter, langue: e.target.value })}
            className="pl-4 pr-10 py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Toutes les langues</option>
            <option value="francais">Français</option>
            <option value="anglais">Anglais</option>
          </select>
        </div>
      </div>
    </div>
  );
};