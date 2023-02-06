const manageErr = (err: { code: any; message: any; statusCode: any; }, settings: { code: any; message: any; statusCode: any; }) => {
  if (err.code !== settings.code) {
    return false;
  }
  err.message = settings.message;
  err.statusCode = settings.statusCode;

  return true;
};

export  {manageErr};