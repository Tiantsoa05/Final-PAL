import React  from 'react'
import PasserExamen from '../../../components/examens/PasserExam.jsx'
import {Header} from '../Accueil/Header/Header.jsx'
import { useState,useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Evaluation = () => {
  const [data,setData]= useState([])
  const prof = localStorage.getItem('prof')
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:3000/exam/subject/'+prof)
        .then(res=>{
            console.log(res.data)
            setData(res.data)
        })
    if(!isNaN(parseInt(prof))){

    }
  },[])
  return (
    <div>
        <Header/>
        <PasserExamen onRetour={()=>navigate('/courses')}/>
    </div>
  )
}




const quizData = {
  allExam: [
    {
      id_examen: 1,
      question_examen: "What is the synonyme of run ?",
      option_reponse: "Courir,Dépêcher,Malaky,Aingana",
      reponse_examen: "Courir",
      point_examen: 2,
    },
    {
      id_examen: 2,
      question_examen: "Am I smart",
      option_reponse: "Vrai,Faux",
      reponse_examen: "vrai",
      point_examen: 1,
    },
    {
      id_examen: 3,
      question_examen: "Am I tired ?",
      option_reponse: "Vrai,Faux",
      reponse_examen: "vrai",
      point_examen: 1,
    },
    {
      id_examen: 4,
      question_examen: "Do I like coding ?",
      option_reponse: "Vrai,Faux",
      reponse_examen: "vrai",
      point_examen: 1,
    },
    {
      id_examen: 5,
      question_examen: "Where is my chance about my future job ?",
      option_reponse: "Nowhere,Idk,Fck,Soon",
      reponse_examen: "Soon",
      point_examen: 2,
    },
  ],
};

const Sujet = ({ quizData }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const handleSelect = (id, answer) => {
    setAnswers({ ...answers, [id]: answer });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getScore = () => {
    return quizData.allExam.reduce((score, exam) => {
      return answers[exam.id_examen] === exam.reponse_examen ? score + exam.point_examen : score;
    }, 0);
  };

  console.log(data)

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">QCM</h1>

      {data.allExam.map((exam) => (
        <div key={exam.id_examen} className="mb-4 p-4 bg-white rounded-lg shadow">
          <p className="font-medium mb-2">{exam.question_examen}</p>
          <div className="flex flex-wrap gap-2">
            {exam.option_reponse.split(",").map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded-lg border ${
                  answers[exam.id_examen] === option ? "bg-blue-500 text-white" : "bg-gray-200"
                } hover:bg-blue-400`}
                onClick={() => handleSelect(exam.id_examen, option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        className="w-full mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        onClick={handleSubmit}
      >
        Soumettre
      </button>
      {submitted && (
        <p className="mt-4 text-lg font-semibold">Score: {getScore()} points</p>
      )}
    </div>
  );
};
export default Evaluation