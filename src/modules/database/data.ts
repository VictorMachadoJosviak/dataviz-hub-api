import * as crypto from 'crypto';

export const users = [
  {
    id: crypto.randomUUID(),
    username: 'john',
    password: 'changeme',
  },
  {
    id: crypto.randomUUID(),
    username: 'maria',
    password: 'guess',
  },
];
