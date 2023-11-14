import { dbHttp } from "../db";
import { flashcards } from "../db/schema";
import { eq } from "drizzle-orm";

export const getDecksFlashcards = async (deckId: number) => {
    const result = await dbHttp.select().from(flashcards).where(eq(flashcards.deckId, deckId));

    return result;
}