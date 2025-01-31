import React from "react";
import {  Home, BookOpen, LogOut, BookCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BiLogoMessenger } from "react-icons/bi";
import { useState } from "react";

const Sidebar = () => {
    const navigate = useNavigate()
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const closeLogoutModal = () => {
        setIsLogoutModalOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear()
        setIsLogoutModalOpen(false);
        navigate("/");
    };
  return (
    <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg p-5 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-700">Menu</h2>
      <ul className="flex flex-col gap-4">
        <li 
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
            onClick={()=>navigate('/home')}
        >
          <Home size={20} />
          <span>Accueil</span>
        </li>
        <li 
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
            onClick={()=>navigate('/courses')}
        >
          <BookOpen size={20} />
          <span>Cours</span>
        </li>
        <li 
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
            onClick={()=>navigate('/messenger')}
        >
          <BiLogoMessenger size={20} />
          <span>Messages</span>
        </li>
        <li 
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
            onClick={()=>navigate('/evaluation')}
        >
          <BookCheck size={20} />
          <span>Evaluation</span>
        </li>
        <li 
            className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-100 rounded-lg"
            onClick={()=>setIsLogoutModalOpen(true)}
        >
          <LogOut size={20} />
          <span>Se déconnecter</span>
        </li>
      </ul>
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold text-gray-800">Confirmer la déconnexion</h2>
            <p className="text-gray-600 mt-2">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeLogoutModal}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
