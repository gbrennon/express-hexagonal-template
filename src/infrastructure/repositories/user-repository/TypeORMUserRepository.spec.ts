import { DataSource } from 'typeorm';
import { TypeORMUserRepository } from './TypeORMUserRepository';
import getTypeOrmConfig from '@infrastructure/config/get-type-orm-config';
import UserSchema from '@infrastructure/schemas/user-schema';
import { User } from '@domain/entities/User';

describe('TypeORMUserRepository', () => {
  let dataSource: DataSource;
  let userRepository: TypeORMUserRepository;

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    const config = getTypeOrmConfig(true);

    dataSource = new DataSource(config);
    await dataSource.initialize();

    userRepository = new TypeORMUserRepository(dataSource.manager);
  });

  beforeEach(async () => {
    // Clear data from the `users` table before each test
    await dataSource.getRepository(UserSchema).clear();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('findByEmail', () => {
    it('should return null if the user is not found', async () => {
      const notUsedEmail = 'notUsed@email.com';

      const user = await userRepository.findByEmail(notUsedEmail);

      expect(user).toBeNull();
    });

    it('should return a user if it is found', async () => {
      const email = 'johndoe@email.com';
      await dataSource.getRepository(UserSchema).save({
        id: '1',
        name: 'John Doe',
        email,
        password: 'password',
      });

      const user = await userRepository.findByEmail(email);

      expect(user).toEqual(expect.objectContaining({
        id: '1',
        name: 'John Doe',
        email,
        password: 'password',
      }));
    });
  });

  describe('save', () => {
    it('should save a user', async () => {
      const userData = {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'password',
      };
      const user = new User(
        '1',
        'John Doe',
        'johndoe@email.com',
        'password',
      );

      await userRepository.save(user);

      const savedUser = await dataSource.getRepository(UserSchema).findOne({
        where: { id: userData.id },
      });

      expect(savedUser).toEqual(expect.objectContaining({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }));
    });

    it('should update a user', async () => {
      const userData = {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'password',
      };
      await dataSource.getRepository(UserSchema).save(userData);

      const newName = 'New Name';
      const newPassword = 'newpassword';
      const updatedUser = new User(
        userData.id,
        newName,
        'johndoe@email.com',
        newPassword,
      );

      await userRepository.save(updatedUser);

      const savedUser = await dataSource.getRepository(UserSchema).findOne({
        where: { id: userData.id },
      });

      expect(savedUser).toEqual(expect.objectContaining({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
      }));
    });

    it('should throw an error if email is already in use', async () => {
      const userData = {
        id: '1',
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: 'password',
      };
      await dataSource.getRepository(UserSchema).save(userData);

      const duplicateUser = new User(
        '2',
        'This should not be saved',
        'johndoe@email.com',
        'password',
      );

      await expect(userRepository.save(duplicateUser)).rejects.toThrow(/unique/i);
    });
  });
});
