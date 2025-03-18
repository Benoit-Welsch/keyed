import { texts } from "$lib/server/db";
import { texts as t } from "$lib/text"
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {

  // locals.db
  //   .insert(texts)
  //   .values(t.map((t) => ({
  //     ...t,
  //     id: undefined
  //   })))
  //   .returning()
  //   .all()

  return {
    texts: t,
  };
};