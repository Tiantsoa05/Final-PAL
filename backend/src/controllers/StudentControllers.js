import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFollowerStudents = async (req, res) => {
  const { id_prof } = req.params;
  
  try{

    const followers = await prisma.etudiant.findMany({
      where:{
        id_prof: parseInt(id_prof)
      }
    })

    res.status(200).json(followers)

  }catch(error){
    console.error('Erreur de requête :', error)
    res.status(400).json({ message: error.message })
  }

}


export const getFollowersNumber = async (req,res)=>{
  const {id_prof} = req.params
  const numberFollowers = await prisma.etudiant.count({
    where:{
      id_prof: parseInt(id_prof)
    }
  })

  res.status(200).json({followers:numberFollowers})
}

export const getUserById = async (req,res)=>{
  const {id_etudiant} = req.params
  const user = await prisma.etudiant.findUnique({
    where:{
      id_prof: parseInt(id_etudiant)
    }
  })

  res.status(200).json(user)
}