import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createAgenda = async (req,res)=>{
    const {id_prof,tache,date_tache} = req.body

    console.log(req.body)

    try{
        const newProgramme = await prisma.programmeAgenda.create({
            data:{
                id_prof,
                tache,
                date_tache
            }
        })

        return res.status(200).json({newProgramme})

    }catch(error){
        console.log(error)
        return res.status(500).json({errorMessage: "Erreur lors de l'ajout du nouveau programme ", error})
    }
}

export const listPrograms = async (req,res)=>{
    const {id_prof} = req.params
    try{
        const programs = await prisma.programmeAgenda.findMany({
            where:{
                id_prof: parseInt(id_prof)
            }
        })

       return res.status(200).json(programs)

    }catch(error){
        return res.status(500).json(error)
    }
}

export const setProgram = async (req,res)=>{
    const { tache, date_tache } = req.body
    const {id_agenda} = req.params
    console.log(req.body)
    try{
        const updatedProgram = await prisma.programmeAgenda.update({
            where:{
                id_prog: parseInt(id_agenda)
            },
            data:{
                tache,
                date_tache
            }
        })

        console.log(updatedProgram)
        return res.status(200).json({success:true,updatedProgram})
    }catch(error){
        console.log(error)
        return res.status(500).json({error})
    }
}

export const deleteProgram = async (req,res)=>{
    const {id_agenda} = req.params
    console.log(req.params)
    try{
        const deletedProgram = await prisma.programmeAgenda.delete({
            where:{
                id_prog: parseInt(id_agenda)
            }
        })

        return res.status(200).json({success:true,deletedProgram})
    }catch(error){
        return res.status(500).json({error})
    }
}