import { Router } from "express";
import { 
    getEtudiants, 
    getLanguages, 
    getProfessorById, 
    getProfessors, 
    getProfessorsByLevel 
} from "../controllers/Admin/AdminController.js";
import { getFollowerStudents } from "../controllers/StudentControllers.js";

const router = Router()

router.get('/lang',getLanguages)
router.get('/stud',getEtudiants)
router.get('/profs',getProfessors)
router.post('/profs/niveau', getProfessorsByLevel)
router.get('/stud/followers/:id_prof',getFollowerStudents)
router.get('/prof/:id',getProfessorById)

export default router