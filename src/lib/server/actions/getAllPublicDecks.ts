import { eq } from "drizzle-orm"
import { dbHttp } from "../db"
import { decks } from "../db/schema"

export const getAllPublicDecks = async () => {
    const result = await dbHttp.query.decks.findMany({
        where: eq(decks.public, true),
        with: {
            tags: true
        }
    })
    return result;
}