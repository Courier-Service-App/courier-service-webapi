import { sign } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';
import { CONFIG } from '../configs/config';

export const encryptPassword = (password: string) => {
  return hashSync(password, 12);
}

export const comparePassword = (hashPassword: string, password: string) => {
  return compareSync(password, hashPassword);
}

export const generateToken = (payload: any) => {
  return sign(payload, CONFIG.JWT_SECRET, { expiresIn: "1d" });
}
