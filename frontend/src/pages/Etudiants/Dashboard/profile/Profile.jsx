import React from "react";
import profil from '../../../../assets/prof.png';

const Profile = ({userName, Langue}) => {
  console.log(Langue)
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center space-x-4 w-96">
      <img src={profil} alt="Profile" className="w-20 h-20 rounded-full border-4 border-gray-200" />
      <div>
        <p className="text-lg font-semibold text-gray-700">{userName}</p>
        <p className="text-sm text-gray-500">Langue : <span className="font-medium text-blue-500">{Langue.name}</span></p>
        <p className="text-sm font-medium text-green-600">Niveau avancé</p>
      </div>
    </div>
  );
};

export default Profile;
