import { getUserDecks } from "$lib/server/actions/getUserDecks.js";
import { auth } from "$lib/server/lucia.js";
import { fail, redirect } from "@sveltejs/kit";

export const load = async ({locals}) => {
    const decks = await getUserDecks(locals.user.userId);
    return { numberOfDecks: decks.length };
}

export const actions = {
    logout: async ({locals}) => {
        const session = await locals.auth.validate();
        if (!session) return fail(401);

        await auth.invalidateSession(session.sessionId);
        locals.auth.setSession(null);
        throw redirect(302, '/auth?t=signin');
    }
}