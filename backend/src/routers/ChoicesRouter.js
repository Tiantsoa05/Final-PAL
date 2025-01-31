import { Router } from "express";
import { choisirProf, classNiveau } from "../controllers/ChoicesController.js";


const router = Router()

router.post('/choix_prof',choisirProf)
router.post('/niveau',classNiveau)

export default router