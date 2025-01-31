import React from 'react'

const TableauConjugaison = ({valeur}) => {
    const capitalize = (word)=>{
        return word.charAt(0).toUpperCase()+word.slice(1)
    }

    return (
        <table>
            <thead className='text-blue-500 text-2xl border-2'>{valeur.temps}</thead>
            <tbody className='border-l-2 border-r-2'>
                {
                    valeur.conjugaison.map(conjug=>{
                        return <tr className='text-xl border-b-2'>
                            {capitalize(conjug)}
                        </tr>
                    })
                }
            </tbody>
        </table>
    )
}

export default TableauConjugaison