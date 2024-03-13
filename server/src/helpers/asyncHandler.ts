import { Request, Response, NextFunction } from "express";

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

/* this higher order function is used for handling 
async controller because of this we dont tave to write try catch.*/

function asyncHandler(callback: RequestHandler) {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(callback(req, res, next)).catch((err) => next(err));
  };
}

export { asyncHandler };
