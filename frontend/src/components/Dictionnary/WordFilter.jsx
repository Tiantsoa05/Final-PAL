import React from 'react'

const ALPHABETS = [
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
]

const WordFilter = ({setFilter}) => {
  return (
    <div className='flex w-100 justify-center mt-10'>
        {
            ALPHABETS.map(letter=>{
                return (
                    <button
                        key={letter}
                        onClick={()=>setFilter(letter)}
                        className='p-1 text-center text-2xl'
                    >
                        {letter}
                    </button>
                )
            })
        }
    </div>
  )
}

export default WordFilter