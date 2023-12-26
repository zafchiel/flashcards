import { and, eq, like } from "drizzle-orm";
import { dbHttp } from "../db";
import { decks } from "../db/schema";

export const searchPublicDecks = async (searchInput: string) => {
  const data = await dbHttp
    .select()
    .from(decks)
    .where(and(eq(decks.public, true), like(decks.title, `%${searchInput}%`)));
  return data;
};
