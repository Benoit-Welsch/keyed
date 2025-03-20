import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { users } from '$lib/server/db';
import { eq } from 'drizzle-orm';
import { verifyPassword, hashPassword } from '$lib/server/auth';

const canRegister = false;

export const load: PageServerLoad = async ({ locals }) => {
    // If user is already logged in, redirect to admin
    if (locals.user) {
        throw redirect(302, '/admin');
    }
    return { canRegister };
};

export const actions: Actions = {
    login: async ({ request, cookies, locals }) => {
        const formData = await request.formData();
        const username = formData.get('username')?.toString();
        const password = formData.get('password')?.toString();

        if (!username || !password) {
            return fail(400, { error: 'Missing username or password' });
        }

        // Query user from database
        const user = await locals.db
            .select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1)
            .get();

        if (!user || !(await verifyPassword(password, user.password))) {
            return fail(401, { error: 'Invalid username or password' });
        }

        // Set session cookie
        cookies.set('session', JSON.stringify({ username, role: user.role }), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: import.meta.env.PROD,
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        throw redirect(302, '/admin');
    },

    register: async ({ request, locals }) => {
        if (!canRegister) return fail(403, { error: 'Registration is temporarily disabled.' });
        const formData = await request.formData();
        const username = formData.get('username')?.toString();
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();
        const confirmPassword = formData.get('confirmPassword')?.toString();

        if (!username || !email || !password || !confirmPassword) {
            return fail(400, { error: 'All fields are required' });
        }

        if (password !== confirmPassword) {
            return fail(400, { error: 'Passwords do not match' });
        }

        // Check if username or email already exists
        const [existingUser] = await locals.db
            .select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1);

        if (existingUser) {
            return fail(400, { error: 'Username already exists' });
        }

        const [existingEmail] = await locals.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingEmail) {
            return fail(400, { error: 'Email already exists' });
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        await locals.db.insert(users).values({
            username,
            email,
            password: hashedPassword,
            role: 'user'
        });

        return { success: true };
    }
};
