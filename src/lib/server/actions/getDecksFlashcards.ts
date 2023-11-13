import { dbHttp } from "../db";
import { flashcards } from "../db/schema";
import { like } from "drizzle-orm";

export const getDecksFlashcards = async (deckId: string) => {
    const result = await dbHttp.select().from(flashcards).where(like(flashcards.deckId, deckId));

    return result;
}