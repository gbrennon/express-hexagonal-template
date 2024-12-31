import express, { Express } from 'express';
import request from 'supertest';
import { createUserRoute } from '@infrastructure/routes/userRoutes';
import { CreateUserService } from '@application/create-user';
import { DependencyContainer } from '@infrastructure/di/DependencyContainer';
import { mock, instance, when, verify, anything } from 'ts-mockito';

describe('POST /users route', () => {
  let app: Express;
  let mockCreateUserService: CreateUserService;
  let mockContainer: DependencyContainer;

  beforeEach(() => {
    // Mocking the CreateUserService
    mockCreateUserService = mock<CreateUserService>();
    when(mockCreateUserService.execute(anything())).thenReturn(Promise.resolve({ id: 'some-id' }));

    // Mock the DependencyContainer to return the mocked CreateUserService
    mockContainer = mock(DependencyContainer);
    when(mockContainer.resolve<CreateUserService>('CreateUserService')).thenReturn(instance(mockCreateUserService));

    // Create the express app and inject the route
    app = express();
    app.use(express.json());
    app.use(createUserRoute(instance(mockContainer)));
  });

  it('should call CreateUserController.handle when POST /users is invoked', async () => {
    // Simulate a POST request to /users
    const response = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password' });

    // Verify that the service's execute method was called once
    verify(mockCreateUserService.execute(anything())).once();

    // Verify the correct status and response body
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 'some-id' });
  });

  it('should return a 500 if an error occurs', async () => {
    // Simulate an error in the service layer
    when(mockCreateUserService.execute(anything())).thenReject(new Error('Service error'));

    const response = await request(app)
      .post('/users')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Service error' });
  });
});

