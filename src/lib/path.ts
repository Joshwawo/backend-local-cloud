import path from 'node:path'
import storage from '../utils/storage'

const slash = process.platform === 'win32' ? '\\' : '/';

const getStoragePath = (urlPath: string) => {
  const relativePath = urlPath ? urlPath.replace(/--/g, slash) : slash;
  const absolutePath = path.join(String(storage), relativePath);

  return { relativePath, absolutePath };
}

export default getStoragePath