import { EntityManager } from "typeorm";

import { UserRepository } from "@domain/ports/UserRepository";
import { User } from "@domain/entities/User";
import UserSchema from "@infrastructure/schemas/user-schema";

export class TypeORMUserRepository implements UserRepository {
  constructor(
    private readonly entityManager: EntityManager
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const schema = await this.entityManager.findOne(
      UserSchema,
      { where: { email: email } }
    );

    if (!schema) {
      return null;
    }

    return schema.toDomain();
  }

  async save(user: User): Promise<void> {
    const schema = UserSchema.fromDomain(user);

    await this.entityManager.save(schema);
  }
}
