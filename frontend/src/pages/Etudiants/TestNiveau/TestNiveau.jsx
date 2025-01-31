import React , {useState} from "react";
import { useParams } from "react-router-dom";
import { TestForm } from "./Langues/TestForm";

const TestNiveau = () => {

    const {langue} = useParams()
    
    const [formQuestions, setFormQuestions] = useState([
        {
            question: "Question 1",
            choices: [
                "choice1","choice2","choice3"
            ],
            response: "choice1"
        },
        {
            question: "Question 2",
            choices: [
                "choice4","choice5","choice6"
            ],
            response: "choice4"
        },
        {
            question: "Question 3",
            choices: [
                "choice7","choice8","choice9"
            ],
            response: "choice7"
        }
    ])

    return (
        <div className="test-niveau justify-content-center align-items-center w-100 h-100">
            <TestForm data={formQuestions}/>
        </div>
    );

};

export default TestNiveau;