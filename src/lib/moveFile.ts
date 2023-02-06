import path from 'node:path'
import fs from 'node:fs'

const moveFile = (file: any, storagePath: any) => {

  const filePath = path.join(storagePath, file.name);

  return new Promise<void>((resolve, reject) => {
    fs.promises.access(filePath)
      .then(() => reject(new Error(`File ${file.name} already exists`)))
      .catch(() =>
        file.mv(filePath, (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        })
      );
  });
}

export default moveFile