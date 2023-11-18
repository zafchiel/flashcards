import { eq } from "drizzle-orm";
import { dbHttp } from "../db";
import { decks, flashcards } from "../db/schema";

// Seleck deck by ID with all its flashcards and tags
export const getDeckWithFlashcardsAndTags = async (deckId: number) => {
  // const result = await dbHttp
  //   .select({
  //       deckId: decks.id,
  //       deckTitle: decks.title,
  //       deckDescription: decks.description,
  //       deckCreatedAt: decks.createdAt,
  //       deckUpdatedAt: decks.lastUpdate,
  //       deckIsPublic: decks.public,
  //       flashcardId: flashcards.id,
  //       flashcardQuestion: flashcards.question,
  //       flashcardAnswer: flashcards.answer,
  //   })
  //   .from(decks)
  //   .innerJoin(flashcards, eq(decks.id, flashcards.deckId))
  //   .where(eq(decks.id, deckId));

  //   return result;

  const result = await dbHttp.query.decks.findFirst({
    where: eq(decks.id, deckId),
    with: {
      flashcards: true,
      tags: true,
    }
  });

  return result;
};
