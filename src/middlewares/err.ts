import {Request, Response, NextFunction} from 'express'

const err = (err: { statusCode: number; message: string, cause:number }, req: Request, res:Response, next: NextFunction) => {
  res.status(err.statusCode || err.cause || 500).json({
    message: err.message,
    success: false
  });
};

export default err;