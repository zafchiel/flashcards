import { dbHttp } from "../db"
import { deckTags } from "../db/schema"

export const createTags = async (tagsArray: string[], deckId: number) => {
    const data = tagsArray.map(tag => ({deckId, tagName: tag}));
    const result = await dbHttp.insert(deckTags).values(data);

    return result;
}