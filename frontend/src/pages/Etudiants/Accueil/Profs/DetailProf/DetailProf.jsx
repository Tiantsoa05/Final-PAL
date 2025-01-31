import React from "react";
import "./DetailProf.css"
import { Link } from "react-router-dom";
import professor from '../../../../../assets/professor.png'

const DetailProf = ({prof , onClose})=>{
    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="detail-prof-modal p-8 shadow-lg rounded-lg bg-white pb-10 w-11/12 max-w-lg relative">
          {/* Bouton de fermeture */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
          >
            &times;
          </button>
  
          {/* Image du professeur */}
          <div className="image-prof-detail flex justify-center mb-6">
            <img
              src={professor}
              alt="image"
              className="detail-image rounded-full w-32 h-32 object-cover border-4 border-blue-500 shadow-md"
            />
          </div>
  
          {/* Informations sur le professeur */}
          <div className="names text-center mb-6">
            <h5 className="text-xl font-bold text-gray-800">
              {prof.nom_prof} {prof.prenom_prof}
            </h5>
            <p className="text-gray-700 text-lg">Professeur de {prof.langue.nom_langue}</p>
            <p className="text-sm text-gray-500 mt-2">
              Diplôme : <span className="font-medium">{prof.Diplome}</span>
            </p>
            <p className="text-sm text-gray-500">
              Niveau de langue : <span className="font-medium">{prof.Niveau_Etude}</span>
            </p>
          </div>
  
          {/* Boutons */}
          <div className="buttons flex justify-center gap-6">
            <Link to={"/follow"}>
              <button className="px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-full hover:bg-blue-600 hover:shadow-md transition-all duration-300">
                Suivre le prof
              </button>
            </Link>
            <button
              className="px-6 py-3 bg-red-500 text-white text-sm font-medium rounded-full hover:bg-red-600 hover:shadow-md transition-all duration-300"
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    )
}

export default DetailProf