import React from "react";
import { Link } from "react-router-dom";
export const TestForm = ({data}) => {
    console.log(data);
    return (
        <div className="test-fr justify-content-center align-items-center container-fluid">
            {
                data.map(subject=>(
                    <div key={subject.question}>
                        <h4>{subject.question}</h4>
                        {subject.choices.map(choice=>(
                            <div key={choice}>
                                <input type="radio" id={choice} name={subject.question} />
                                <label htmlFor={choice}>{choice}</label>
                            </div>
                        ))}
                    </div>
                ))
            }
            <Link to={"/inscription"}>
                <div className="btn btn-primary">Valider</div>
            </Link>
        </div>
    );
};