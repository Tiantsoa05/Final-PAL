import React,{ useState } from "react";
import { CardProf } from "./CardProf/CardProf.jsx";
import "./Profs.css"

export const Profs = ({profs,setProf}) => {

    if (profs.length === 0) {
        return (
            <div className="p-6 text-center text-gray-500">
                <p>Aucun professeur disponible</p>
            </div>
        );
    }

    return (
        <div className="liste-prof flex flex-col gap-2 overflow-x-hidden">
            {
                profs.map((prof)=>(
                    <CardProf 
                        key={prof.id_prof}
                        prof={prof} 
                        setProf={setProf}
                    />
                ))
            }
                
        </div>   
    )
}