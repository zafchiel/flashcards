import { eq } from "drizzle-orm";
import { dbHttp } from "../db";
import { decks } from "../db/schema";

// Seleck deck by ID with all its flashcards and tags
export const getDeckWithFlashcardsAndTags = async (deckId: number) => {
  const result = await dbHttp.query.decks.findFirst({
    where: eq(decks.id, deckId),
    with: {
      flashcards: true,
      tags: true,
    }
  });

  return result;
};
