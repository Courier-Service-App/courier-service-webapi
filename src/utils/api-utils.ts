import { Response } from "express"

export const successResponse = (res: Response, result: any) => {
  return res.status(200).json(result);
}

export const notFoundResponse = (res: Response, message: string) => {
  return res.status(404).json({ message: message });
}

export const unauthorizedResponse = (res: Response, message: string) => {
  return res.status(401).json({ message: message });
}

export const errorResponse = (res: Response, error: any) => {
  return res.status(500).json(error);
}