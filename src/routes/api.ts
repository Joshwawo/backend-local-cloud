import { Router } from "express";
import fileUpload from 'express-fileupload'
import { HolaController,contentCtrl,uploadFilesCtrl,dirCtrl } from "../controllers/holaCtrl";

const router = Router()
router.use(fileUpload())
router.get('/', HolaController)
router.get('/content/:path?', contentCtrl)
router.post('/dir/:path?', dirCtrl)
router.post('/upload/:path?', uploadFilesCtrl)
router.get('/download/:path?', contentCtrl)

export{router}