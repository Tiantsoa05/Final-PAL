/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, BookOpen, Clock, Globe, DollarSign, X } from 'lucide-react';
import Navbar from '../Navigation/Navbar';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [userInscriptions, setUserInscriptions] = useState([]);
  const [filter, setFilter] = useState({
    niveau: '',
    langue: ''
  });

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cours', {
          params: {
            niveau_difficulte: filter.niveau,
            langue: filter.langue
          }
        });
        setCourses(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des cours:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserInscriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/inscriptions/utilisateur/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInscriptions(response.data.map(inscription => inscription.id_cours));
      } catch (error) {
        console.error('Erreur lors de la récupération des inscriptions:', error);
      }
    };

    fetchCourses();
    if (userId && token) {
      fetchUserInscriptions();
    }
  }, [filter, userId, token]);

  const handleInscription = async () => {
    if (!selectedCourse || !userId || !token) return;
  
    try {
      const response = await axios.post(
        'http://localhost:3000/inscriptions', 
        {
          id_utilisateur: parseInt(userId), 
          id_cours: selectedCourse.id_cours
        },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.data && response.data.data) {
        // Mettre à jour la liste des inscriptions
        setUserInscriptions([...userInscriptions, selectedCourse.id_cours]);
        
        // Fermer le modal et réinitialiser le cours sélectionné
        setShowModal(false);
        setSelectedCourse(null);
  
        // Optionnel : afficher un message de succès
        alert('Inscription réussie !');
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      
      // Afficher le message d'erreur du serveur si disponible
      const errorMessage = error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription';
      alert(errorMessage);
    }
  };

  const getDifficultyColor = (niveau) => {
    switch (niveau) {
      case 'debutant': return 'bg-green-100 text-green-800';
      case 'intermediaire': return 'bg-yellow-100 text-yellow-800';
      case 'avance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const Modal = ({ isOpen, onClose, course }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Inscription au cours</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">{course.nom}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-500">
                <Globe className="w-4 h-4 mr-2" />
                <span>{course.langue}</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="w-4 h-4 mr-2" />
                <span>{course.duree} minutes</span>
              </div>
              <div className="flex items-center text-gray-500">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>{course.prix} Ar</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleInscription}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Confirmer l'inscription
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Découvrez nos cours</h1>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un cours..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              onChange={(e) => setFilter({ ...filter, niveau: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Niveau</option>
              <option value="debutant">Débutant</option>
              <option value="intermediaire">Intermédiaire</option>
              <option value="avance">Avancé</option>
            </select>
            
            <select
              onChange={(e) => setFilter({ ...filter, langue: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Langue</option>
              <option value="francais">Français</option>
              <option value="anglais">Anglais</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id_cours} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{course.nom}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.niveau_difficulte)}`}>
                      {course.niveau_difficulte}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>{course.langue}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{course.duree} minutes</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span>{course.prix} Ar</span>
                    </div>
                  </div>
                  
                  {course.prix > 0 && !userInscriptions.includes(course.id_cours) ? (
                    <button 
                      onClick={() => {
                        setSelectedCourse(course);
                        setShowModal(true);
                      }}
                      className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      S'inscrire au cours
                    </button>
                  ) : (
                    <button 
                      className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Accéder au cours
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <Modal 
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
        />
      </main>
    </div>
  );
};

export default CourseList;