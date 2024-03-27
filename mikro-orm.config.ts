import { defineConfig } from '@mikro-orm/core';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import 'dotenv/config';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('tsconfig-paths').register(); // to allow relationships on running migrations

export default defineConfig({
  extensions: [Migrator],
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  driver: PostgreSqlDriver,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  migrations: {
    path: path.resolve(__dirname, './src/migrations'),
    pathTs: './src/migrations',
  },
});
