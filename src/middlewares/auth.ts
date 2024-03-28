import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { CONFIG } from "../configs/config";

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const decode = jwt.verify(token, CONFIG.JWT_SECRET);
  if (!decode) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};