import { auth } from "$lib/server/lucia.js";
import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
    const user = locals.user;
    if (!user) throw redirect(302, '/login');

    return {
        userId: user.userId,
        username: user.username,
        avatar: user.avatar
    }
}

export const actions = {
    logout: async ({locals}) => {
        const session = await locals.auth.validate();
        if (!session) return fail(401);

        await auth.invalidateSession(session.sessionId);
        locals.auth.setSession(null);
        throw redirect(302, '/login');
    }
}