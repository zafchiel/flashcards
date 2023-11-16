import { getUserDecks } from '$lib/server/actions/getUserDecks.js';
import { getUserDecksWithTags } from '$lib/server/actions/getUserDecksWithTags.js';

export const load = async ({ locals }) => {
  const user = locals.user;
  const decksWithTags = await getUserDecksWithTags(user.userId);


  return { decks: decksWithTags };
};
