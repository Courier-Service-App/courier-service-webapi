import { Request, Response } from 'express';
import Controller from '../controller';
import { HttpMethodType } from '../../types/common';
import { User } from '../../entity/User';
import { AppDataSource } from '../../data-source';
import { errorResponse, successResponse } from '../../utils/api-utils';

class GetAllUsersController implements Controller {
  public method = (): HttpMethodType => {
    return "get";
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public isOpen = (): boolean => {
    return false;
  }

  public path = (): string => {
    return "/users/all-users";
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const result = await userRepository.find(
        { 
          where: { type: "GENERAL" },
          select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            address: true,
            phone: true,
            type: true
          }
        });
      successResponse(res, { users: result });
    }
    catch(error: any) {
      console.error(error);
      errorResponse(res, { code: error.code, message: error.detail });
    }
  }

}

export default GetAllUsersController;