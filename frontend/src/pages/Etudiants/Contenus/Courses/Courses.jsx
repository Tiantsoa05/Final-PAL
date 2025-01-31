/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaFileVideo, FaFileImage, FaSearch, FaFilter, FaGraduationCap, FaUsers } from "react-icons/fa";
import { Header } from "../../Accueil/Header/Header.jsx";
import image from '../../../../assets/img.png';
import axios from "axios";
import { data } from "../../../../data/courses.js";

const Courses = () => {
  const [courses] = useState(data);
  const [coursesProf, setCoursesProf] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("free"); // Ajout du state pour les onglets
  const navigate = useNavigate();
  const { prof } = localStorage;

  useEffect(() => {
    axios.get('http://localhost:3000/courses/all/' + prof).then(response => {
      setCoursesProf(response.data);
    });
  }, []);

  const filterCourses = () => {
    return courses.filter(course => {
      const matchesSearch = course.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLevel = selectedLevel === "all" || course.niveau === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  };

  const Banner = () => (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Développez vos compétences
            </h1>
            <p className="text-xl text-gray-100 mb-6">
              Accédez à des centaines de cours de qualité pour enrichir vos connaissances
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <FaUsers className="text-2xl" />
                <span>1000+ Étudiants</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGraduationCap className="text-2xl" />
                <span>50+ Cours</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-xl">
              <h3 className="text-gray-800 font-bold text-xl mb-4">Commencez aujourd'hui</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Rechercher un cours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Découvrir les cours
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      <Banner />
      
      <div className="max-w-7xl mx-auto px-4 py-12 overflow-hidden">
        {/* Navigation et Filtres */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab("free")}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeTab === "free"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Cours gratuits
              </button>
              <button
                onClick={() => setActiveTab("premium")}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeTab === "premium"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Cours premium
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <FaFilter className="text-gray-600" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-wrap gap-3">
                {["all", "débutant", "intermédiaire", "avancé"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedLevel === level
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Contenu des cours */}
        {activeTab === "free" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterCourses().map((course) => (
              <div
                key={course.id}
                onClick={() => navigate(`/courses/${course.titre}`)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              >
                <img src={image} alt={course.titre} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{course.titre}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {course.niveau}
                    </span>
                    <span className="text-gray-500 text-sm">{course.chapters.length * 4}h</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Section des cours premium
          <div className="space-y-8">
            {Object.entries(
              coursesProf.reduce((acc, cours) => {
                const fileType = cours.contenu_cours.endsWith(".pdf")
                  ? "PDF"
                  : cours.contenu_cours.endsWith(".mp4")
                  ? "Vidéo"
                  : "Image";
                if (!acc[fileType]) acc[fileType] = [];
                acc[fileType].push(cours);
                return acc;
              }, {})
            ).map(([fileType, courses]) => (
              <div key={fileType} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">{fileType}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {courses.map((cours) => (
                    <div
                      key={cours.id}
                      onClick={() => navigate(`/course/view/${cours.id}`, { state: { cours } })}
                      className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        {cours.contenu_cours.endsWith(".pdf") && <FaFilePdf className="text-red-500 text-2xl" />}
                        {cours.contenu_cours.endsWith(".mp4") && <FaFileVideo className="text-blue-500 text-2xl" />}
                        {cours.contenu_cours.endsWith(".jpg") && <FaFileImage className="text-green-500 text-2xl" />}
                        <span className="font-medium">{cours.titre}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;