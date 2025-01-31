/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Brain, 
  ArrowRight,
  Target,
  BarChart3,
  Trophy,
  Info,
  Clock
} from 'lucide-react';

export default function ExerciseInterface({ exercises }) {
  const [selectedLevel, setSelectedLevel] = useState('debutant');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredExercises, setAnsweredExercises] = useState([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const filteredExercises = exercises?.filter(ex => ex.niveau === selectedLevel) || [];
  const currentExercise = filteredExercises[currentExerciseIndex];

  // Timer pour suivre le temps passé
  useEffect(() => {
    if (!showResult && filteredExercises.length > 0) {
      setStartTime(Date.now());
      const timer = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [selectedLevel, showResult]);

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    setCurrentExerciseIndex(0);
    setUserAnswer('');
    setScore(0);
    setShowResult(false);
    setAnsweredExercises([]);
    setTimeSpent(0);
  };

  const handleSubmitAnswer = () => {
    const isCorrect = userAnswer.toLowerCase().trim() === currentExercise.reponse.toLowerCase().trim();
    
    setAnsweredExercises([...answeredExercises, {
      ...currentExercise,
      userAnswer,
      isCorrect,
      timeSpent
    }]);

    if (isCorrect) {
      setScore(score + currentExercise.points);
    }

    if (currentExerciseIndex < filteredExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserAnswer('');
    } else {
      setShowResult(true);
    }
  };

  const handleRetry = () => {
    setCurrentExerciseIndex(0);
    setUserAnswer('');
    setScore(0);
    setShowResult(false);
    setAnsweredExercises([]);
    setTimeSpent(0);
    setStartTime(Date.now());
  };

  if (!exercises || exercises.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucun exercice disponible</h3>
          <p className="text-gray-600">Les exercices pour cette leçon seront bientôt disponibles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header avec progression */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="text-blue-500" />
            Exercices d'entraînement
          </h1>
          {!showResult && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="text-green-500" />
                <span className="font-medium">{score} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-orange-500" />
                <span>{timeSpent}s</span>
              </div>
            </div>
          )}
        </div>

        {/* Sélecteur de niveau */}
        <div className="flex flex-wrap gap-4">
          {['debutant', 'intermediaire', 'avance'].map(level => (
            <button
              key={level}
              onClick={() => handleLevelChange(level)}
              className={`flex-1 px-6 py-4 rounded-xl font-medium transition-all transform hover:scale-105 ${
                selectedLevel === level
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <Brain className={selectedLevel === level ? 'text-white' : 'text-blue-500'} />
                <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Résultats */}
      {showResult ? (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Trophy className="w-20 h-20 text-yellow-500 mb-4" />
              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                {Math.round((score / (filteredExercises.length * 10)) * 100)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Félicitations !</h3>
            <p className="text-gray-600 mb-2">Score final : {score} points</p>
            <p className="text-gray-500">Temps total : {timeSpent} secondes</p>
          </div>

          {/* Récapitulatif des réponses */}
          <div className="space-y-4 mb-8">
            {answeredExercises.map((ex, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl transition-all ${
                  ex.isCorrect ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  {ex.isCorrect ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 mb-2">{ex.question}</p>
                    <div className="space-y-1 text-sm">
                      <p className="text-gray-600">
                        Votre réponse : <span className="font-medium">{ex.userAnswer}</span>
                      </p>
                      {!ex.isCorrect && (
                        <p className="text-gray-600">
                          Réponse correcte : <span className="font-medium text-green-600">{ex.reponse}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-sm text-gray-500">{ex.timeSpent}s</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleRetry}
            className="w-full py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all transform hover:scale-105 font-medium flex items-center justify-center gap-2"
          >
            <ArrowRight className="rotate-180" />
            Recommencer les exercices
          </button>
        </div>
      ) : (
        // Interface d'exercice
        filteredExercises.length > 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Barre de progression */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progression : {currentExerciseIndex + 1}/{filteredExercises.length}
                </span>
                <span className="text-sm font-medium text-blue-500">
                  {Math.round(((currentExerciseIndex + 1) / filteredExercises.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${((currentExerciseIndex + 1) / filteredExercises.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question courante */}
            <div className="mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Info className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {currentExercise.question}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Valeur : {currentExercise.points} points
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Saisissez votre réponse..."
                  className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                  autoFocus
                />
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-medium"
                >
                  Valider ma réponse 
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
            <Info className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Aucun exercice disponible pour ce niveau
            </h3>
            <p className="text-gray-600">
              Veuillez sélectionner un autre niveau ou revenir plus tard.
            </p>
          </div>
        )
      )}
    </div>
  );
}