/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import axios from 'axios';
import PasserExamen from "../examens/PasserExam";
import Navbar from './Navbar';

const ExamEtudiant = () => {
  const [selectedCours, setSelectedCours] = useState(null);
  const [cours, setCours] = useState([]);
  const [badges, setBadges] = useState({});
  const [mode, setMode] = useState('liste');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coursResponse, badgesResponse] = await Promise.all([
          axios.get('http://localhost:3000/cours'),
          axios.get(`http://localhost:3000/examens/utilisateur/${localStorage.getItem('userId')}/badges`)
        ]);

        setCours(coursResponse.data.data);
        
        const badgesMap = {};
        badgesResponse.data.data.forEach(badge => {
          badgesMap[badge.id_cours] = badge;
        });
        setBadges(badgesMap);
      } catch (error) {
        console.error('Erreur de chargement des données', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCoursClick = (coursId) => {
    setSelectedCours(coursId);
    setMode('confirmation');
  };

  const handleExamenComplete = async () => {
    // Recharger les badges après avoir passé l'examen
    try {
      const badgesResponse = await axios.get(
        `http://localhost:3000/examens/utilisateur/${localStorage.getItem('userId')}/badges`
      );
      const badgesMap = {};
      badgesResponse.data.data.forEach(badge => {
        badgesMap[badge.id_cours] = badge;
      });
      setBadges(badgesMap);
    } catch (error) {
      console.error('Erreur lors du rechargement des badges', error);
    }
    setMode('liste');
  };

  const getDifficultyColor = (niveau) => {
    const colors = {
      1: 'bg-green-100 text-green-800',
      2: 'bg-blue-100 text-blue-800',
      3: 'bg-yellow-100 text-yellow-800',
      4: 'bg-orange-100 text-orange-800',
      5: 'bg-red-100 text-red-800'
    };
    return colors[niveau] || 'bg-gray-100 text-gray-800';
  };

  const BadgeDisplay = ({ badge }) => (
    <div className="absolute -top-3 -right-3 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border-2 border-yellow-400">
      <div className="relative group">
        <span className="text-2xl">{badge.icone}</span>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {badge.titre}
        </div>
      </div>
    </div>
  );

  const renderCoursList = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v7" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900">Mes examens disponibles</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cours.map((c) => (
            <div 
              key={c.id_cours}
              className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer p-6"
              onClick={() => handleCoursClick(c.id_cours)}
            >
              {badges[c.id_cours] && <BadgeDisplay badge={badges[c.id_cours]} />}
              
              <div className="flex items-start space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{c.nom}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                      {c.langue}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(c.niveau_difficulte)}`}>
                      Niveau {c.niveau_difficulte}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderConfirmation = () => {
    const selectedCoursInfo = cours.find(c => c.id_cours === selectedCours);
    
    return (
      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-blue-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14v7" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900">
            Êtes-vous prêt à passer l'examen ?
          </h2>
          <div className="text-gray-600">
            <p className="text-lg font-medium mb-2">{selectedCoursInfo?.nom}</p>
            <p className="text-sm">
              Assurez-vous d'avoir bien révisé le contenu du cours avant de commencer.
            </p>
          </div>
          
          <div className="flex flex-col gap-4 mt-8">
            <button 
              onClick={() => setMode('passer')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Commencer l'examen
            </button>
            <button 
              onClick={() => setMode('liste')}
              className="flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Retour à la liste des cours</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {mode === 'liste' && renderCoursList()}
        {mode === 'confirmation' && renderConfirmation()}
        {mode === 'passer' && (
          <PasserExamen 
            coursId={selectedCours}
            onRetour={handleExamenComplete}
          />
        )}
      </div>
    </div>
  );
};

export default ExamEtudiant;