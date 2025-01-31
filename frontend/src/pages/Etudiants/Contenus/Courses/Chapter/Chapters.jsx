import React, { useEffect, useState } from "react";
import { Header } from "../../../Accueil/Header/Header.jsx";
import "./Chapters.css";
import { useNavigate, useParams } from "react-router-dom";
import { data } from "../../../../../data/courses.js";

const Chapters = () => {
    const { titre } = useParams();
    const [chapters, setChapters] = useState(data.find(course => course.titre === titre)?.chapters || []);
    const [currentChapter, setCurrentChapter] = useState(chapters[0]);
    const navigate = useNavigate();

    const nextChapter = () => {
        if (chapters.indexOf(currentChapter) < chapters.length - 1) {
            setCurrentChapter(chapters[chapters.indexOf(currentChapter) + 1]);
        }
    };

    const prevChapter = () => {
        if (chapters.indexOf(currentChapter) > 0) {
            setCurrentChapter(chapters[chapters.indexOf(currentChapter) - 1]);
        }
    };

    const showChapter = (title) => {
        setCurrentChapter(chapters.find(chapter => chapter.title === title));
    };

    const finishChapter = () => {
        navigate(`/courses`);
    };

    return (
        <>
            <Header />
            <div className="flex flex-col h-screen bg-blue-100 text-blue-900">
                <div className="flex flex-1 p-6 gap-6 overflow-hidden">
                    {/* Liste des chapitres */}
                    <div className="w-1/4 bg-white shadow-md rounded-lg flex flex-col">
                        <h3 className="text-lg font-semibold p-4 text-blue-700">Chapitres</h3>
                        <div className="flex-1 overflow-y-auto">
                            <ul className="space-y-2 p-4 pt-0">
                                {chapters.map(chapter => (
                                    <li
                                        key={chapter.title}
                                        onClick={() => showChapter(chapter.title)}
                                        className={`cursor-pointer p-2 rounded-lg hover:bg-blue-300 ${
                                            currentChapter?.title === chapter.title ? "bg-blue-400" : ""
                                        }`}
                                    >
                                        {chapter.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Contenu du chapitre */}
                    <div className="flex-1 bg-white shadow-md rounded-lg flex flex-col">
                        <div className="p-6 flex-1 overflow-y-auto">
                            <h4 className="text-xl font-semibold text-blue-700 mb-4">{currentChapter?.title}</h4>
                            <p className="mb-4 text-gray-700">{currentChapter?.content?.text}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                                {currentChapter?.content?.images?.map((image, index) => (
                                    <div key={index} className="relative aspect-video">
                                        <img 
                                            src={image} 
                                            alt={`Illustration ${index + 1}`} 
                                            className="rounded-lg shadow-md object-contain w-full h-full hover:scale-105 transition-transform cursor-pointer"
                                            onClick={() => window.open(image, '_blank')}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 pt-0 border-t flex justify-between">
                            {chapters.indexOf(currentChapter) > 0 && (
                                <button onClick={prevChapter} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                                    Précédent
                                </button>
                            )}
                            {chapters.indexOf(currentChapter) < chapters.length - 1 ? (
                                <button onClick={nextChapter} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                                    Suivant
                                </button>
                            ) : (
                                <button onClick={finishChapter} className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800">
                                    Terminer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chapters;
