import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { texts, users } from '$lib/server/db';
import { eq, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user || locals.user.role !== 'admin') {
    throw redirect(302, '/login');
  }

  // Get all texts and user count
  const allTexts = await locals.db.select().from(texts).all();
  const userCount = await locals.db.select({ count: sql<number>`count(*)` }).from(users).get();

  return {
    user: locals.user,
    texts: allTexts,
    userCount: userCount?.count || 0
  };
};

export const actions: Actions = {
  addText: async ({ request, locals }) => {
    const formData = await request.formData();
    const title = formData.get('title')?.toString();
    const content = formData.get('content')?.toString();
    const language = formData.get('language')?.toString();
    const difficulty = formData.get('difficulty')?.toString();
    const type = formData.get('type')?.toString();
    const hasSpecialChars = formData.get('hasSpecialChars') === 'true';

    if (!title || !content || !language || !difficulty || !type) {
      return fail(400, { error: 'All fields are required' });
    }

    await locals.db
      .insert(texts)
      .values({
        title,
        content,
        language,
        difficulty,
        type,
        hasSpecialChars
      }).catch((error) => {
        return fail(500, { error: 'Internal error. Failed to add text' });
      });

    return { success: true };
  },

  deleteText: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id')?.toString();

    if (!id) {
      return fail(400, { error: 'Text ID is required' });
    }

    await locals.db
      .delete(texts)
      .where(eq(texts.id, parseInt(id)))
      .catch((error) => {
        return fail(500, { error: 'Internal error. Failed to delete text' });
      });

    return { success: true };
  },

  updateText: async ({ request, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id')?.toString();
    const title = formData.get('title')?.toString();
    const content = formData.get('content')?.toString();
    const language = formData.get('language')?.toString();
    const difficulty = formData.get('difficulty')?.toString();
    const type = formData.get('type')?.toString();
    const hasSpecialChars = formData.get('hasSpecialChars') === 'true';

    if (!id || !title || !content || !language || !difficulty || !type) {
      return fail(400, { error: 'All fields are required' });
    }

    await locals.db
      .update(texts)
      .set({
        title,
        content,
        language,
        difficulty,
        type,
        hasSpecialChars
      })
      .where(eq(texts.id, parseInt(id)))
      .catch((error) => {
        return fail(500, { error: 'Internal error. Failed to update text' });
      }
      );

    return { success: true };
  }
};
