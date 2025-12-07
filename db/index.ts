import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Provide a Postgres connection string.");
}

const client = postgres(databaseUrl, { max: 1 });

export const db = drizzle(client, { schema });
