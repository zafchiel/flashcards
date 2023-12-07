import { createDeck } from "$lib/server/actions/createDeck.js";
import { createFlashcard } from "$lib/server/actions/createFlashcard.js";
import { createTags } from "$lib/server/actions/createTags.js";
import { getDeckById } from "$lib/server/actions/getDeckById.js";
import { getDeckTags } from "$lib/server/actions/getDeckTags";
import { getDeckWithFlashcardsAndTags } from "$lib/server/actions/getDeckWithFlashcardsAndTags.js";
import { getDecksFlashcards } from "$lib/server/actions/getDecksFlashcards.js";
import type { Actions } from "@sveltejs/kit";

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

export const actions: Actions = {
  saveDeck: async ({ locals, params }) => {
    const deckId = parseInt(params.deckId!);

    const deck = await getDeckWithFlashcardsAndTags(deckId);
    if(!deck) throw new Error("Deck not found");

    const newDeck = await createDeck(
      locals.user.userId,
      deck.title,
      deck.description || undefined
    );

    const newFlashcards = deck.flashcards.map((flashcard) => ({
      ...flashcard,
      id: undefined,
      deckId: newDeck.newDeckId,
      learned: false,
    }));
    await createFlashcard(newDeck.newDeckId, newFlashcards);

    const newTags = deck.tags.map(tag => tag.tagName);
    await createTags(newTags, newDeck.newDeckId);
  },
};
