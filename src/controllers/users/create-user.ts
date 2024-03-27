import { Request, Response } from 'express';
import Controller from '../controller';
import { HttpMethodType } from '../../types/common';
import { User } from '../../entity/User';
import { AppDataSource } from '../../data-source';
import { errorResponse, successResponse } from '../../utils/api-utils';
import { encryptPassword } from '../../utils/auth-utils';

class CreateUserController implements Controller {
  public method = (): HttpMethodType => {
    return "post";
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public isOpen = (): boolean => {
    return false;
  }

  public path = (): string => {
    return "/users/create-user";
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    const { email, password, firstName, lastName, address, phone, type } = req.body;
    try {
      const user = new User();
      user.first_name = firstName;
      user.last_name = lastName;
      user.email = email;
      user.address = address;
      user.phone = phone;
      user.password = encryptPassword(password);

      if (type) {
        user.type = type;
      }

      const userRepository = AppDataSource.getRepository(User);
      const { user_id } = await userRepository.save(user);
      successResponse(res, { id: user_id });
    }
    catch(error: any) {
      console.error(error);
      errorResponse(res, { code: error.code, message: error.detail });
    }
  }
}

export default CreateUserController;