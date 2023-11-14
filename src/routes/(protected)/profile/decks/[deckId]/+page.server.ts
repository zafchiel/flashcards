import { getDeckById } from '$lib/server/actions/getDeckById.js';
import { getDecksFlashcards } from '$lib/server/actions/getDecksFlashcards.js';

export const load = async ({params}) => {
    const deckId = params.deckId;
    const flashcards = await getDecksFlashcards(parseInt(deckId));
    const deck = getDeckById(parseInt(deckId));
    
    return {deck, flashcards}
}