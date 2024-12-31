// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// process.env.NODE_ENV = 'test';

import { Server } from '@infrastructure/server/Server';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Create a new instance of the Server
const server = new Server(PORT);

// Start the server
server.start().catch((error) => {
  console.error('Failed to start the server:', error);
  process.exit(1);
});

// Gracefully handle shutdown signals
process.on('SIGTERM', async () => {
  console.info('SIGTERM signal received. Closing the server gracefully...');
  await server.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.info('SIGINT signal received. Closing the server gracefully...');
  await server.close();
  process.exit(0);
});
