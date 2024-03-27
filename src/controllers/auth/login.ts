import { Request, Response } from 'express';;
import Controller from '../controller';
import { errorResponse, notFoundResponse, successResponse, unauthorizedResponse } from '../../utils/api-utils';
import { AppDataSource } from '../../data-source';
import { User } from '../../entity/User';
import { comparePassword, generateToken } from '../../utils/auth-utils';
import { HttpMethodType } from '../../types/common';

class LoginController implements Controller {
  public method = (): HttpMethodType => {
    return 'post';
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public isOpen = (): boolean => {
    return true;
  }

  public path = (): string => {
    return '/authenticate';
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        errorResponse(res, { message: "Email and password required" });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        notFoundResponse(res, "User not found");
      }
      else {
        const isPasswordValid = comparePassword(user.password, password);

        if (isPasswordValid) {
          const token = generateToken({ 
                user_id: user.user_id, 
                type: user.type,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
          });
          successResponse(
            res, 
            { 
              message: "Login successful",
              token 
            });
        }
        else {
          unauthorizedResponse(res, "Invalid password");
        }
      }
    }
    catch (error) {
      console.error(error);
      errorResponse(res, error);
    }
  }
}

export default LoginController;
