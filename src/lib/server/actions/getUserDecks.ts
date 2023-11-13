import { dbHttp } from "../db";
import { decks } from "../db/schema";
import { like } from "drizzle-orm";

export const getUserDecks = async (userId: string) => {
    const result = await dbHttp
    .select()
    .from(decks)
    .where(like(decks.userId, userId));

    return result;
}