import { getUserDecks } from "$lib/server/actions/getUserDecks.js";
import { auth } from "$lib/server/lucia.js";
import { fail, redirect, error } from "@sveltejs/kit";

export const load = async ({locals}) => {
    const decks = await getUserDecks(locals.user.userId);
    if (!decks) throw error(404, "Decks not found");
    return { numberOfDecks: decks.length };
}

export const actions = {
    logout: async ({locals}) => {
        const session = await locals.auth.validate();
        if (!session) return fail(401, { message: 'Unauthorized' });

        await auth.invalidateSession(session.sessionId);
        locals.auth.setSession(null);
        throw redirect(302, '/auth?t=signin');
    }
}