import { Request, Response } from 'express';
import Controller from '../controller';
import { HttpMethodType } from '../../types/common';
import { Shipment } from '../../entity/Shipment';
import { AppDataSource } from '../../data-source';
import { errorResponse, successResponse } from '../../utils/api-utils';

class GetAllShipmentsController implements Controller {
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
    return "/shipments/all-shipments";
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    try {
      const shipmentRepository = AppDataSource.getRepository(Shipment);
      const result = await shipmentRepository.find(
        {
          select: {
            shipment_id: true,
            sender_name: true,
            sender_address: true,
            recipient_name: true,
            recipient_address: true,
            details: true,
            status: true,
            tracking_number: true
          }
        });
      successResponse(res, { shipments: result });
    }
    catch(error: any) {
      console.error(error);
      errorResponse(res, { code: error.code, message: error.detail });
    }
  }

}

export default GetAllShipmentsController;