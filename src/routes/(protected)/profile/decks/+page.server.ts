import { getUserDecks } from '$lib/server/actions/getUserDecks.js';

export const load = async ({ locals }) => {
  const user = locals.user;
  const result = await getUserDecks(user.userId);


  return { result };
};
