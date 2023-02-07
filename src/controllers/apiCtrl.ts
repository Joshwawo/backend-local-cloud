import { Request, Response, NextFunction } from "express";
import mineType from 'mime-types'
import processPath from '../lib/path'
import {contentServ,dirServ,uploadFilesServ} from '../services/api.services'

export const HolaController = (_:Request, res:Response)=>{
  res.json({message: 'Hola como estas'})
}


export const contentCtrl = async (req: Request, res: Response, next:NextFunction) => {
  try {
    
    const response = await contentServ(req.params.path)
    res.json(response);
  }
  catch (err) {
    next(err)
  }
}


export const dirCtrl = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const response = await dirServ(req.params.path, req.body.name)
    if(response instanceof Error){
      return next(response)
    }
    res.json(response);
  }
  catch (err) {
    next(err)
  }
}



export const uploadFilesCtrl = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const response = await uploadFilesServ(req.params.path, req.files)
    if(response instanceof Error){
      return next(response)
    }
    res.json(response);
  }
  catch (err) {
    next(err)
  }
}


export const downloadFilesCtrl = async (req: Request, res: Response, next:NextFunction) => {
  try {
    console.log('downloadFilesCtrl')
    const file = processPath(req.params.path).absolutePath;
    const mimetype = mineType.lookup(file);
    console.log(mimetype);
    res.setHeader('Content-Disposition', `attachment; filename=${file}`);
    res.setHeader('Content-Type', mineType as any);
    res.download(file);
    
  } catch (err) {
    next(err);
  }
};


