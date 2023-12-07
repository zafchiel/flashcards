import { dbHttp } from "../db"
import { decks } from "../db/schema"

export const createDeck = async (userId: string, title: string, description?: string) => {
    const result = await dbHttp.insert(decks).values({userId, title, description}).returning({deckId: decks.id}).returning({ newDeckId: decks.id });

    return result[0];
}