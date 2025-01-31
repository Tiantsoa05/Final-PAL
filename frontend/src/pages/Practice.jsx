import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Header } from './Etudiants/Accueil/Header/Header'

const Practice = () => {
    const [mot, setMot]= useState("")
    const [traduction,setTraduction] = useState('')
    const navigate = useNavigate()
    const [langue,setLangue] = useState('en')

    const capitalize = (word)=>{
        return word.charAt(0).toUpperCase()+word.slice(1)
    }

    const sendWord = async ()=>{
        
        const resp = await axios.post('http://localhost:3000/learn/trad',{
            from:'fr',
            to:langue,
            word:mot
        })
        
        setTraduction(resp.data.traduction)
    }
  return (
    <>
    <Header/>
    <label htmlFor="lang">Traduire en</label>
    <select name="lang" id="lang" onChange={(e)=>setLangue(e.target.value)}>
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
        <option value="es">Espagnol</option>
    </select>
    <div className="flex items-center justify-center w-full  min-h-96 text-white overflow-hidden">
    {/* Formulaire et Résultat */}
    <div className="flex w-full max-w-screen-lg gap-5">
        {/* Formulaire à gauche */}
        <div className="flex flex-col w-1/2 p-3 rounded-lg shadow-lg">
        <div>
            <input 
            type="text" 
            placeholder="Saisissez votre mot" 
            value={mot}
            onChange={(e) => setMot(e.target.value)}
            className="w-full h-32 p-1 text-black rounded-md mb-3 border-2"
            />
            <button 
            onClick={sendWord} 
            className="px-5 py-2 bg-blue-500 rounded-md hover:bg-blue-600 float-right"
            >
            Confirmer
            </button>
        </div>
        </div>

        {/* Résultat à droite */}
        <div className="flex items-center justify-center w-1/2 bg-white-900 p-5 rounded-lg shadow-lg border-2">
        <div className="text-center w-full text-black">
            <div className='text-black'>{capitalize(traduction)}</div>
        </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Practice