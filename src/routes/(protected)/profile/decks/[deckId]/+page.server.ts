import { getDeckById } from '$lib/server/actions/getDeckById.js';
import { getDeckTags } from '$lib/server/actions/getDeckTags';
import { getDecksFlashcards } from '$lib/server/actions/getDecksFlashcards.js';

export const load = async ({params}) => {
    const deckId = params.deckId;
    const flashcards = await getDecksFlashcards(parseInt(deckId));
    const deck = getDeckById(parseInt(deckId));
    const tags = getDeckTags(parseInt(deckId));
    
    return {deck, flashcards, tags}
}