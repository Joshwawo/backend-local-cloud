import {manageErr} from './base'

const enoent = (err: { code: any; message: any; statusCode: any; }, req: any, res: any, next: (arg0: any) => void) => {
  manageErr(err, {
    code: 'ENOENT',
    message: 'File or directory does not exist',
    statusCode: 400,
  });
  next(err);
};

export default enoent;