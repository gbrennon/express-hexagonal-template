import { v4 as uuid4 } from "uuid";

import { NewUserFactory } from "@domain/ports/NewUserFactory";
import { User } from "@domain/entities/User";

export class UuidNewUserFactory implements NewUserFactory {
  public async create(
    name: string, email: string, password: string
  ): Promise<User> {
    const generatedId = uuid4();

    return new User(generatedId, name, email, password);
  }
}
