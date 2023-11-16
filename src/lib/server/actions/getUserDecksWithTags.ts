import { dbHttp } from "../db";
import { deckTags, decks } from "../db/schema";
import { eq, like, sql } from "drizzle-orm";

export const getUserDecksWithTags = async (userId: string) => {
    const result = await dbHttp.query.decks.findMany({
        where: eq(decks.userId, userId),
        with: {
            tags: true
        }
    })

    return result;
}