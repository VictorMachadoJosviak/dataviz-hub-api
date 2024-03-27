import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import * as crypto from 'crypto';

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
}
