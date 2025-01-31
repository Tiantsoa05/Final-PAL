/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, Edit2, Trash2, X, FileText, Video, Music, BookOpen, ExternalLink, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';

const ResourcesSection = () => {
  const { leconId } = useParams();
  const [resources, setResources] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewResource, setPreviewResource] = useState(null);
  const [currentResource, setCurrentResource] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [expandedTypes, setExpandedTypes] = useState({
    manuel: true,
    video: true,
    audio: true,
    quiz: true
  });
  const [formData, setFormData] = useState({
    type: 'manuel',
    contenu: '',
    duree: 0,
    file: null
  });

  useEffect(() => {
    fetchResources();
  }, [leconId]);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/lecons/${leconId}/resources`);
      setResources(response.data);
    } catch (error) {
      setAlert({ type: 'error', message: 'Erreur lors du chargement des ressources' });
    }
  };

  const groupResourcesByType = () => {
    return resources.reduce((acc, resource) => {
      if (!acc[resource.type]) {
        acc[resource.type] = [];
      }
      acc[resource.type].push(resource);
      return acc;
    }, {});
  };

  const resourceTypes = {
    manuel: { icon: BookOpen, color: 'blue', label: 'Manuels' },
    video: { icon: Video, color: 'red', label: 'Vidéos' },
    audio: { icon: Music, color: 'green', label: 'Audio' },
    quiz: { icon: FileText, color: 'purple', label: 'Quiz' }
  };

  const toggleTypeExpansion = (type) => {
    setExpandedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('type', formData.type);
    formDataToSend.append('contenu', formData.contenu);
    formDataToSend.append('duree', formData.duree);
    if (formData.file) {
      formDataToSend.append('file', formData.file);
    }

    try {
      if (currentResource) {
        await axios.put(
          `http://localhost:3000/resources/${currentResource.id_ressource}`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setAlert({ type: 'success', message: 'Ressource mise à jour avec succès' });
      } else {
        await axios.post(
          `http://localhost:3000/lecons/${leconId}/resources`,
          formDataToSend,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setAlert({ type: 'success', message: 'Ressource créée avec succès' });
      }
      fetchResources();
      setShowModal(false);
      resetForm();
    } catch (error) {
      setAlert({ type: 'error', message: 'Une erreur est survenue' });
    }
  };

  const handlePreview = (resource) => {
    setPreviewResource(resource);
    setShowPreviewModal(true);
  };

  const ResourcePreview = ({ resource }) => {
    if (!resource.fichier_url) return null;

    const fileUrl = `http://localhost:3000${resource.fichier_url}`;

    switch (resource.type) {
      case 'video':
        return (
          <video controls className="w-full max-h-96">
            <source src={fileUrl} type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        );
      case 'audio':
        return (
          <audio controls className="w-full mt-4">
            <source src={fileUrl} type="audio/mpeg" />
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        );
      case 'manuel':
        if (fileUrl.endsWith('.pdf')) {
          return (
            <iframe
              src={fileUrl}
              className="w-full h-96"
              title="PDF Viewer"
            />
          );
        }
        // Pour les autres types de fichiers manuels
        return (
          <div className="text-center">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700"
            >
              <Download size={20} />
              Télécharger le document
            </a>
          </div>
        );
      case 'quiz':
        return (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div dangerouslySetInnerHTML={{ __html: resource.contenu }} />
          </div>
        );
      default:
        return null;
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      try {
        await axios.delete(`http://localhost:3000/resources/${id}`);
        fetchResources();
        setAlert({ type: 'success', message: 'Ressource supprimée avec succès' });
      } catch (error) {
        setAlert({ type: 'error', message: 'Erreur lors de la suppression' });
      }
    }
  };

  const resetForm = () => {
    setCurrentResource(null);
    setFormData({
      type: 'manuel',
      contenu: '',
      duree: 0,
      file: null
    });
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'manuel':
        return <BookOpen className="text-blue-500" />;
      case 'video':
        return <Video className="text-red-500" />;
      case 'audio':
        return <Music className="text-green-500" />;
      case 'quiz':
        return <FileText className="text-purple-500" />;
      default:
        return <FileText className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ressources pédagogiques</h1>
              <p className="text-gray-600 mt-2">Gérez les ressources de votre leçon</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              <PlusCircle size={20} />
              Ajouter une ressource
            </button>
          </div>

          {alert.message && (
            <div className={`mt-4 p-4 rounded-lg flex justify-between items-center ${
              alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {alert.message}
              <button onClick={() => setAlert({ type: '', message: '' })}>
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {Object.entries(groupResourcesByType()).map(([type, typeResources]) => (
            <div key={type} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => toggleTypeExpansion(type)}
                className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors
                  ${expandedTypes[type] ? 'border-b' : ''}`}
              >
                <div className="flex items-center gap-3">
                  {React.createElement(resourceTypes[type].icon, {
                    size: 24,
                    className: `text-${resourceTypes[type].color}-500`
                  })}
                  <h2 className="text-xl font-semibold text-gray-800">
                    {resourceTypes[type].label} ({typeResources.length})
                  </h2>
                </div>
                {expandedTypes[type] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {expandedTypes[type] && (
                <div className="p-4 divide-y divide-gray-100">
                  {typeResources.map((resource) => (
                    <div key={resource.id_ressource} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          {React.createElement(resourceTypes[resource.type].icon, {
                            size: 20,
                            className: `text-${resourceTypes[resource.type].color}-500 mt-1`
                          })}
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">{resource.contenu}</h3>
                            {resource.duree > 0 && (
                              <span className="text-sm text-gray-500 mt-1 block">
                                Durée: {resource.duree} minutes
                              </span>
                            )}
                            {resource.fichier_url && (
                              <button
                                onClick={() => handlePreview(resource)}
                                className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-600"
                              >
                                <ExternalLink size={16} />
                                Consulter la ressource
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setCurrentResource(resource);
                              setFormData({
                                type: resource.type,
                                contenu: resource.contenu,
                                duree: resource.duree,
                                file: null
                              });
                              setShowModal(true);
                            }}
                            className="text-blue-500 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-blue-50"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(resource.id_ressource)}
                            className="text-red-500 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {currentResource ? 'Modifier la ressource' : 'Ajouter une nouvelle ressource'}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type de ressource
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="manuel">Manuel</option>
                      <option value="quiz">Quiz</option>
                      <option value="video">Vidéo</option>
                      <option value="audio">Audio</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.contenu}
                      onChange={(e) => setFormData({ ...formData, contenu: e.target.value })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="4"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fichier
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Durée (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.duree}
                      onChange={(e) => setFormData({ ...formData, duree: Number(e.target.value) })}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t px-6 py-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  {currentResource ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de prévisualisation */}
      {showPreviewModal && previewResource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {previewResource.type.charAt(0).toUpperCase() + previewResource.type.slice(1)}
                </h3>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-4">
                <ResourcePreview resource={previewResource} />
              </div>

              <div className="mt-4">
                <p className="text-gray-600">{previewResource.contenu}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesSection;