/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { Header } from '../Accueil/Header/Header';
import { Sparkles, Languages, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const SpellCheck = () => {
  const [langue, setLangue] = useState('fr');
  const [mot, setMot] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const capitalize = (word) => {
    return word?.charAt(0).toUpperCase() + word?.slice(1);
  };

  const checkWord = async () => {
    if (!mot.trim()) return;
    
    setIsLoading(true);
    try {
      const resp = await axios.post('http://localhost:3000/spell/check', {
        text: mot,
        lang: langue
      });
      setSuggestion(resp.data.suggestion);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
            
            <div className="relative">
              {/* Header Section */}
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-500 rounded-2xl text-white">
                  <Languages className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Vérificateur d'orthographe
                </h2>
              </div>

              {/* Language Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sélectionnez la langue
                </label>
                <select
                  value={langue}
                  onChange={(e) => setLangue(e.target.value)}
                  className="w-full md:w-64 px-4 py-2.5 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-400"
                >
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                  <option value="es">Italien</option>
                </select>
              </div>

              {/* Main Content Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Votre texte
                    </label>
                    <textarea
                      value={mot}
                      onChange={(e) => setMot(e.target.value)}
                      placeholder="Saisissez votre texte ici..."
                      className="w-full h-48 p-4 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm
                               focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all
                               hover:border-blue-400 resize-none"
                    />
                  </div>
                  <button
                    onClick={checkWord}
                    disabled={isLoading || !mot.trim()}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 
                             bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl
                             hover:from-blue-600 hover:to-blue-800 transition-all transform hover:scale-[1.02]
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                             focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <ArrowRight className="w-5 h-5" />
                        Vérifier
                      </>
                    )}
                  </button>
                </div>

                {/* Results Section */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-white/60">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-blue-500 rounded-lg text-white">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Suggestion</h3>
                  </div>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg blur transition-all opacity-0 group-hover:opacity-100" />
                    <div className="relative p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-white/60 min-h-[12rem]">
                      {suggestion ? (
                        <p className="text-gray-800 text-lg leading-relaxed">{capitalize(suggestion)}</p>
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          Les suggestions apparaîtront ici
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpellCheck;