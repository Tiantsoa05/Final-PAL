import { Router } from "express";
import { fetchDiscussion, fetchPersoDiscussion } from "../controllers/Etudiants/ChatController.js";

const router = Router()

router.post('/discussions',fetchDiscussion)
router.post('/discussion/perso',fetchPersoDiscussion)

export default router