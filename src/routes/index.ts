import { Router } from 'express';
import controllers from '../controllers';
import Controller from '../controllers/controller';
import { authentication } from '../middlewares/auth';

const router: Router = Router();

controllers.forEach(controller => {
  const instance = new controller as Controller;
  
  if (instance.isPrivate()) {
    console.log('This is a private method..');
  }
  else {
    if (instance.isOpen()) {
      router[instance.method()](instance.path(), instance.handler);
    }
    else {
      router[instance.method()](instance.path(), authentication, instance.handler);
    }
  }
});

export default router;
