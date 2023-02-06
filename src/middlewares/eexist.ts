import {manageErr} from './base'

const eexist = (err: { code: any; message: any; statusCode: any; }, req: any, res: any, next: (arg0: any) => void) => {
  manageErr(err, {
    code: 'EEXIST',
    message: 'Directory already exists',
    statusCode: 400,
  });
  next(err);
};

export default eexist;