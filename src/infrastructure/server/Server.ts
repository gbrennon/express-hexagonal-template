import express, { Application } from 'express';
import morgan from 'morgan';
import logger from '../logger/Logger';  // Correct path to your logger file
import { registerDependencies } from '../di/register-dependencies';
import { DependencyContainer } from '../di/DependencyContainer';
import { createUserRoute } from '../routes/userRoutes'; // Import the route

export class Server {
  private expressApp: Application;
  private port: number;
  private container: DependencyContainer;
  private server?: any;

  constructor(port: number) {
    this.expressApp = express();
    this.port = port;
    this.container = new DependencyContainer();
  }

  public getApp(): Application {
    return this.expressApp;
  }

  public async start(): Promise<void> {
    try {
      await this.initializeDependencies();
      this.initializeMiddlewares();
      this.initializeRoutes();

      this.server = this.expressApp.listen(this.port, () => {
        logger.info(`Server is running on http://localhost:${this.port}`);
      });
    } catch (error) {
      logger.info('Error starting the application:', error);
      process.exit(1);
    }
  }

  public async close(): Promise<void> {
    if (this.server) {
      await new Promise<void>((resolve, reject) => {
        this.server.close((err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  }

  private async initializeDependencies(): Promise<void> {
    await registerDependencies(this.container);
  }

  private initializeMiddlewares(): void {
    this.expressApp.use(express.json());
    this.expressApp.use(morgan('combined', {
      stream: { write: (message: string) => logger.info(message.trim()) }
    }));
  }

  private initializeRoutes(): void {
    // Use the user routes from the new file
    this.expressApp.use(createUserRoute(this.container));
  }
}
