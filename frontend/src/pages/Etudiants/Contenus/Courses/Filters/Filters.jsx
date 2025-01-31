import React, { useState } from "react";

const Filters = ({ setFilter }) => {
    const [debLevel, setDebLevel] = useState(false);
    const [intLevel, setIntLevel] = useState(false);
    const [advLevel, setAdvLevel] = useState(false);
    const [grammar,setGrammar] = useState(false);
    const [vocabulary, setVocabulary] = useState(false);
    const [conjugaison, setConjugaison] = useState(false);

    return (
        <div className="w-1/5 p-6 bg-gradient-to-b from-blue-900 to-blue-800 text-white rounded-lg shadow-lg h-screen">
            {/* Section Niveaux */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Niveaux</h3>
                <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    name="débutant"
                    id="débutant"
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                    checked={debLevel}
                    onChange={(e) => {
                        setDebLevel(!debLevel);
                        if (e.target.checked) {
                        setFilter(e.target.name);
                        }
                    }}
                    />
                    <label htmlFor="débutant" className="text-white text-sm">
                    Débutant
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    name="intermédiaire"
                    id="intermédiaire"
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                    checked={intLevel}
                    onChange={(e) => {
                        setIntLevel(!intLevel);
                        if (e.target.checked) {
                        setFilter(e.target.name);
                        }
                    }}
                    />
                    <label htmlFor="intermédiaire" className="text-white text-sm">
                    Intermédiaire
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    name="avancé"
                    id="avancé"
                    className="form-checkbox h-5 w-5 text-blue-600 focus:ring-blue-500"
                    checked={advLevel}
                    onChange={(e) => {
                        setAdvLevel(!advLevel);
                        if (e.target.checked) {
                        setFilter(e.target.name);
                        }
                    }}
                    />
                    <label htmlFor="avancé" className="text-white text-sm">
                    Avancé
                    </label>
                </div>
                </div>
            </div>

            {/* Section Chapitres */}
            <div>
                <h3 className="text-xl font-semibold text-white mb-4">Chapitres</h3>
                <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    name="grammaire"
                    id="grammaire"
                    className="form-checkbox h-5 w-5 text-green-600 focus:ring-green-500"
                    checked={grammar}
                    onChange={(e) => {
                        setGrammar(!grammar);
                        if (e.target.checked) {
                        setFilter(e.target.name);
                        }
                    }}
                    />
                    <label htmlFor="grammaire" className="text-white text-sm">
                    Grammaire
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    name="vocabulaires"
                    id="vocab"
                    className="form-checkbox h-5 w-5 text-green-600 focus:ring-green-500"
                    checked={vocabulary}
                    onChange={(e) => {
                        setVocabulary(!vocabulary);
                        if (e.target.checked) {
                        setFilter(e.target.name);
                        }
                    }}
                    />
                    <label htmlFor="vocabulaires" className="text-white text-sm">
                    Vocabulaires
                    </label>
                </div>
                <div className="flex items-center gap-2">
                    <input
                    type="checkbox"
                    name="conjugaison"
                    id="conjugaison"
                    className="form-checkbox h-5 w-5 text-green-600 focus:ring-green-500"
                    checked={conjugaison}
                    onChange={(e) => {
                        setConjugaison(!conjugaison);
                        if (e.target.checked) {
                        setFilter(e.target.name);
                        }
                    }}
                    />
                    <label htmlFor="conjugaison" className="text-white text-sm">
                    Conjugaison
                    </label>
                </div>
                </div>
            </div>
            </div>

    )
}

export default Filters