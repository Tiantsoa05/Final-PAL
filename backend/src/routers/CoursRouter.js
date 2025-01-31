import {Router} from 'express'
import { 
    createCourse, 
    deleteCourse, 
    getAllCourses, 
    getProfCoursesNumber, 
    modifCourse
} from '../controllers/CoursController.js'
import multer from 'multer'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const uploadDir = path.join(__dirname,'..','..','uploads');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,uploadDir)
    }, 
    filename: (req,file,cb)=>{
        const ext = path.extname(file.originalname).toLowerCase()
        const fileName = `${file.originalname.toLowerCase().replace(' ','_')}${Date.now()}${ext}`;
        cb(null, fileName);
    }
})

const upload = multer({ storage });

const router = Router()

router.get('/number/:id_prof',getProfCoursesNumber)
router.get('/all/:id_prof',getAllCourses)
router.post('/new', upload.single('fichier'),createCourse)
router.post('/update/:id',upload.single('fichier'),modifCourse)
router.get('/delete/:id',deleteCourse)

export default router