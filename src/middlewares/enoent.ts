import {Request, Response, NextFunction} from 'express'
import {manageErr} from './base'

const enoent = (err: { code: any; message: string; statusCode: number; }, _req: Request, _res: Response, next: NextFunction) => {
  manageErr(err, {
    code: 'ENOENT',
    message: 'File or directory does not exist',
    statusCode: 404,
  });
  next(err);
};

export default enoent;