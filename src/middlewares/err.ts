const err = (err: { statusCode: any; message: any; }, req: any, res:any, next: any) => {
  console.log(err);
  res.status(err.statusCode || 500).json({
    message: err.message,
    success: false
  });
};

export default err;