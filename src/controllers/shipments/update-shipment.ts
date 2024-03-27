import { Request, Response } from 'express';
import Controller from '../controller';
import { HttpMethodType } from '../../types/common';
import { Shipment } from '../../entity/Shipment';
import { AppDataSource } from '../../data-source';
import { errorResponse, successResponse } from '../../utils/api-utils';

class UpdateShipmentController implements Controller {
  public method = (): HttpMethodType => {
    return "put";
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public isOpen = (): boolean => {
    return false;
  }

  public path = (): string => {
    return "/shipments/:shipmentId";
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    const { sender_name, sender_address, recipient_name, recipient_address, details, status } = req.body;
    const { shipmentId } = req.params;
    try {
      if (!shipmentId) {
        errorResponse(res, { message: "shipmentId is required" });
        return;
      }

      const shipment = new Shipment();
      shipment.sender_name = sender_name;
      shipment.sender_address = sender_address;
      shipment.recipient_name = recipient_name;
      shipment.recipient_address = recipient_address;
      shipment.details = details;
      shipment.status = status;

      const shipmentRepository = AppDataSource.getRepository(Shipment);
      const { affected } = await shipmentRepository.update({ shipment_id: shipmentId }, shipment);
      successResponse(res, affected ? true : false);
    }
    catch(error: any) {
      console.error(error);
      errorResponse(res, { code: error.code, message: error.detail });
    }
  }
}

export default UpdateShipmentController;