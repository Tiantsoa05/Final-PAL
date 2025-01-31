import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const checkAllEqual = (array) => {
    return array.every((value) => value === array[0]);
};

const choiceLanguage = [
    "True,False","Vrai,Faux","Verdadero,Falso"
]

export const createExam = async (req,res)=>{
    const {questions,id_prof,id_langue} = req.body

    try{

        const createdExam=await prisma.examen.createMany({
            data: questions.map(question=>({
                question_examen: question.enonce,
                option_reponse: checkAllEqual(question.options) ? 
                    choiceLanguage[parseInt(id_langue)] : 
                    question.options.join(','),
                reponse_examen: question.bonneReponse,
                point_examen:checkAllEqual(question.options) ? 1 : 2,
                id_prof:parseInt(id_prof)
            }))
        })

        res.status(200).json({createdExam})
    }catch(error){
        console.log(error)
        return res.status(500).json({error})
    }
}

export const enonceExam = async (req,res)=>{
    const {id_prof} = req.params

    try{
        const allExam = await prisma.examen.findMany({
            where:{
                id_prof: parseInt(id_prof)
            }
        })

        return res.status(200).json({allExam})
    }catch(error){
        console.log(error)
        return res.status(500).json({error})
    } 
}