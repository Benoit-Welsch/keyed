import { texts } from "$lib/server/db";
import { texts as t } from "$lib/text"
import type { LayoutServerLoad, PageServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {

  return {
    texts: await locals.db.select().from(texts).all(),
  };
};