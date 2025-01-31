import { useState } from 'react';
import { Header } from '../../pages/Etudiants/Accueil/Header/Header';
import DictionnaryWords from '../../data/Dictionnary';
import { Search, Book, ArrowRight, RotateCcw } from 'lucide-react';
import WordFilter from '../Dictionnary/WordFilter';

const Dictionnary = () => {
    const [words, setWords] = useState([...DictionnaryWords]);
    const [search, setSearch] = useState('');

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    const handleSearch = () => {
        if (search.trim() !== '') {
            let found = DictionnaryWords.find(word => word.mot.toLowerCase() === search.toLowerCase());
            if (found) {
                setWords([found]); // Si un mot est trouvé, on l'affiche
            } else {
                setWords([]); // Si aucun mot n'est trouvé, on affiche une liste vide
            }
        }
    };

    const setFilter = (initial) => {
        let found = DictionnaryWords.filter(word => word.mot.charAt(0) === initial.toLowerCase());
        setWords(found);
    };

    const resetList = () => {
        setWords([...DictionnaryWords]);
        setSearch('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col items-center mb-12">
                    <div className="flex items-center mb-8">
                        <Book className="w-10 h-10 text-indigo-600 mr-3" />
                        <h1 className="text-3xl font-bold text-gray-800">Dictionnaire</h1>
                    </div>
                    
                    <div className="w-full max-w-3xl">
                        <WordFilter setFilter={setFilter} />
                        
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full">
                            <div className="relative flex-1">
                                <input 
                                    type="text" 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Chercher un mot"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                            <button 
                                onClick={handleSearch}
                                className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transform hover:scale-105 transition-all duration-200"
                            >
                                <Search className="w-5 h-5 mr-2" />
                                Chercher
                            </button>
                            <button 
                                onClick={resetList}
                                className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
                                title="Réinitialiser la liste"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 max-w-4xl mx-auto">
                 {words.length > 0 ? (
                     <>
                        {words.map(word => (
                            <div 
                                key={word.id}
                                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transform hover:-translate-y-1 transition-all duration-200"
                            >
                                <div className="flex items-center mb-4">
                                    <h2 className="text-xl font-bold text-gray-800">{capitalize(word.mot)}</h2>
                                    <ArrowRight className="w-5 h-5 text-indigo-500 ml-3" />
                                </div>
                                
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    {word.definition}
                                </p>
                                
                                {word.synonymes.length > 0 && (
                                    <div className="mb-3">
                                        <span className="font-medium text-gray-700">Synonymes : </span>
                                        <span className="text-indigo-600">
                                            {word.synonymes.join(', ')}
                                        </span>
                                    </div>
                                )}
                                
                                {word.phrase_exemple && (
                                    <div className="bg-indigo-50 p-4 rounded-lg">
                                        <p className="text-gray-700 italic">
                                            &ldquo;{word.phrase_exemple}&rdquo;
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                     </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-center bg-red-100 border border-red-300 text-red-700 px-6 py-4 rounded-lg shadow-md">
                            <p className="text-lg font-semibold">Aucun résultat trouvé</p>
                            <p className="text-sm mt-2">Le mot recherché n'existe pas dans notre dictionnaire. Essayez une autre orthographe ou un synonyme.</p>
                        </div>
                    )
                }
                </div>
            </div>
        </div>
    );
};

export default Dictionnary;