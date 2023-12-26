import { and, eq, like } from "drizzle-orm";
import { dbHttp } from "../db";
import { decks } from "../db/schema";

export const searchPublicDecks = async (searchInput: string) => {
  const data = await dbHttp.query.decks.findMany({
    where: and(eq(decks.public, true), like(decks.title, `%${searchInput}%`)),
    with: {
      tags: true,
      user: true,
    },
  });

  return data;
};
