import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@domain/entities/User';

@Entity('users')
export class UserSchema {
  @PrimaryColumn('uuid')
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public email!: string;

  @Column()
  public password!: string;

  @CreateDateColumn({
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp',
    name: 'created_at',
    default: () => (process.env.NODE_ENV === 'test' ? "datetime('now')" : 'CURRENT_TIMESTAMP'),
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: process.env.NODE_ENV === 'test' ? 'datetime' : 'timestamp',
    name: 'updated_at',
    default: () => (process.env.NODE_ENV === 'test' ? "datetime('now')" : 'CURRENT_TIMESTAMP'),
    onUpdate: process.env.NODE_ENV === 'test' ? undefined : 'CURRENT_TIMESTAMP',
  })
  updatedAt!: Date;

  toDomain(): User {
    return new User(this.id, this.name, this.email, this.password);
  }

  static fromDomain(user: User): UserSchema {
    const userSchema = new UserSchema();

    userSchema.id = user.id;
    userSchema.name = user.name;
    userSchema.email = user.email;
    userSchema.password = user.password;

    return userSchema;
  }
}
