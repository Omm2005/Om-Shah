import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const isRemote = process.env.DATABASE_URL?.startsWith("libsql://");

export default defineConfig(
  isRemote
    ? {
        schema: "./db/schema.ts",
        out: "./drizzle",
        dialect: "turso",
        dbCredentials: {
          url: process.env.DATABASE_URL!,
          authToken: process.env.DATABASE_AUTH_TOKEN,
        },
      }
    : {
        schema: "./db/schema.ts",
        out: "./drizzle",
        dialect: "sqlite",
        dbCredentials: {
          url: "sqlite.db",
        },
      }
);
