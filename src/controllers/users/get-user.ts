import { Request, Response } from 'express';
import Controller from '../controller';
import { HttpMethodType } from '../../types/common';
import { User } from '../../entity/User';
import { AppDataSource } from '../../data-source';
import { errorResponse, successResponse } from '../../utils/api-utils';

class GetUserController implements Controller {
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
    return "/users/:userId";
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;
    try {
      if (!userId) {
        errorResponse(res, { message: "userId is required" });
        return;
      }
      const userRepository = AppDataSource.getRepository(User);
      const result = await userRepository.findOne(
        { 
          where: { user_id: userId },
          select: {
            first_name: true,
            last_name: true,
            email: true,
            address: true,
            phone: true,
          }
        });
      successResponse(res, result);
    }
    catch(error: any) {
      console.error(error);
      errorResponse(res, { code: error.code, message: error.detail });
    }
  }

}

export default GetUserController;