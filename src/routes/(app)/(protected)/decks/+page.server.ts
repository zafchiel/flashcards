import { getUserDecksWithTags } from "$lib/server/actions/getUserDecksWithTags";
import { error } from "@sveltejs/kit";

export const load = async ({ locals, depends }) => {
  depends("invalidate:decks");
  const decks = await getUserDecksWithTags(locals.user.userId);
  if (!decks) throw error(404, "Decks not found");

  return { decks };
};
