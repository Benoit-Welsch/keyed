import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { users } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { verifyPassword, hashPassword } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        return {
            error: 'You must be logged in to access this page'
        };
    }
};

export const actions: Actions = {
    updatePassword: async ({ request, locals }) => {
        if (!locals.user) {
            return fail(401, { error: 'You must be logged in to update your password' });
        }

        const formData = await request.formData();
        const currentPassword = formData.get('currentPassword')?.toString();
        const newPassword = formData.get('newPassword')?.toString();
        const confirmPassword = formData.get('confirmPassword')?.toString();

        if (!currentPassword || !newPassword || !confirmPassword) {
            return fail(400, { error: 'All fields are required' });
        }

        if (newPassword !== confirmPassword) {
            return fail(400, { error: 'New passwords do not match' });
        }

        // Get user from database
        const user = await locals.db
            .select()
            .from(users)
            .where(eq(users.username, locals.user.username))
            .limit(1)
            .get();

        if (!user) {
            return fail(404, { error: 'User not found' });
        }

        // Verify current password
        if (!(await verifyPassword(currentPassword, user.password))) {
            return fail(401, { error: 'Current password is incorrect' });
        }

        // Hash new password and update
        const hashedPassword = await hashPassword(newPassword);
        await locals.db
            .update(users)
            .set({ password: hashedPassword })
            .where(eq(users.username, locals.user.username));

        return { success: 'Password updated successfully' };
    }
};
