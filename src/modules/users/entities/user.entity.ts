import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import * as crypto from 'crypto';
import { UserResponseDto } from '../dtos/response/user-response.dto';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid' })
  id: string = crypto.randomUUID();

  @Property()
  name: string;

  @Property()
  email: string;

  @Property()
  password: string;

  toDto(): UserResponseDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    };
  }
}
