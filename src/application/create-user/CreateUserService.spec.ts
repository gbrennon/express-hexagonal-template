import {mock, instance, when, verify, } from "ts-mockito";

import { CreateUserService } from "./CreateUserService";
import { UserRepository } from "@domain/ports/UserRepository";
import { PasswordHasher } from "@domain/ports/PasswordHasher";
import { NewUserFactory } from "@domain/ports/NewUserFactory";
import { User } from "@domain/entities/User";

describe("CreateUserService", () => {
  let createUserService: CreateUserService;
  let userRepository: UserRepository;
  let passwordHasher: PasswordHasher;
  let newUserFactory: NewUserFactory;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    passwordHasher = mock<PasswordHasher>();
    newUserFactory = mock<NewUserFactory>();

    createUserService = new CreateUserService(
      instance(userRepository),
      instance(passwordHasher),
      instance(newUserFactory)
    );
  });

  describe("execute", () => {
    const generatedId = "generatedId";
    const password = "password";
    const hashedPassword = "hashedPassword";
    const createdUser = new User(
      generatedId,
      "John Doe",
      "johndoe@gmail.com",
      hashedPassword
    );

    it("should return the user id", async () => {
      const input = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: password,
      };

      when(passwordHasher.hash(password)).thenResolve(hashedPassword);
      when(newUserFactory.create(
        "John Doe",
        "johndoe@gmail.com",
        hashedPassword
      )).thenResolve(createdUser);
      when(userRepository.save(createdUser)).thenResolve();

      const result = await createUserService.execute(input);

      const expectedResult = {
        id: generatedId,
      };
      expect(result).toEqual(expectedResult);
    });

    it("call PasswordHasher.hash with password", async () => {
      const password = "password";
      const input = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: password,
      };

      when(passwordHasher.hash(password)).thenResolve(hashedPassword);
      when(newUserFactory.create(
        "John Doe",
        "johndoe@gmail.com",
        hashedPassword
      )).thenResolve(createdUser);
      when(userRepository.save(createdUser)).thenResolve();

      await createUserService.execute(input);

      verify(passwordHasher.hash(password)).once();
    });

    it("should call NewUserFactory.create", async () => {
      const input = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: password,
      };

      when(passwordHasher.hash(password)).thenResolve(hashedPassword);
      when(newUserFactory.create(
        "John Doe",
        "johndoe@gmail.com",
        hashedPassword
      )).thenResolve(createdUser);
      when(userRepository.save(createdUser)).thenResolve();

      await createUserService.execute(input);

      verify(newUserFactory.create(
        "John Doe",
        "johndoe@gmail.com",
        hashedPassword
      )).once();
    });

    it("should call UserRepository.save", async () => {
      const input = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: password,
      };

      when(passwordHasher.hash(password)).thenResolve(hashedPassword);
      when(newUserFactory.create(
        "John Doe",
        "johndoe@gmail.com",
        hashedPassword
      )).thenResolve(createdUser);
      when(userRepository.save(createdUser)).thenResolve();

      await createUserService.execute(input);

      verify(userRepository.save(
        createdUser
      )).once();
    });

    it("should throw an error if the email is already in use", async () => {
      const input = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: password,
      };

      const error = new Error("Email already in use");
      when(passwordHasher.hash(password)).thenResolve(hashedPassword);
      when(newUserFactory.create(
        "John Doe",
        "johndoe@gmail.com",
        hashedPassword
      )).thenResolve(createdUser);
      when(userRepository.save(createdUser)).thenThrow(error);

      await expect(createUserService.execute(input)).rejects.toThrow(error);
    });
  });
});
