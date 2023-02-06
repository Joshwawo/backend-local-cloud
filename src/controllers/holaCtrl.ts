import { Request, Response, NextFunction } from "express";
import mineType from 'mime-types'
import path from "node:path";
import fs from 'node:fs';
import processPath from '../lib/path'
import moveFile from '../lib/moveFile'

export const HolaController = (_:Request, res:Response)=>{
  res.json({message: 'Hola como estas'})
}

export const contentCtrl = async (req: Request, res: Response, next:NextFunction) => {
  try {
    const dirPath = processPath(req.params.path);
    const dir = await fs.promises.opendir(dirPath.absolutePath);
    const content = { files: [], directories: [] };

    for await (const dirent of dir) {
      if (dirent.isDirectory()) {
        content.directories.push(dirent.name as never);
      } else {
        content.files.push(dirent.name as never);
      }
    }
    content.directories.sort()
    content.files.sort()

    res.json({ path: dirPath.relativePath, content, success: true });
  }
  catch (err) {
    next(err);
  }
};

export const dirCtrl = async (req: Request, res: Response, next:NextFunction) => {
  const dirPath = processPath(req.params.path);
  console.log(dirPath)
  console.log(req.body)
  const name = req?.body?.name;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'No name was specified',
    });
  }

  try {
    await fs.promises.mkdir(path.join(dirPath.absolutePath, name));
  } catch (e) {
    return next(e);
  }

  res.json({ success: true, message: 'Directory created' });
}

export const uploadFilesCtrl = async (req: Request, res: Response, next:NextFunction) => {
  if (!req.files) {
    return res.status(400).json({
      success: false,
      message: 'No files were uploaded'
    });
  }

  const dirPath = processPath(req.params.path);
  let files = req.files.file;
  if (!Array.isArray(files)) {
    files = [files];
  }

  try {
    for (const file of files) {
      await moveFile(file, dirPath.absolutePath);
    }
  } catch (err:any) {
    // Sys error
    if (err.code) {
      return next(err);
    }

    return res.status(400).json({
      success: false,
      message: err.message,
      path: dirPath.relativePath
    });
  }

  res.json({
    success: true,
    message: 'Files successfully uploaded',
    path: dirPath.relativePath
  });
};

export const downloadFilesCtrl = async (req: Request, res: Response, next:NextFunction) => {
  try {
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
