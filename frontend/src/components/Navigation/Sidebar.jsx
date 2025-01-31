/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import de useNavigate
import {  BarChart2 } from 'lucide-react';
import sections from './Constants';

export function Sidebar({ onSectionChange }) {
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

 

  const handleSectionChange = (key) => {
    setActiveSection(key);
    onSectionChange(key);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-4 shadow-xl">
      {/* Logo avec navigation */}
      <div 
        onClick={() => navigate('/')} // Redirection vers la page d'accueil
        className="text-3xl font-bold mb-10 text-center text-white flex items-center justify-center gap-2 cursor-pointer"
      >
        <BarChart2 className="text-blue-300" size={36} />
        Infinity
      </div>
      <nav>
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => handleSectionChange(section.key)}
            className={`
              flex items-center w-full p-3 mb-2 rounded-lg 
              transition-all duration-200 ease-in-out
              ${activeSection === section.key 
                ? 'bg-blue-700 shadow-md scale-105' 
                : 'hover:bg-blue-800 hover:translate-x-2 hover:shadow-sm'}
            `}
          >
            <section.icon 
              className={`mr-3 transition-colors duration-200 
                ${activeSection === section.key ? 'text-white' : 'text-blue-300'}`} 
              size={20} 
            />
            <span className={`
              transition-colors duration-200
              ${activeSection === section.key ? 'font-bold' : 'font-normal'}
            `}>
              {section.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
