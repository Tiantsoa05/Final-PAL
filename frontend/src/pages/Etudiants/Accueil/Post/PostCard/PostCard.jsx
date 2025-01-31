import React from "react";
import professor from '../../../../../assets/professor.png'
import {Mail, Phone} from 'lucide-react'
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {

  const followedProf = localStorage.getItem("prof")

  return (
    <div className="post-card p-6 shadow-lg rounded-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
  {/* Profil de l'auteur */}
  <div className="post-profile flex items-center gap-4 mb-6">
    <img
      src={professor}
      alt={post.nom}
      className="post-avatar w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md"
    />
    <div className="post-details ml-8">
      <h5 className="text-xl font-bold text-gray-800">{post.nom}</h5>
      <p className="text-sm text-gray-500">Langue enseignée : <span className="font-medium">{post.langue + " " + post.icon}</span></p>
      <p className="text-sm text-gray-500 flex gap-2"><Phone/> <span className="font-medium">{post.telephone}</span></p>
      <p className="text-sm text-gray-600 flex gap-2">
        <Mail size={18}/>
        <span className="font-medium">{post.mail}</span></p>
    </div>
  </div>

  {/* Boutons */}
  <div className="post-buttons flex justify-between gap-4">
  <Link 
    to={
      (!isNaN(followedProf) && parseInt(followedProf) === post.id) ? 
      null : 
      "/follow"
    }
    className={`w-full py-3 text-center cursor-pointer ${(!isNaN(followedProf) && parseInt(followedProf) === post.id)?"text-white bg-gray-600":"bg-blue-500  text-white hover:bg-blue-600"}  rounded-full  hover:shadow-md transition-all duration-300`}
    onClick={()=>localStorage.setItem('idFollow',post.id)}
  >
    <button>
      { (!isNaN(followedProf) && parseInt(followedProf) === post.id)?"Déjà suivi":"Suivre ce prof"}
    </button>
  </Link>
  </div>
</div>

  );
};

export default PostCard;