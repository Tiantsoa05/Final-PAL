import { Router} from "express";
import { getFollowersNumber, getFollowerStudents, getUserById } from "../controllers/StudentControllers.js";

const router = Router();

router.get('/followers/:id_prof', getFollowerStudents)
router.get('/number/:id_prof',getFollowersNumber)
router.get('/get/:id_etudiant',getUserById)

export default router