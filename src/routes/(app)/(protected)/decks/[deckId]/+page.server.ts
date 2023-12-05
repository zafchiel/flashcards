import { getDeckById } from "$lib/server/actions/getDeckById.js";
import { getDeckTags } from "$lib/server/actions/getDeckTags";
import { getDecksFlashcards } from "$lib/server/actions/getDecksFlashcards.js";

export const load = async ({ params, locals }) => {
  const deckId = params.deckId;
  const userId = locals.user.userId;

  // Determining if user accesing deck is the owner
  let isOwner = false;

  const deck = await getDeckById(parseInt(deckId));
  if (deck.userId === userId) isOwner = true;
  const flashcards = await getDecksFlashcards(parseInt(deckId));
  const tags = await getDeckTags(parseInt(deckId));

  return { deck, flashcards, tags, isOwner };
};
