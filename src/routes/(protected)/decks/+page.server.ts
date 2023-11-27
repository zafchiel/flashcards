import { getUserDecksWithTags } from "$lib/server/actions/getUserDecksWithTags";

export const load = async ({ locals, depends }) => {
  depends("invalidate:decks");
  const decks = await getUserDecksWithTags(locals.user.userId);

  return { decks };
};
