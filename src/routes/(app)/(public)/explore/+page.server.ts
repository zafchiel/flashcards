import { getAllPublicDecks } from "$lib/server/actions/getAllPublicDecks"

export const load = async () => {
    const decks = await getAllPublicDecks();
    return { decks };
}