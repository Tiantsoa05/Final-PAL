/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { PlusCircle, Edit2, Trash2, X, BookOpen, AlignLeft, FileText, Clock, GraduationCap } from 'lucide-react';
import Navbar from '../Navigation/Navbar';
import ExerciceForm from './ExerciceForm';

export function LeconsSection() {
  const { coursId } = useParams();
  const navigate = useNavigate();
  const [lecons, setLecons] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentLecon, setCurrentLecon] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState({
    titre: '',
    contenu: '',
    exercices: [],
    duree: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLecons();
  }, [coursId]);

  const fetchLecons = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/cours/${coursId}/lecons`);
      setLecons(response.data.data);
    } catch (error) {
      showAlert('error', 'Erreur lors du chargement des leçons');
    }
  };

  const showAlert = (type, message, duration = 5000) => {
    setAlert({ type, message });
    setTimeout(() => setAlert({ type: '', message: '' }), duration);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (currentLecon) {
        await axios.put(`http://localhost:3000/lecons/${currentLecon.id_lecon}`, formData);
        showAlert('success', 'Leçon mise à jour avec succès');
      } else {
        await axios.post(`http://localhost:3000/cours/${coursId}/lecons`, formData);
        showAlert('success', 'Leçon créée avec succès');
      }
      fetchLecons();
      handleCloseModal();
    } catch (error) {
      showAlert('error', 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette leçon ?')) {
      try {
        await axios.delete(`http://localhost:3000/lecons/${id}`);
        fetchLecons();
        showAlert('success', 'Leçon supprimée avec succès');
      } catch (error) {
        showAlert('error', 'Erreur lors de la suppression');
      }
    }
  };

  const handleOpenModal = (lecon = null) => {
    if (lecon) {
      setCurrentLecon(lecon);
      setFormData({
        titre: lecon.titre,
        contenu: lecon.contenu,
        exercices: lecon.exercices || [],
        duree: lecon.duree
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setCurrentLecon(null);
    setFormData({
      titre: '',
      contenu: '',
      exercices: [],
      duree: 0
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section avec style amélioré */}
          <div className="bg-white shadow-sm rounded-lg p-8 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Leçons du cours</h2>
                <p className="mt-2 text-gray-600">Gérez le contenu et les exercices de vos leçons</p>
              </div>
              <button
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              >
                <PlusCircle size={20} />
                Ajouter une leçon
              </button>
            </div>

            {alert.message && (
              <div 
                className={`mt-6 p-4 rounded-lg flex justify-between items-center ${
                  alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                <span className="font-medium">{alert.message}</span>
                <button 
                  onClick={() => setAlert({ type: '', message: '' })}
                  className="hover:bg-opacity-20 p-1 rounded-full hover:bg-gray-900"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Liste des leçons avec style amélioré */}
          <div className="grid gap-6">
            {lecons.map((lecon) => (
              <div key={lecon.id_lecon} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-semibold text-gray-800">{lecon.titre}</h3>
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate(`/lecons/${lecon.id_lecon}/resources`)}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 px-4 py-2 rounded-lg border border-blue-500 hover:border-blue-700 transition-colors"
                      >
                        <BookOpen size={18} />
                        Ressources
                      </button>
                      <button
                        onClick={() => navigate(`/lecons/${lecon.id_lecon}/exercices`)}
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 px-4 py-2 rounded-lg border border-blue-500 hover:border-blue-700 transition-colors"
                      >
                        <GraduationCap size={18} />
                        Exercices
                      </button>
                      <button
                        onClick={() => handleOpenModal(lecon)}
                        className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(lecon.id_lecon)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{lecon.contenu}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
                      <Clock size={16} />
                      {lecon.duree} minutes
                    </span>
                    {lecon.exercices?.length > 0 && (
                      <span className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
                        <GraduationCap size={16} />
                        {lecon.exercices.length} exercices
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal avec disposition améliorée */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <form onSubmit={handleSubmit}>
              {/* En-tête du modal */}
              <div className="px-8 py-6 border-b bg-gray-50">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {currentLecon ? 'Modifier la leçon' : 'Ajouter une nouvelle leçon'}
                  </h3>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Corps du formulaire avec scroll */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid gap-8">
                  {/* Section des informations principales */}
                  <div className="space-y-6">
                    <div className="grid gap-6">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <FileText size={18} />
                          Titre de la leçon
                        </label>
                        <input
                          type="text"
                          value={formData.titre}
                          onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Entrez le titre de la leçon"
                          required
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <AlignLeft size={18} />
                          Contenu de la leçon
                        </label>
                        <textarea
                          value={formData.contenu}
                          onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          rows="6"
                          placeholder="Décrivez le contenu de votre leçon"
                          required
                        />
                      </div>

                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                          <Clock size={18} />
                          Durée estimée (en minutes)
                        </label>
                        <input
                          type="number"
                          value={formData.duree}
                          onChange={(e) => setFormData({ ...formData, duree: Number(e.target.value) })}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section des exercices */}
                  <div className="border-t pt-8">
                    <div className="flex items-center gap-2 text-lg font-medium text-gray-900 mb-6">
                      <GraduationCap size={24} />
                      Exercices
                    </div>
                    <ExerciceForm
                      exercices={formData.exercices}
                      onChange={(newExercices) => setFormData({ ...formData, exercices: newExercices })}
                    />
                  </div>
                </div>
              </div>

              {/* Pied du modal */}
              <div className="border-t px-8 py-6 bg-gray-50 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting 
                    ? 'Enregistrement...' 
                    : currentLecon 
                      ? 'Mettre à jour' 
                      : 'Créer la leçon'
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}