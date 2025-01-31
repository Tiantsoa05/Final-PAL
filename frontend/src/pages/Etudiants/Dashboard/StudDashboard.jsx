import React, { useEffect, useState } from "react";
import Profile from "./profile/Profile.jsx";
import { LANGUAGES } from "../../../constants/Languages.js";
import StatCourses from "./stat-courses/StatCourses.jsx";
import Progress from "./progress/Progress.jsx";
import Courses from "./courses/Courses.jsx";
import Exercices from "./exercices/Exercices.jsx";
import Practice from "./practice/Practice.jsx";
import Agenda from "./Agenda/Agenda.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";
import "./etudiant.css";
import axios from "axios";
import { Link } from "react-router-dom";

const StudDashboard = () => {
    const [numberCourses, setNumberCourses] = useState(0);
    const [langue, setLangue] = useState({});
    const { userName, idLangue } = localStorage;

    const [badgeObtained, setBadgeObtained] = useState(false);

    useEffect(() => {
        // Vérification du badge dans localStorage
        const badgeStatus = localStorage.getItem("badgeObtained");
        if (badgeStatus === "true") {
            setBadgeObtained(true);
        }

        axios.get('http://localhost:3000/courses/number/1')
            .then(res => {
                setNumberCourses(res.data.numberCourses);
            });
        
        axios.get('http://localhost:3000/all/lang')
            .then(res => {
                LANGUAGES.map(l => {
                    res.data.map(langue => {
                        if (langue.nom_langue.toLowerCase() === l.name.toLowerCase()) {
                            setLangue(l);
                        }
                    });
                });
            });
    }, []);

    return (
        <div className="flex">
            <div className="flex-1 p-6 pr-72">
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex justify-between">
                        <Profile userName={userName} Langue={langue} />
                        {badgeObtained && (
                          <div className="badge-container flex justify-center items-center mt-6 p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-xl">
                              <img
                                  src="https://img.freepik.com/vecteurs-libre/trophee_78370-345.jpg?semt=ais_hybrid"
                                  alt="Badge Trophy"
                                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                              />
                              <div className="ml-6 text-center text-white">
                                  <h3 className="text-2xl font-bold mb-2">{userName}</h3>
                                  <p className="text-sm">Badge de réussite d'évaluation</p>
                              </div>
                          </div>
                        )}
                        
                        <StatCourses numberCourses={numberCourses} />
                        
                    </div>
                    <div className="mt-6">
                        <Agenda />
                    </div>

                    {/* Affichage du badge si obtenu */}
                    
                </div>
            </div>
            <Sidebar />
        </div>
    );
};

export default StudDashboard;
