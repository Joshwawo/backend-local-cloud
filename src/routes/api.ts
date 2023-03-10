import { Router } from "express";
import fileUpload from 'express-fileupload'
import { HolaController,contentCtrl,uploadFilesCtrl,dirCtrl ,downloadFilesCtrl,imgCtrl,deleteCtrl,changeNameFileCtrl} from "../controllers/apiCtrl";

const router = Router()
router.use(fileUpload())
router.get('/', HolaController)
router.get('/content/:path?', contentCtrl)
router.post('/dir/:path?', dirCtrl)
router.post('/upload/:path?', uploadFilesCtrl)
router.get('/download/:path?', downloadFilesCtrl)
router.get('/img/:path?', imgCtrl)
router.delete('/delete/:path?', deleteCtrl)
router.put('/rename/:path?', changeNameFileCtrl)

export{router}