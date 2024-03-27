import authControllers from './auth';
import userControllers from './users';
import shipmentControllers from './shipments';

const controllers = [
  ...authControllers,
  ...userControllers,
  ...shipmentControllers
];

export default controllers;