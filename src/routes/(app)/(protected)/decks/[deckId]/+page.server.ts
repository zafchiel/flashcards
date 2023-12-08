import { createDeck } from "$lib/server/actions/createDeck.js";
import { createFlashcard } from "$lib/server/actions/createFlashcard.js";
import { createTags } from "$lib/server/actions/createTags.js";
import { getDeckById } from "$lib/server/actions/getDeckById.js";
import { getDeckTags } from "$lib/server/actions/getDeckTags";
import { getDeckWithFlashcardsAndTags } from "$lib/server/actions/getDeckWithFlashcardsAndTags.js";
import { getDecksFlashcards } from "$lib/server/actions/getDecksFlashcards.js";
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export const load = async ({ params, locals }) => {
  const deckId = parseInt(params.deckId);
  const userId = locals.user.userId;

  // Determining if user accesing deck is the owner
  let isOwner = false;

  const deck = await getDeckWithFlashcardsAndTags(deckId);
  if(!deck) throw new Error("Deck not found");
  if(deck.userId === userId) isOwner = true;



  return { deck, isOwner };
};

export const actions: Actions = {
  saveDeck: async ({ locals, params }) => {
    const deckId = parseInt(params.deckId!);
    let newDeckId: number;

    try {
      const deck = await getDeckWithFlashcardsAndTags(deckId);
      if (!deck) {
        return fail(400, { message: "Deck not found" });
      }

      const newDeck = await createDeck(
        locals.user.userId,
        deck.title,
        deck.description || undefined
      );
      newDeckId = newDeck.newDeckId;

      const newFlashcards = deck.flashcards.map((flashcard) => ({
        ...flashcard,
        id: undefined,
        deckId: newDeckId,
        learned: false,
      }));
      await createFlashcard(newDeckId, newFlashcards);

      if (deck.tags.length !== 0) {
        const newTags = deck.tags.map((tag) => tag.tagName);
        await createTags(newTags, newDeckId);
      }

      return { success: true, newDeckId };
    } catch (error: any) {
      return fail(500, { message: error.message });
    }
  },
};
