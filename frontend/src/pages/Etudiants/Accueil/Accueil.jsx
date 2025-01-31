import React, {useEffect, useState} from "react";
import "./Accueil.css"
import { Header } from "./Header/Header.jsx";
import { Profs } from "./Profs/Profs.jsx";
import { Menus } from "./Menus/Menus.jsx";
import DetailProf from "./Profs/DetailProf/DetailProf.jsx";
import { Lessons } from "./Lessons/Lessons.jsx";
import { Exercice } from "./Exercice/Exercice.jsx";
import Post from "./Post/Post.jsx";
import axios from "axios";

const Accueil = ()=>{
    const [data,seData]=useState([]) 
    const [profs,setProfs] = useState([])
    const [valueSearch,setValueSearch] = useState('')
    const [cliquedProf,setCliquedProf] = useState(null)
    const [lessons,DisplayLessons] = useState(false)
    const [exercice,DisplayExercice] = useState(false)
    const [noProfFound,setNoProffound]=useState(false)
    const [user,setUser] = useState({})

    const setProf = (prof) =>{
        setCliquedProf(prof)
        DisplayExercice(false)
        DisplayLessons(false)
    }

    const setExercice=()=>{
        DisplayExercice(true)
        setCliquedProf(null)
        DisplayLessons(false)
    }

    const setLessons=()=>{
        DisplayLessons(true)
        setCliquedProf(null)
        DisplayExercice(false)
    }

    useEffect(()=>{
        
        axios.get('http://localhost:3000/all/profs').then(data=>{
            setProfs(data.data)
            seData(data.data)
        })
        
    },[])

    return (
        <div className="accueil justify-content-center align-items-center w-100 h-100">
            <Header/>
            <div className="card-group flex items-center justify-between mt-6 bg-white">
                <div className="liste-profs">
                    <div className="intro bg-white p-2 border-b border-black w-[24vw] h-[18vh] ml-[-1.5vw]">
                        <div className="texte">Liste des professeurs</div>
                        <input 
                            type="text" 
                            className="form-control search-prof mt-1 mb-4 w-4/5 mx-auto p-2 border rounded"
                            value={valueSearch}
                            onChange={(e) => {
                                setValueSearch(e.target.value);
                            
                                if (e.target.value.trim() !== '') {
                                    let filteredProf = data.find(d => d.nom_prof.includes(e.target.value));
                                    
                                    if (filteredProf !== undefined) {
                                        setProfs([filteredProf]);
                                        setNoProffound(false);
                                    } else {
                                        setProfs([]); // Correction ici (au lieu de setProf([]))
                                        setNoProffound(true);
                                    }
                                } else {
                                    setNoProffound(false);
                                    setProfs(data);
                                }
                            }}
                            
                        />
                    </div>
                    <div className="list">
                        
                        {profs.length > 0 ? (
                            <Profs profs={profs} setProf={setProf}/>
                    
                        ):  <div 
                            className=" mt-5 ml-5 z-50  text-red-700 px-4 py-3 rounded shadow-md w-11/12 max-w-md flex justify-between items-center">
                            <span className="text-sm">Le nom que vous saisissez est introuvable</span>
                        </div> } 
                    </div>
                </div>
                <div className="details liste-profs h-[50vh] overflow-y-scroll overflow-x-hidden flex-1">
                    {
                        (cliquedProf!==null) && <DetailProf prof={cliquedProf} onClose={()=>setCliquedProf(null)}/>
                    }
                    {
                        (exercice) && <Exercice/>
                    }
                    {
                        (lessons) && <Lessons/>
                    }
                    <Post/>
                </div>
                <div className="menu liste-profs">
                    <Menus setLessons={setLessons} setExercice={setExercice}/>
                </div>
            </div>
        </div>
    );
}

export default Accueil