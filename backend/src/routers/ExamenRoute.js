import {Router} from 'express'
import { createExam, enonceExam } from '../controllers/ExamenController.js'

const router = Router()

router.get('/subject/:id_prof',enonceExam)
router.post('/new',createExam)

export default router