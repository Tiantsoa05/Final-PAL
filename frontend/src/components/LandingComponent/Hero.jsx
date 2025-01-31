/* eslint-disable react/no-unescaped-entities */
import { CheckCircle} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate()
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Texte */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Apprenez n'importe quelle langue
            <span className="text-blue-600"> facilement et rapidement</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Une plateforme d'apprentissage des langues adaptive et interactive
            qui s'adapte à votre rythme et à vos objectifs.
          </p>

          {/* Avantages */}
          <div className="space-y-3 mb-8">
            {['Cours personnalisés', 'Apprentissage ludique', 'Professeurs natifs'].map((advantage) => (
              <div key={advantage} className="flex items-center">
                <CheckCircle className="text-green-500 mr-3" />
                <span className="text-gray-700">{advantage}</span>
              </div>
            ))}
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={()=>navigate("/langue")}
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Commencer à apprendre
            </button>
            <button 
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 transition-colors"
              onClick={()=>navigate('/register_prof')}
            >
              Commencer à enseigner
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img 
            src="/src/assets/hero.webp" 
            alt="Apprentissage des langues" 
            className="w-full max-w-lg rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
