import { Router } from "express";
import { paySubscribeProf } from "../controllers/ProfController.js";

const router = Router();

router.post('/subscribe',paySubscribeProf)

export default router;