import processPath from "../lib/path";
import fs  from "node:fs";
import path from 'node:path'
import moveFile from '../lib/moveFile';

export const contentServ = async (path: string) => {
  let regex = path?.replace(/undefined/g, "");
  const dirPath = processPath(regex)
  
  
  const dir = await fs.promises.opendir(dirPath.absolutePath);
  const content = { files: [], directories: [] };

  for await (const dirent of dir) {
    if (dirent.isDirectory()) {
      content.directories.push(dirent.name as never);
    } else {
      content.files.push(dirent.name as never);
    }
  }
  content.directories.sort();
  content.files.sort();
  return { path: dirPath.relativePath, content, success: true };
};

export const dirServ = async (pathName: string, name: string) => {
  const dirPath = processPath(pathName);
  if (!name) {
    const error = new Error("No name was specified");
    error.cause = 404;
    return error
  }
 
  await fs.promises.mkdir(path.join(dirPath.absolutePath, name));
  return { success: true, message: "Directory created" };

}

export const deleteServ = async (pathName: string) => {
  const dirPath = processPath(pathName);
  await fs.promises.rm(dirPath.absolutePath, { recursive: true });
  return { success: true, message: "File or directory deleted" };
}

export const uploadFilesServ = async (pathName: string, filesx: any) => {
  if (!filesx) {
    const error = new Error("No files were uploaded");
    error.cause = 404;
    return error
    
  }

  const dirPath = processPath(pathName);
  let files = filesx.file;
  if (!Array.isArray(files)) {
    files = [files];
  }

  try {
    for (const file of files) {
      await moveFile(file, dirPath.absolutePath);
    }
  } catch (err:any) {
    throw err;
 
  }

  return{
    success: true,
    message: 'Files successfully uploaded',
    path: dirPath.relativePath
  };
}

export const changeNameFileSrv = async (pathName: string, name: string) => {
  const dirPath = processPath(pathName);
  if (!name) {
    const error = new Error("No name was specified");
    error.cause = 404;
    return error
  }
  const newPath = path.join(dirPath.absolutePath, "..", `${name}.${pathName.split(".")[1]}`);
  await fs.promises.rename(dirPath.absolutePath, newPath);
  return { success: true, message: "File or directory renamed" };
}