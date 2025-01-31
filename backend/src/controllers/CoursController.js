import { PrismaClient } from "@prisma/client";
import path from 'path'
import fs from 'fs'

const prisma = new PrismaClient()

const giveFiletype = (ext, allowedTypes) => {
    const typeMap = {
        [allowedTypes[0]]: "pdf",
        [allowedTypes[1]]: "video",
        [allowedTypes[2]]: "audio",
    };

    return typeMap[ext] || "image";
};



export const getAllCourses = async(req,res)=>{
    const {id_prof} = req.params
    try{
        const courses= await prisma.cours.findMany({
            where:{
                id_professeur: parseInt(id_prof)
            }
        })
        res.status(200).json(courses)
    }catch(error){
        console.error('Erreur  :', error);
        res.status(400).json({ message: error.message });
    }
}

export const choixCours = async (req,res)=>{
    
}

export const getProfCoursesNumber = async (req,res)=>{
    const {id_prof} = req.params

    const coursesNumber = await prisma.cours.count({
        where:{
            id_professeur: parseInt(id_prof)
        }
    })

    res.status(200).json({numberCourses:coursesNumber})
}

export const createCourse = async (req,res)=>{

    const {titre,id_langue,id_prof} = req.body

    const fichier = req.file

    if (!fichier) {
        return res.status(400).send({ errorMessage: "Aucun fichier uploadé." });
    }

    try {

        const owner = await prisma.professeur.findUnique({
            where:{
                id_prof: parseInt(id_prof)
            }
        })

        const fileSize = fichier.size; 
        const ext = path.extname(fichier.originalname).toLowerCase(); 
        const fileName = `${fichier.filename}`;
        const allowedTypes = ['.pdf', '.mp4', '.mp3', '.jpeg', '.jpg'];

        let TypeFilePath = null

        TypeFilePath = giveFiletype(ext,allowedTypes)

        const fichierPath = path.resolve(
            path.dirname('uploads'),
            'uploads',
            `${owner.nom_prof.toLocaleLowerCase()}_${owner.prenom_prof.toLocaleLowerCase()}`,
            TypeFilePath,
            fileName
        );
        
        // const url = `${req.protocol}://${req.get("host")}/assets/fournisseur/${fileName}`;

        if (!allowedTypes.includes(ext.toLowerCase())) {
            fs.unlink(fichier.path, (err) => {
                if (err) {
                    console.error("Erreur lors de la suppression du fichier:", err);
                }
            });
            return res.status(400).json({ messageError: "Fichier invalide" });
        }
        if (fileSize > 50000000) {
            fs.unlink(fichier.path, (err) => {
                if (err) {
                    console.error("Erreur lors de la suppression du fichier:", err);
                }
            });
            return res.status(400).json({ messageError: "Image devrait être moins de 50 MB" });
        }

        const dir = path.dirname(fichierPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.rename(fichier.path, fichierPath, async (err) => {
            if (err) return res.status(500).json({ messageError: err.message });

            try {
                await prisma.cours.create({
                    data: {
                        contenu_cours: fichierPath,
                        titre,
                        id_langue: parseInt(id_langue),
                        id_professeur: parseInt(id_prof)
                    }
                });
                res.status(200).send({ messageSuccess: "Cours ajouté avec succès" });
            } catch (error) {
                fs.unlink(fichier.path).catch(console.error)
                res.status(500).send({ messageError: "Erreur de connexion" });
                console.error(error);
            }
        });

    } catch (error) {
        fs.unlink(fichier.path, (err) => {
            if (err) {
                console.error("Erreur lors de la suppression du fichier:", err);
            }
        });
        res.status(500).send({ errorMessage: "Internal server error" });
        console.error(error);
    }
}

export const deleteCourse = async (req,res)=>{
    const {id} = req.params

    try{
        const  actualCourse = await prisma.cours.findUnique({
            where:{
                id: parseInt(id)
            }
        })

        if(!actualCourse){

            return res.status(401).json({errorMessage: "Cours à supprimer introuvable"})

        }

        const suppr = await prisma.cours.delete({
            where:{
                id: parseInt(id)
            }
        })

    //    fs.unlink(actualCourse.contenu_cours).catch(error=>console.log({error}))

        return res.status(200).json({deleteSuccess: true, message: " Suppression de cours réussie "})

    }catch(error){

        return res.status(401).json({errorMessage: "Erreur lors de la suppression de cours", error})

    }
}

export const modifCourse = async (req,res)=>{
    const {id} = req.params
    const {titre,id_langue,id_prof} = req.body

    const fichier = req.file

    console.log(req.body, fichier)

    try {
        if (!fichier) {
            return res.status(400).json({ errorMessage: "Aucun fichier uploadé." });
        }

        const cours = await prisma.cours.findUnique({
            where: { id: parseInt(id) },
        });

        if (!cours) {
            return res.status(404).json({ errorMessage: "Cours à modifier introuvable." });
        }

        // Supprimer l'ancien fichier s'il existe
        // if (cours.contenu_cours) {
        //     fs.unlink(cours.contenu_cours, (err) => {
        //         if (err) {
        //             console.error("Erreur lors de la suppression de l'ancien fichier:", err);
        //         }
        //     });
        // }

        const ext = path.extname(fichier.originalname).toLowerCase();
        const allowedTypes = [".pdf", ".docx", ".pptx"]; // Ajoutez les extensions autorisées ici

        if (!allowedTypes.includes(ext)) {
            fs.unlink(fichier.path, (err) => {
                if (err) {
                    console.error("Erreur lors de la suppression du fichier non valide:", err);
                }
            });
            return res.status(400).json({ errorMessage: "Type de fichier invalide." });
        }

        const owner = await prisma.professeur.findUnique({
            where: { id_prof: parseInt(id_prof) },
        });

        if (!owner) {
            fs.unlink(fichier.path, (err) => {
                if (err) {
                    console.error("Erreur lors de la suppression du fichier:", err);
                }
            });
            return res.status(404).json({ errorMessage: "Professeur introuvable." });
        }

        const newFilePath = path.resolve(
            "uploads",
            `${owner.nom_prof.toLowerCase()}_${owner.prenom_prof.toLowerCase()}`,
            ext.replace(".", ""), // Créer un sous-dossier basé sur le type de fichier
            fichier.originalname
        );

        const dir = path.dirname(newFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        // Déplacer le fichier uploadé
        fs.rename(fichier.path, newFilePath, async (err) => {
            if (err) {
                return res.status(500).json({ errorMessage: "Erreur lors du déplacement du fichier.", error: err.message });
            }

            try {
                // Mettre à jour les données du cours
                const updatedCourse = await prisma.cours.update({
                    where: { id: parseInt(id) },
                    data: {
                        id_professeur: parseInt(id_prof),
                        id_langue: parseInt(id_langue),
                        titre,
                        contenu_cours: newFilePath,
                    },
                });

                return res.status(200).json({ messageSuccess: "Cours modifié avec succès.", course: updatedCourse });
            } catch (dbError) {
                console.error("Erreur lors de la mise à jour du cours:", dbError);
                return res.status(500).json({ errorMessage: "Erreur interne du serveur.", error: dbError.message });
            }
        });
    } catch (error) {
        console.error("Erreur lors de la modification du cours:", error);
        return res.status(500).json({ errorMessage: "Erreur interne du serveur.", error: error.message });
    }
}