import { CreateUserService } from '@application/create-user';
import { CreateUserController } from './CreateUserController';
import { Request, Response } from 'express';
import { mock, instance, when, anything } from 'ts-mockito';

describe('CreateUserController', () => {
  let createUserService: CreateUserService;
  let controller: CreateUserController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    createUserService = mock(CreateUserService);
    controller = new CreateUserController(instance(createUserService));

    req = {
      body: {}
    } as Partial<Request>;

    res = {
      status: jest.fn().mockReturnThis() as unknown as Response['status'],
      json: jest.fn()
    } as Partial<Response>;
  });

  describe('handle', () => {
    it('should return 400 if validation fails', async () => {
      req.body = {
        name: '',
        email: 'invalid-email',
        password: 'short'
      };

      await controller.handle(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Validation failed',
        errors: expect.any(Array)
      });
    });

    it('should return 201 if the user is created', async () => {
      req.body = {
        name: 'John Doe',
        email: 'john.doe@email.com',
        password: 'password'
      };
      const userId = '123e4567-e89b-12d3-a456-426614174000';

      when(createUserService.execute(anything())).thenResolve({
        id: userId
      });

      await controller.handle(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: userId,
      });
    });

    it('should return 500 if an error occurs', async () => {
      req.body = {
        name: 'John Doe',
        email: 'john.doe@email.com',
        password: 'password'
      };

      when(createUserService.execute(anything())).thenReject(new Error('Service error'));

      await controller.handle(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Service error'
      });
    });
  });
});

