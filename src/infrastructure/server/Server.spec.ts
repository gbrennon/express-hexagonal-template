import request from 'supertest';
import { Server } from './Server';

describe('Server Integration Tests', () => {
  let server: Server;

  beforeAll(async () => {
    // Start the server with a dynamic port (0 will let the OS pick an available port)
    server = new Server(0);
    await server.start();
  });

  afterAll(async () => {
    // Close the server after tests are completed to free the port
    await server.close();
  });

  it('should create a user and return 201', async () => {
    const response = await request(server.getApp()) // Use the express app from the Server instance
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });

    // Assert that the response status is 201 (Created)
    expect(response.status).toBe(201);
  });

  it('should handle invalid user creation request', async () => {
    const response = await request(server.getApp()) // Use the express app from the Server instance
      .post('/users')
      .send({
        name: '',  // Invalid name (empty)
        email: 'invalid-email',  // Invalid email
        password: 'short',  // Invalid password (too short)
      });

    // Assert that the response status is 400 (Bad Request) or whatever error is expected
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
