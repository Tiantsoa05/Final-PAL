import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


const prisma = new PrismaClient();

export const register = async (req,res)=>{
  const { nom, prenom, email, password, datenaiss, levelLanguage } = req.body
  console.log(req.body)
  try{
    const existingUser = await prisma.etudiant.findFirst({where:{e_mail: email}})
    const existingProf = await prisma.professeur.findFirst({where:{mail_prof: email}})
    
    if(existingProf || existingUser){
      return res.status(400).json({errorMessage: "Compte déjà existant avec le mail"})
    }

  
    // Crypt the password
    const passHashed = await bcrypt.hash(password, 10)

    const niveau = await prisma.niveau.findFirst({
      select:{
        id_niveau:true
      },
      where:{
        valeur_niveau: levelLanguage
      }
    })
    
    const etudiant = await prisma.etudiant.create(
      {
        data:{
          nom_etudiant: nom,
          prenom_etudiant: prenom,
          e_mail: email,
          mdp: passHashed,
          Date_Naissance: datenaiss,
          id_prof: null,
          id_niveau: niveau.id_niveau
        }
      }
    )

    const token = jwt.sign(
      {
        userId: etudiant.id_etudiant
      },
      process.env.JWT_SECRET,
      {
        expiresIn:"3h"
      }
    )
    
    res.status(200).json({token})
  }catch(error){
    console.error('Erreur lors de l\'inscription :', error);
    res.status(400).json({ message: error.message });
  }
}

// export const login = async (req, res) => {
//   const { email, password } = req.body;
// console.log(req.body)
//   try{

//     let user = await prisma.etudiant.findUnique({
//       where:{
//         e_mail: email
//       }
//     });
//     if(!user){
//       user = await prisma.professeur.findFirst({
//         where: {
//           mail_prof: email,
//         }
//       });
//       if(!user){
//         return res.status(401).json({ message: "Email incorrect" });
//       }
//     }
//     // console.log(etudiant)
//     // if(!etudiant){
//     //   return res.status(401).json({ message: "Email incorrect" });
//     // }
  
//     if (!(await bcrypt.compare(password,user.mdp))) {
//       console.log(etudiant)
//       return res.status(401).json({ message: "Email ou mot de passe incorrect" });
//     }
  
//     const token = jwt.sign({ userId: etudiant.id_etudiant , nom:etudiant.nom_etudiant}, process.env.JWT_SECRET, {
//       expiresIn: "3h",
//     });
  
//     res.json({ 
//       token,
//       user:{
//         id: etudiant.id_etudiant,
//         nom: etudiant.nom_etudiant,
//         prenom: etudiant.prenom_etudiant,
//         email: etudiant.e_mail,
//         role: "ETUDIANT",
//         prof:etudiant.id_prof
//       }
//     });

//   }catch(error){
//     console.error('Erreur de connexion :', error);
//     res.status(400).json({ message: error.message });
//   }
// }
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Recherche si l'email appartient à un étudiant
    let user = await prisma.etudiant.findUnique({
      where: {
        e_mail: email
      }
    });

    // Si l'email ne correspond pas à un étudiant, vérifier s'il appartient à un professeur
    if (!user) {
      user = await prisma.professeur.findFirst({
        where: {
          mail_prof: email
        }
      });

      // Si l'email n'est ni un étudiant ni un professeur
      if (!user) {
        return res.status(401).json({ message: "Email incorrect" });
      }
    }

    // Comparer le mot de passe pour les deux cas (étudiant ou professeur)
    const isPasswordValid = user.mdp
      ? await bcrypt.compare(password, user.mdp)  // Étudiant
      : await bcrypt.compare(password, user.mdp_prof);  // Professeur

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // Créer le token JWT en fonction du type d'utilisateur (étudiant ou professeur)
    const token = jwt.sign(
      {
        userId: user.id_etudiant || user.id_prof,  // Utiliser l'ID approprié
        nom: user.nom_etudiant || user.nom_prof      // Utiliser le nom approprié
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3h"
      }
    );

    let userDetails = {}
    // Récupérer les informations spécifiques à l'utilisateur (étudiant ou professeur)
    if(user.nom_prof){
      const langue = await prisma.langue.findUnique({
        where: {
          id_langue: user.id_langue
        }
      });

      userDetails = {
        id: user.id_prof,
        nom: user.nom_prof,
        prenom:  user.prenom_prof,
        email: user.mail_prof,
        role: "ENSEIGNANT" ,
        langue : langue.nom_langue,
        id_langue: user.id_langue
      };
    }else{
      userDetails = {
        id: user.id_etudiant,
        nom: user.nom_etudiant,
        prenom: user.prenom_etudiant,
        email: user.e_mail,
        role:"ETUDIANT",
        prof: user.id_prof
      };
    }

    // Retourner la réponse avec le token et les informations utilisateur
    res.json({
      token,
      user: userDetails
    });

  } catch (error) {
    console.error('Erreur de connexion :', error);
    res.status(400).json({ message: error.message });
  }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Déconnexion réussie" });
}