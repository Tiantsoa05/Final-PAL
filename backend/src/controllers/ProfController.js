import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const paySubscribeProf = async (req,res) => {
    const {id_prof,id_etudiant,duree,montant}=req.body

    try{

      const paiement = await prisma.payerDroit.create({
        data:{
          id_etudiant: parseInt(id_etudiant),
          id_professeur: parseInt(id_prof),
          montant: parseFloat(montant),
          duree_cours:parseInt(duree)
        }
      })

      res.status(200).json({success:true, message: "Paiement d'abonnement réussi",paiement})

    }catch(error){

      return res.status(500).json({errorMessage: 'Paiement d\'abonnement échoué', error})

    }
};

