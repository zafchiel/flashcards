import { getAllPublicDecks } from "$lib/server/actions/getAllPublicDecks";
import { searchPublicDecks } from "$lib/server/actions/searchPublicDecks.js";

export const load = async ({ setHeaders, url }) => {
  const searchParam = url.searchParams.get("q");
  let decks;
  if (searchParam) {
    decks = await searchPublicDecks(searchParam);
  } else {
    decks = await getAllPublicDecks();
  }

  // Browser cache for 60 seconds
  // setHeaders({
  //   "cache-control": "public, max-age=60",
  // });

  return { decks };
};
