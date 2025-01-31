import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const choisirProf = async(req,res)=>{

    const {id_prof, id_etudiant} = req.body

    try{
        const modif = await prisma.etudiant.update({
            where:{
                id_etudiant: parseInt(id_etudiant)
            },
            data:{
                id_prof: parseInt(id_prof)
            }
        })

        res.status(200).json({edited:modif})

    }catch(error){
        console.error('Erreur de la modification :', error);
        res.status(400).json({ message: error.message });
    }
}

export const classNiveau = async (req,res)=>{
    const {id_niveau,id_etudiant} = req.body
    try{
        const modif = await prisma.etudiant.update({
            where:{
                id_etudiant: parseInt(id_etudiant)
            },
            data:{
                id_niveau: parseInt(id_niveau)
            }
        })

        res.status(200).json({edited:modif})
    }catch(error){
        console.error('Erreur de connexion :', error);
        res.status(400).json({ message: error.message });
    }
}