import { Request, Response, NextFunction } from "express";
import { HttpMethodType } from "../types/common";

interface Controller {
  method(): HttpMethodType;
  isPrivate(): boolean;
  path(): string;
  handler(
    req: Request,
    res: Response,
    next: NextFunction
  ) : Promise<void>,
}

export default Controller;
