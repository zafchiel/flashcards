import { deleteUser } from "$lib/server/actions/deleteAccount.js";
import { getUserDecks } from "$lib/server/actions/getUserDecks.js";
import { auth } from "$lib/server/lucia.js";
import { fail, redirect, error } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  const decks = await getUserDecks(locals.user.userId);
  if (!decks) throw error(404, "Decks not found");
  return { numberOfDecks: decks.length };
};

export const actions = {
  logout: async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) return fail(401, { message: "Unauthorized" });

    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
    throw redirect(302, "/auth?t=signin");
  },
  delete: async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, "/auth?t=signin");

    try {
        const res = await deleteUser(locals.user.userId);
    } catch (error) {
        return fail(500, { status: "failed", message: error.message });
    }
    if(res.success) throw redirect(302, "/auth?t=signin");
  },
};
