import type { Handle } from "@sveltejs/kit";
import { drizzle, type AnyD1Database } from "drizzle-orm/d1";
import { sequence } from '@sveltejs/kit/hooks';

const authHook: Handle = async ({ event, resolve }) => {
    // Get the session cookie
    event.locals.db = drizzle(event.platform?.env.DB as AnyD1Database);

    const session = event.cookies.get('session');

    // Add user info to event.locals if session exists
    if (session) {
        try {
            const userData = JSON.parse(session);
            event.locals.user = {
                username: userData.username,
                role: userData.role
            };
        } catch (e) {
            // Invalid session
            event.locals.user = undefined;
            event.cookies.delete('session', { path: '/' });
        }
    }

    // Check if the route is protected
    if (event.url.pathname.startsWith('/admin')) {
        if (!event.locals.user || event.locals.user.role !== 'admin') {
            return new Response('Unauthorized', { status: 302, headers: { Location: '/' } });
        }
    }

    return resolve(event);
};

export const handle = sequence(authHook);