import { getAllPublicDecks } from "$lib/server/actions/getAllPublicDecks";
import { searchPublicDecks } from "$lib/server/actions/searchPublicDecks.js";
import { DatabaseError } from "@neondatabase/serverless";
import { fail } from "@sveltejs/kit";

export const load = async ({ setHeaders }) => {
  const decks = await getAllPublicDecks();

  // Browser cache for 60 seconds
  // setHeaders({
  //   "cache-control": "public, max-age=60",
  // });

  return { decks };
};

export const actions = {
  searchDecks: async ({ request }) => {
    const searchInput = (await request.formData()).get("search")?.toString();

    if (!searchInput) return fail(400, { message: "No search input provided" });

    try {
      const decks = await searchPublicDecks(searchInput);
      if (!decks) return fail(404, { message: "No decks found" });

      return { decks };
    } catch (error) {
      if (error instanceof DatabaseError)
        return fail(500, { message: error.message });
      return fail(500, { message: "Something went wrong" });
    }
  },
};
