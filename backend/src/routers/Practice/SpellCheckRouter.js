import Router from 'express'
import { checkSpell } from '../../controllers/Practice/SpellController.js'

const router = Router()

router.post('/check',checkSpell)

export default router