import { sign } from 'jsonwebtoken';
import { hashSync, compareSync } from 'bcrypt';

const { JWT_SECRET = "" } = process.env;

export const encryptPassword = (password: string) => {
  return hashSync(password, 12);
}

export const comparePassword = (hashPassword: string, password: string) => {
  return compareSync(password, hashPassword);
}

export const generateToken = (payload: any) => {
  return sign(payload, process.env.JWT_SECRET || "", { expiresIn: "1d" });
}
