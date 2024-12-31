import { Router } from 'express';
import { DependencyContainer } from '../di/DependencyContainer';
import { CreateUserService } from '@application/create-user';
import { CreateUserController } from '@presentation/controllers/create-user/CreateUserController';

export const createUserRoute = (container: DependencyContainer): Router => {
  const router = Router();
  
  const createUserService = container.resolve<CreateUserService>('CreateUserService');
  const createUserController = new CreateUserController(createUserService);

  router.post('/users', async (req, res, next) => {
    try {
      await createUserController.handle(req, res);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
