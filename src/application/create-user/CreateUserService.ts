import { NewUserFactory } from "@domain/ports/NewUserFactory";
import { PasswordHasher } from "@domain/ports/PasswordHasher";
import { UserRepository } from "@domain/ports/UserRepository";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserOutput {
  id: string;
}

export class CreateUserService {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly newUserFactory: NewUserFactory
  ) {}

  public async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const { name, email, password } = input;
    const hashedPassword = await this.passwordHasher.hash(password);

    const user = await this.newUserFactory.create(name, email, hashedPassword);

    await this.userRepository.save(user);

    return {
      id: user.id,
    };
  }
}
