import React,{useState ,useEffect} from "react";
import PostCard from "./PostCard/PostCard.jsx";
import axios from 'axios'
import {LANGUAGES} from '../../../../constants/Languages.js'
import { Loader2 } from 'lucide-react';

const Post = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const formatProfData = (profData) => {
      const language = LANGUAGES.find(lang => lang.name === profData.langue.nom_langue);
      
      return {
        id: profData.id_prof,
        langue: profData.langue.nom_langue,
        nom: `${profData.nom_prof} ${profData.prenom_prof}`,
        telephone: profData.num_phone,
        icon: language?.icon,
        mail: profData.mail_prof
      };
    };
  
    useEffect(() => {
      const fetchProfessors = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get('http://localhost:3000/all/profs');
          const formattedPosts = response.data.map(formatProfData);
          setPosts(formattedPosts);
        } catch (err) {
          setError('Impossible de charger la liste des professeurs. Veuillez réessayer plus tard.');
          console.error('Erreur lors du chargement des professeurs:', err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProfessors();
    }, []);
  
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
            <p className="mt-4 text-gray-600">Chargement des professeurs...</p>
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-red-50 text-red-600 p-6 rounded-xl max-w-md mx-auto text-center">
            <div className="text-lg font-medium mb-2">Erreur</div>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      );
    }
  
    if (posts.length === 0) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-gray-600">
            <p className="text-lg">Aucun professeur disponible pour le moment.</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    );
  };

export default Post;