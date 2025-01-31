/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { PlusCircle, MinusCircle, X } from 'lucide-react';

const ExerciceForm = ({ exercices = [], onChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [nombreExercices, setNombreExercices] = useState(1);
  const [tempExercices, setTempExercices] = useState([{
    question: '',
    reponse: '',
    niveau: 'debutant',
    points: 10
  }]);

  const niveaux = ['debutant', 'intermediaire', 'avance'];

  const handleNombreExercicesChange = (e) => {
    const nombre = parseInt(e.target.value) || 1;
    setNombreExercices(nombre);
    
    // Ajuster le nombre d'exercices temporaires
    const newExercices = [...tempExercices];
    if (nombre > tempExercices.length) {
      // Ajouter des exercices
      for (let i = tempExercices.length; i < nombre; i++) {
        newExercices.push({
          question: '',
          reponse: '',
          niveau: 'debutant',
          points: 10
        });
      }
    } else {
      // Réduire le nombre d'exercices
      newExercices.splice(nombre);
    }
    setTempExercices(newExercices);
  };

  const handleExerciceChange = (index, field, value) => {
    const newExercices = [...tempExercices];
    newExercices[index] = {
      ...newExercices[index],
      [field]: field === 'points' ? Number(value) : value
    };
    setTempExercices(newExercices);
  };

  const handleSubmit = () => {
    const validExercices = tempExercices.filter(ex => ex.question && ex.reponse);
    if (validExercices.length > 0) {
      const newExercices = validExercices.map(ex => ({
        ...ex,
        id: Date.now() + Math.random() // Générer un ID unique pour chaque exercice
      }));
      onChange([...exercices, ...newExercices]);
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNombreExercices(1);
    setTempExercices([{
      question: '',
      reponse: '',
      niveau: 'debutant',
      points: 10
    }]);
  };

  const handleRemoveExercice = (id) => {
    const updatedExercices = exercices.filter(ex => ex.id !== id);
    onChange(updatedExercices);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Exercices</h4>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          <PlusCircle size={20} />
          Ajouter des exercices
        </button>
      </div>

      {/* Liste des exercices existants */}
      <div className="grid gap-4">
        {exercices.map((ex) => (
          <div key={ex.id} className="bg-gray-50 p-4 rounded-lg relative">
            <button
              type="button"
              onClick={() => handleRemoveExercice(ex.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              <MinusCircle size={20} />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Question:</p>
                <p className="text-gray-900">{ex.question}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Réponse:</p>
                <p className="text-gray-900">{ex.reponse}</p>
              </div>
            </div>
            <div className="mt-2 flex gap-4">
              <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Niveau: {ex.niveau}
              </span>
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Points: {ex.points}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pour ajouter plusieurs exercices */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Ajouter des exercices
                </h3>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre d'exercices à ajouter
                </label>
                <input
                  type="number"
                  value={nombreExercices}
                  onChange={handleNombreExercicesChange}
                  min="1"
                  max="10"
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-6">
                {tempExercices.map((exercice, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-4">Exercice {index + 1}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question
                        </label>
                        <input
                          type="text"
                          value={exercice.question}
                          onChange={(e) => handleExerciceChange(index, 'question', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Réponse
                        </label>
                        <input
                          type="text"
                          value={exercice.reponse}
                          onChange={(e) => handleExerciceChange(index, 'reponse', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Niveau
                        </label>
                        <select
                          value={exercice.niveau}
                          onChange={(e) => handleExerciceChange(index, 'niveau', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {niveaux.map((niveau) => (
                            <option key={niveau} value={niveau}>
                              {niveau.charAt(0).toUpperCase() + niveau.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Points
                        </label>
                        <input
                          type="number"
                          value={exercice.points}
                          onChange={(e) => handleExerciceChange(index, 'points', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Ajouter les exercices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciceForm;