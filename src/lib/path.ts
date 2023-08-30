import path from 'node:path'
import storage from '../utils/storage'

const slash = process.platform === 'win32' ? '\\' : '/';

const getStoragePath = (urlPath: string) => {
  const relativePath = urlPath ? urlPath.replace(/--/g, slash) : slash;
  if(storage){
    console.log("Hay storage", storage)
    const absolutePath = path.join(String(storage), relativePath);
    return { relativePath, absolutePath };
  }else{
    console.log("No hay storage", storage)
    const absolutePath = path.join(String("E:"), relativePath);
    return { relativePath, absolutePath };
  }

  // return { relativePath, absolutePath };
}

export default getStoragePath