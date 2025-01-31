/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Navbar from '../Navigation/Navbar';

export function LeconsSectionEtudiants() {
  const { coursId } = useParams();
  const [lecons, setLecons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLecons();
  }, [coursId]);

  const fetchLecons = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cours/${coursId}/lecons`);
      setLecons(response.data.data);
    } catch (error) {
      console.error('Erreur lors du chargement des leçons:', error);
    }
  };

  const filteredLecons = lecons.filter(lecon =>
    lecon.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lecon.contenu?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Leçons du cours</h2>
            </div>

            {/* Barre de recherche */}
            <div className="mt-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une leçon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid gap-6">
            {filteredLecons.map((lecon) => (
              <div key={lecon.id_lecon} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">{lecon.titre}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed">{lecon.contenu}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    Durée: {lecon.duree} minutes
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}