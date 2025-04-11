import { texts } from "$lib/server/db";
import { texts as t } from "$lib/text"
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  let textsFromDb = await locals.db.select().from(texts).all();

  if (textsFromDb.length === 0) {
    textsFromDb = await locals.db
      .insert(texts)
      .values(t.map((t) => ({ ...t, id: undefined })))
      .returning()
      .all();
  }

  return {
    texts: textsFromDb,
    user: locals.user,
  };
};