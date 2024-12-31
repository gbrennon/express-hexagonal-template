import { DependencyContainer } from "./DependencyContainer";
import { TypeORMUserRepository } from "@infrastructure/repositories/user-repository/TypeORMUserRepository";
import { CreateUserService } from "@application/create-user";
import UuidNewUserFactory from "@infrastructure/factories/new-user-factory";
import BCryptPasswordHasher from "@infrastructure/hasher/password-hasher";
import AppDataSource from "@infrastructure/config/app-data-source";

async function registerDependencies(
  container: DependencyContainer
): Promise<void> {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  const entityManager = AppDataSource.manager;

  const userRepository = new TypeORMUserRepository(entityManager);

  const createUserService = new CreateUserService(
    userRepository,
    new BCryptPasswordHasher(),
    new UuidNewUserFactory()
  );

  container.register('CreateUserService', createUserService);
}

export { registerDependencies };
