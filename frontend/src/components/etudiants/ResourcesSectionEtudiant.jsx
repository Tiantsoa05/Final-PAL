/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  FileText, 
  Video, 
  Music, 
  BookOpen, 
  ExternalLink, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Search,
  X
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import Navbar from '../Navigation/Navbar';

const ResourcesSectionEtudiant = () => {
  const { leconId } = useParams();
  const [resources, setResources] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewResource, setPreviewResource] = useState(null);
  const [expandedTypes, setExpandedTypes] = useState({
    manuel: true,
    video: true,
    audio: true,
    quiz: true
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchResources();
  }, [leconId]);

  const fetchResources = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/lecons/${leconId}/resources`);
      setResources(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des ressources:', error);
    }
  };

  const groupResourcesByType = () => {
    return resources
      .filter(resource => 
        resource.contenu.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .reduce((acc, resource) => {
        if (!acc[resource.type]) {
          acc[resource.type] = [];
        }
        acc[resource.type].push(resource);
        return acc;
      }, {});
  };

  const resourceTypes = {
    manuel: { icon: BookOpen, color: 'blue', label: 'Manuels', bgColor: 'bg-blue-50' },
    video: { icon: Video, color: 'red', label: 'Vidéos', bgColor: 'bg-red-50' },
    audio: { icon: Music, color: 'green', label: 'Audio', bgColor: 'bg-green-50' },
    quiz: { icon: FileText, color: 'purple', label: 'Quiz', bgColor: 'bg-purple-50' }
  };

  const toggleTypeExpansion = (type) => {
    setExpandedTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
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
          <video controls className="w-full max-h-96 rounded-lg">
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
              className="w-full h-96 rounded-lg"
              title="PDF Viewer"
            />
          );
        }
        return (
          <div className="text-center">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <Download size={20} />
              Télécharger le document
            </a>
          </div>
        );
      case 'quiz':
        return (
          <div className="bg-gray-50 p-6 rounded-xl">
            <div dangerouslySetInnerHTML={{ __html: resource.contenu }} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8 pt-20">
        <div className="bg-white backdrop-blur-sm bg-white/80 shadow-lg rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ressources pédagogiques
              </h1>
              <p className="text-gray-600 mt-2">Enrichissez votre apprentissage avec nos ressources</p>
            </div>
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une ressource..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(groupResourcesByType()).map(([type, typeResources]) => (
            <div 
              key={type} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => toggleTypeExpansion(type)}
                className={`w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors
                  ${expandedTypes[type] ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${resourceTypes[type].bgColor}`}>
                    {React.createElement(resourceTypes[type].icon, {
                      size: 24,
                      className: `text-${resourceTypes[type].color}-500`
                    })}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {resourceTypes[type].label} ({typeResources.length})
                  </h2>
                </div>
                {expandedTypes[type] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              {expandedTypes[type] && (
                <div className="p-4 divide-y divide-gray-100">
                  {typeResources.map((resource) => (
                    <div 
                      key={resource.id_ressource} 
                      className="py-4 first:pt-0 last:pb-0 hover:bg-gray-50 p-4 rounded-lg transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${resourceTypes[resource.type].bgColor} mt-1`}>
                            {React.createElement(resourceTypes[resource.type].icon, {
                              size: 20,
                              className: `text-${resourceTypes[resource.type].color}-500`
                            })}
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">{resource.contenu}</h3>
                            {resource.duree > 0 && (
                              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm mt-2">
                                {resource.duree} minutes
                              </span>
                            )}
                            {resource.fichier_url && (
                              <button
                                onClick={() => handlePreview(resource)}
                                className="mt-3 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm"
                              >
                                <ExternalLink size={16} />
                                Consulter la ressource
                              </button>
                            )}
                          </div>
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

      {/* Modal de prévisualisation modernisé */}
      {showPreviewModal && previewResource && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${resourceTypes[previewResource.type].bgColor}`}>
                    {React.createElement(resourceTypes[previewResource.type].icon, {
                      size: 24,
                      className: `text-${resourceTypes[previewResource.type].color}-500`
                    })}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {previewResource.contenu}
                  </h3>
                </div>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-gray-500" />
                </button>
              </div>

              <div className="mt-4">
                <ResourcePreview resource={previewResource} />
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-gray-600">{previewResource.contenu}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesSectionEtudiant;