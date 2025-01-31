/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import axios from "axios";
import { useEffect, useState } from "react";

const PasserExamen = ({ onRetour }) => {
  const [examen, setExamen] = useState([]);
  const [reponses, setReponses] = useState([]);
  const [note, setNote] = useState(null);
  const [badge, setBadge] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const chargerExamen = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/exam/subject/1`);
        setExamen(response.data.allExam);
        setReponses(new Array(response.data.allExam.length).fill(''));
      } catch (error) {
        console.error('Erreur:', error);
        setError(error.response?.data?.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    chargerExamen();
  }, []);

  const handleReponseChange = (index, reponse) => {
    const newReponses = [...reponses];
    newReponses[index] = reponse;
    setReponses(newReponses);
  };

  const soumettrExamen = () => {
    let score = 0;
    let totalPoints = 0
    examen.forEach((question, index) => {
      totalPoints += question.point_examen
      if (question.reponse_examen === reponses[index]) {
        score += question.point_examen;
      }
    });
    
    const pourcentage = (score / examen.reduce((acc, q) => acc + q.point_examen, 0)) * 100;
    setNote(pourcentage.toFixed(2));
    const hasBadge = pourcentage >= 70;
    setBadge(hasBadge);
    
    if (hasBadge) {
      localStorage.setItem("badge_obtenu", JSON.stringify({ date: new Date().toISOString(), note: pourcentage.toFixed(2) }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700">{error}</p>
        </div>
        <button onClick={onRetour} className="mt-6 text-blue-600 hover:text-blue-800 font-medium">
          Retour aux cours
        </button>
      </div>
    );
  }

  if (note !== null) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold">Résultat de l'Examen</h2>
        <div className="text-3xl font-bold mt-4">{note}%</div>
        {badge ? (
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-lg">
            <p className="text-green-800 font-bold">🎖 Félicitations ! Vous avez obtenu votre badge.</p>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-lg">
            <p className="text-red-800 font-bold">Dommage ! Essayez encore pour obtenir votre badge.</p>
          </div>
        )}
        <button onClick={onRetour} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg">
          Retour aux cours
        </button>
      </div>
    );
  }

  const totalQuestions = examen.length;
  const currentQuestionData = examen[currentQuestion];
  const options = currentQuestionData.option_reponse.split(',');

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Examen</h2>
        <span className="text-sm text-gray-600">Question {currentQuestion + 1} sur {totalQuestions}</span>
      </div>

      <div className="mb-8">
        <p className="text-lg font-medium mb-6">{currentQuestionData.question_examen}</p>
        {options.map((option, optIndex) => (
          <label key={optIndex} className={`block p-4 rounded-lg border-2 transition-all cursor-pointer ${reponses[currentQuestion] === option ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
            <input type="radio" name={`question-${currentQuestion}`} value={option} checked={reponses[currentQuestion] === option} onChange={() => handleReponseChange(currentQuestion, option)} className="hidden" />
            {option}
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))} disabled={currentQuestion === 0} className={`px-6 py-3 rounded-lg font-medium transition-colors ${currentQuestion === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          Question précédente
        </button>
        {currentQuestion === totalQuestions - 1 ? (
          <button onClick={soumettrExamen} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium">
            Terminer l'examen
          </button>
        ) : (
          <button onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
            Question suivante
          </button>
        )}
      </div>
    </div>
  );
};

export default PasserExamen;
