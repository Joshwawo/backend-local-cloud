import {Request, Response, NextFunction} from 'express'
import {manageErr} from './base'


const eexist = (err: { code: any; message: any; statusCode: any; }, req: Request, res: Response, next: NextFunction) => {
  manageErr(err, {
    code: 'EEXIST',
    message: 'Directory already exists',
    statusCode: 409,
  });
  next(err);
};

export default eexist;