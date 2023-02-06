const manageErr = (err: { code: number; message: string; statusCode: number; }, settings: { code: any; message: string; statusCode: any; }) => {
  if (err.code !== settings.code) {
    return false;
  }
  err.message = settings.message;
  err.statusCode = settings.statusCode;

  return true;
};

export  {manageErr};