/* eslint-disable react/prop-types */
import{ useEffect, useState } from 'react';
import { LEVEL_TEST } from '../../constants/levelTest';
import { ArrowLeft } from 'lucide-react';
import { testNiveau } from '../../data/testNiveau.js';

function LevelTestComponent({ 
  selectedLanguage, 
  onLevelTestComplete ,
  back
}) {
  const [levelTestAnswers, setLevelTestAnswers] = useState([]);

  const [sujet,setSujet]=useState({})

  const handleLevelTestAnswer = (question, answer,sujet) => {

    let retour = {
      question,
      answer,
      trueResponse: sujet.reponse,
      note: sujet.points
    }

    const existed = levelTestAnswers.find(b=>b.question===question)

    if(existed){

      let r= levelTestAnswers
      let index = levelTestAnswers.indexOf(existed)
      r[index]=retour
      
      setLevelTestAnswers([...r])
    }else{
      setLevelTestAnswers([...levelTestAnswers,retour])
    }
    // setLevelTestAnswers(prev => ({
    //   ...prev,
    //   [question]: answer
    // }));

    console.log(levelTestAnswers)

  };

  const calculateLevel = () => {
    onLevelTestComplete(levelTestAnswers);
  };

  useEffect(()=>{
    let sub = testNiveau.find(sub=>sub.lang===selectedLanguage.id)
    setSujet(sub.test)
  },[])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="align">
        <button
          className="text-blue-600 px-4 py-2 rounded-md float-left mb-16 text-xl"
          onClick={back}
        >
          <ArrowLeft size={40} color='black'/>
        </button>
        <h2 className="text-3xl font-bold text-center mb-8">
          Test de niveau en <span className="text-blue-600">{selectedLanguage.name}</span>
        </h2>
      </div>
      {
        sujet.length > 0 &&  
        
        sujet.map(sub=>(
          <div key={sub.id} className="mb-8">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className='text-left'>
                {sub.question}
              </div>
                {sub.choix.map((choice, index) => {
                  const isSelected = levelTestAnswers.find(
                    (answer) => answer.question === sub.question && answer.answer === choice
                  );
                  return (
                    <button
                      key={index}
                      onClick={() => handleLevelTestAnswer(sub.question, choice, sub)}
                      className={`
                        w-full text-left p-2 mb-2 rounded 
                        ${isSelected ? 'bg-blue-600 text-white' : 'bg-white hover:bg-blue-100'}
                      `}
                    >
                      {choice}
                    </button>
                  );
                })}
              </div>
          </div>
        ))
      }
      <div className="text-center">
        <button 
          onClick={calculateLevel}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Soumettre
        </button>
      </div>
    </div>
  );
}

export default LevelTestComponent;