import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  client: ReturnType<typeof postgres> | undefined;
  db: PostgresJsDatabase<typeof schema> | undefined;
};

function makeDb(): PostgresJsDatabase<typeof schema> {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set. In Vercel, ensure the Postgres integration is installed and the env var is bound to this environment.");
  }
  const client =
    globalForDb.client ??
    postgres(connectionString, {
      prepare: false,
      max: 5,
    });
  if (process.env.NODE_ENV !== "production") {
    globalForDb.client = client;
  }
  return drizzle(client, { schema });
}

// Lazy proxy — connects only when accessed, not at module load.
// This lets builds (which collect page data) succeed even before
// DATABASE_URL is bound.
export const db = new Proxy({} as PostgresJsDatabase<typeof schema>, {
  get(_target, prop) {
    if (!globalForDb.db) globalForDb.db = makeDb();
    return Reflect.get(globalForDb.db, prop);
  },
});

export { schema };
