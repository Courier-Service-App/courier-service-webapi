import { Router } from 'express';
import controllers from '../controllers';
import Controller from '../controllers/controller';

const router: Router = Router();

controllers.forEach(controller => {
  const instance = new controller as Controller;
  
  if (instance.isPrivate()) {
    console.log('This is a private method..');
  } else {
    router[instance.method()](instance.path(), instance.handler);
  }
});

export default router;
