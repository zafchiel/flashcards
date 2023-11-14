import { dbHttp } from "../db";
import { decks } from "../db/schema";
import { eq } from "drizzle-orm";

export const getDeckById = async (deckId: number) => {
    const result = await dbHttp.select().from(decks).where(eq(decks.id, deckId));

    return result[0];
}