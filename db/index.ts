import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import { drizzle as drizzleBetter } from "drizzle-orm/better-sqlite3";
import { createClient } from "@libsql/client";
import Database from "better-sqlite3";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;
const databaseAuthToken = process.env.DATABASE_AUTH_TOKEN;

const client = databaseUrl
  ? createClient({
      url: databaseUrl,
      authToken: databaseAuthToken,
    })
  : new Database("sqlite.db");

export const db =
  client instanceof Database
    ? drizzleBetter(client, { schema })
    : drizzleLibsql(client, { schema });
