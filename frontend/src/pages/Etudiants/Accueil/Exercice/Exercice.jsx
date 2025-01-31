import React, { useEffect, useState } from "react";
import "./Exercice.css"
import Pratique from "./Pratique/Pratique.jsx";

export const Exercice = () => {
    const [chat,setChat]=useState("")

    /* useEffect(()=>{
        setChat(completion.data.choices[0].message.content)
    },[completion]) */

    
    return (
        <div className="exercice">
            <h1>Pratique</h1>
            <p>
                Vous pouvez faire des exercices pour vous améliorer dans votre langue. Vous pouvez utiliser des ressources tels que les dictionnaires, les épreuves, ou même des exercices de prononciation.
            </p>
            <div className="practice-card">
                <div className="gramatics">
                    <div className="titre">Ecrits</div>
                    <p>{chat}</p>
                    <input type="text" />
                </div>
            </div>
            <Pratique/>
        </div>   
    )
}
