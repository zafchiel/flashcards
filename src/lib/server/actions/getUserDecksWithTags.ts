import { dbHttp } from "../db";
import { decks } from "../db/schema";
import { eq } from "drizzle-orm";

export const getUserDecksWithTags = async (userId: string) => {
    const result = await dbHttp.query.decks.findMany({
        where: eq(decks.userId, userId),
        with: {
            tags: true
        }
    })

    return result;
}