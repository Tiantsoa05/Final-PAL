/* eslint-disable react/no-unescaped-entities */
import { BookOpen, Clock, Globe, GraduationCap, Star } from "lucide-react";

/* eslint-disable react/prop-types */
export const CourseCard = ({ 
    course, 
    userInscriptions, 
    onEnroll, 
    navigateToLessons, 
    getDifficultyColor 
  }) => {
    return (
      <div className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {course.nom}
              </h3>
              <span className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(course.niveau_difficulte)}`}>
                {course.niveau_difficulte}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <img
              src={`/api/placeholder/40/40`}
              alt="Teacher"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <div className="text-sm font-medium">Prof. Sarah Martin</div>
              <div className="text-xs text-gray-500">Expert en {course.langue}</div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
            {course.description}
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
              <Globe className="w-4 h-4 mr-2 text-blue-500" />
              <span>{course.langue}</span>
            </div>
            <div className="flex items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              <span>{course.duree} min</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium">4.8</span>
              <span className="text-sm text-gray-500">(24 avis)</span>
            </div>
            <div className="text-xl font-bold text-blue-600">
              {course.prix} Ar
            </div>
          </div>
          
          {course.prix > 0 && !userInscriptions.includes(course.id_cours) ? (
            <button
              onClick={() => onEnroll(course)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <GraduationCap className="w-5 h-5" />
              S'inscrire au cours
            </button>
          ) : (
            <button
              className="w-full bg-green-600 text-white py-3 px-4 rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => navigateToLessons(course.id_cours)}
            >
              <BookOpen className="w-5 h-5" />
              Accéder au cours
            </button>
          )}
        </div>
      </div>
    );
  };