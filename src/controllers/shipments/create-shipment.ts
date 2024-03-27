import { Request, Response } from 'express';
import Controller from '../controller';
import { HttpMethodType } from '../../types/common';
import { Shipment } from '../../entity/Shipment';
import { AppDataSource } from '../../data-source';
import { errorResponse, successResponse } from '../../utils/api-utils';

class CreateShipmentController implements Controller {
  public method = (): HttpMethodType => {
    return "post";
  }

  public isPrivate = (): boolean => {
    return false;
  }

  public path = (): string => {
    return "/shipments/create-shipment";
  }

  public handler = async (req: Request, res: Response): Promise<void> => {
    const { senderName, senderAddress, recipientName, recipientAddress, details, status, userId } = req.body;
    try {
      const trackingNumber = Math.floor(Math.random()*9000000) + 1000000;
      const shipment = new Shipment();
      shipment.tracking_number = trackingNumber.toString();
      shipment.sender_name = senderName;
      shipment.sender_address = senderAddress;
      shipment.recipient_name = recipientName;
      shipment.recipient_address = recipientAddress;
      shipment.details = details;
      shipment.status = status;
      shipment.created_by = userId;

      const shipmentRepository = AppDataSource.getRepository(Shipment);
      const { shipment_id, tracking_number } = await shipmentRepository.save(shipment);
      successResponse(res, { id: shipment_id, tracking_number: tracking_number });
    }
    catch(error: any) {
      console.error(error);
      errorResponse(res, { code: error.code, message: error.detail });
    }
  }
}

export default CreateShipmentController;