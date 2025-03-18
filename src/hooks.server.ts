import type { Handle  } from "@sveltejs/kit";
import { drizzle, type AnyD1Database } from "drizzle-orm/d1";

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = drizzle(event.platform?.env.DB as AnyD1Database);
  return await resolve(event);
};