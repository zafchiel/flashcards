import { getAllPublicDecks } from "$lib/server/actions/getAllPublicDecks";

export const load = async ({ setHeaders }) => {
  const decks = await getAllPublicDecks();

  // Browser cache for 60 seconds
  // setHeaders({
  //   "cache-control": "public, max-age=60",
  // });

  return { decks };
};
