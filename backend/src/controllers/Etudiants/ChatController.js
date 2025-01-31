import { PrismaClient } from "@prisma/client";
import io from "../../tools/socket-io.js";


const prisma = new PrismaClient();

export const send = async (data) => {
    const {id_prof, id_etudiant, message, send_type} = data;

    try{
        const sent = await prisma.discuter.create(
            {
                data:{
                    message,
                    id_prof : parseInt(id_prof),
                    id_etudiant : parseInt(id_etudiant),
                    send_type
                }
            }
        )
    }catch(error){
        console.log(error)
    }
}

export const fetchDiscussion = async (req,res)=>{
    const {id_prof, id_etudiant} = req.body
    try{
        const messages = await prisma.discuter.findMany(
            {
                where:{
                    id_prof
                }
            }
        )
        res.status(200).json(messages)
    }catch(error){
        console.error('Erreur de connexion :', error);
        res.status(400).json({ message: error.message });
    }
}

export const fetchPersoDiscussion = async (req,res)=>{
    const {id_prof, id_etudiant} = req.body
    try{
        const messages = await prisma.discuter.findMany(
            {
                where:{
                    id_prof
                }
            }
        )
        res.status(200).json(messages)
    }catch(error){
        console.error('Erreur de connexion :', error);
        res.status(400).json({ message: error.message });
    }
}