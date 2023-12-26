import { getAllPublicDecks } from "$lib/server/actions/getAllPublicDecks";
import { searchPublicDecks } from "$lib/server/actions/searchPublicDecks.js";

export const load = async ({ setHeaders, url }) => {
  const searchParam = url.searchParams.get("q");
  let fetchDecks;
  if (searchParam) {
    fetchDecks = searchPublicDecks(searchParam);
  } else {
    fetchDecks = getAllPublicDecks();
  }

  // Browser cache for 60 seconds
  // setHeaders({
  //   "cache-control": "public, max-age=60",
  // });

  return { streamed: { decks: fetchDecks } };
};
