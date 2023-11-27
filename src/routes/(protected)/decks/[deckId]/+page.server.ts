import { getDeckById } from '$lib/server/actions/getDeckById.js';
import { getDeckTags } from '$lib/server/actions/getDeckTags';
import { getDecksFlashcards } from '$lib/server/actions/getDecksFlashcards.js';
import { fail } from '@sveltejs/kit';

export const load = async ({params, locals}) => {
    const deckId = params.deckId;
    const userId = locals.user.userId

    const deck = await getDeckById(parseInt(deckId));
    if(deck.userId !== userId) throw fail(401, {message: 'You are not authorized to view this deck'})
    const flashcards = await getDecksFlashcards(parseInt(deckId));
    const tags = await getDeckTags(parseInt(deckId));
    
    return {deck, flashcards, tags}
}