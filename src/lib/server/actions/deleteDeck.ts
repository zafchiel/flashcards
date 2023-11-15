import { and, eq, like } from "drizzle-orm";
import { dbHttp, dbPool } from "../db";
import { decks, flashcards } from "../db/schema";

export const deleteDeck = async (deckId: number, userId: string) => {
  await dbPool.transaction(async (tx) => {
    // delete all flashcards in deck
    await tx.delete(flashcards).where(eq(flashcards.deckId, deckId));
    // delete deck
    await tx.delete(decks)
    .where(
      and(
        eq(decks.id, deckId),
        like(decks.userId, userId)
      )
    );

    return { success: true };
  });

  return { success: false, message: "Something went wrong" };
};