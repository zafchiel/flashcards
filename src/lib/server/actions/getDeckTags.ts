import { eq } from "drizzle-orm";
import { dbHttp } from "../db";
import { deckTags } from "../db/schema";

export const getDeckTags = async (deckId: number) => {
    const result = await dbHttp.select().from(deckTags).where(eq(deckTags.deckId, deckId));

    return result;
}