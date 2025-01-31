import {Router} from 'express'
import { createAgenda, deleteProgram, listPrograms, setProgram } from '../controllers/Profs/AgendaController.js'

const router = Router()

router.get('/programs/:id_prof',listPrograms)
router.post('/new',createAgenda)
router.post('/set/:id_agenda',setProgram)
router.delete('/delete/:id_agenda',deleteProgram)

export default router