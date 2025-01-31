import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getLanguages = async (req,res)=>{
    const languages = await prisma.langue.findMany()
    res.status(200).json(languages)
}

export const getEtudiants = async (req,res)=>{
    const etudiants = await prisma.etudiant.findMany()
    res.status(200).json(etudiants)
}

export const getProfessors = async (req,res)=>{

    const profs = await prisma.professeur.findMany({
        include: {
            langue: {
                select: {
                    nom_langue: true
                }
            },
        }
    })

    res.status(200).json(profs)

}

export const getProfessorsByLevel = async (req,res)=>{
    const {niveau} = req.body
    const profs = await prisma.professeur.findMany(
        {
            where:{Niveau_Etude:niveau},
            include: {
                langue: {
                    select: {
                        nom_langue: true
                    }
                }
            }
        }
    )
    res.status(200).json(profs)
}

export const getProfessorById = async (req,res)=>{
    const {id} = req.params
    const prof = await prisma.professeur.findFirst()
    return res.status(200).json(prof)
}