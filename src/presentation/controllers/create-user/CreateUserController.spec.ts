import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '@application/create-user';
import { CreateUserController } from './CreateUserController';
import { CreateUserHttpDTO } from './dtos/CreateUserHttpDTO';
import { mock, instance, when, anything } from 'ts-mockito';

describe('CreateUserController', () => {
  let controller: CreateUserController;
  let createUserService: CreateUserService;

  beforeEach(async () => {
    const mockedCreateUserService = mock(CreateUserService);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [{
        provide: CreateUserService,
        useValue: instance(mockedCreateUserService),
      }],
    }).compile();

    controller = module.get<CreateUserController>(CreateUserController);
    createUserService = instance(mockedCreateUserService);
  });

  describe('POST /users', () => {
    it('should return the id of the created user', async () => {
    });

    it('should call the service with the right parameters', async () => {
    });

    it('should return 201 status code', async () => {
    });

    it('should throw an error if the service throws an error', async () => {
    });
  });

});
