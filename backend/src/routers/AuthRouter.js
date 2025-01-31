import { Router } from "express";
import { login, register } from "../controllers/Etudiants/AuthController.js";
import { loginProf, registerProf } from "../controllers/Profs/AuthController.js";

const router = Router()

router.post('/register',register)
router.post("/login", login)
router.post('/prof/register',registerProf)
router.post('/prof/login',loginProf)

export default router