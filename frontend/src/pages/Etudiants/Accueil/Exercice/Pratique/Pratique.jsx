import React, { useState } from 'react'

const Pratique = () => {
    const [mot, setMot] = useState('')
    const [traduced,setTraduced] = useState('')
    const [langue, setLangue] = useState('')

    const traduire = () => {
        fetch("http://localhost:3000/practice/trad",
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  mot:mot,
                  option: langue
                }),
            }

        ).then(res=>res.json())
        .then(trad=>console.log(trad))
    }

    return (
        <div>
            <form action="">
                <input type="text" placeholder='Mot à traduire' value={mot} onChange={(e)=>{setMot(e.target.value)}}/>
                <select name="langue" id="" value={langue} onChange={(e)=>{setLangue(e.target.value)}}>
                    <option value="fr">Français</option>
                    <option value="en">Anglais</option>
                </select>
                <button onClick={
                        (e)=>{
                            e.preventDefault()
                            traduire()
                        }
                    }
                >Traduire</button>
            </form>
            {
                traduced!==""&& <div>{traduced}</div>
            }
        </div>
    )
}

export default Pratique