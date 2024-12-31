import { registerDependencies } from './register-dependencies';
import { DependencyContainer } from './DependencyContainer';
import { CreateUserService } from '@application/create-user/CreateUserService';
import AppDataSource from '../config/app-data-source';

describe('registerDependencies Integration Test', () => {
  let container: DependencyContainer;

  beforeAll(async () => {
    container = new DependencyContainer();

    // Initialize the actual data source
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy(); // Clean up the data source
  });

  it('should register all dependencies correctly', async () => {
    await registerDependencies(container);

    const createUserService = container.resolve<CreateUserService>('CreateUserService');

    expect(createUserService).toBeInstanceOf(CreateUserService);
  });
});

