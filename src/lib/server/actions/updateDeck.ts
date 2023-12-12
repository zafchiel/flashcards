import { eq } from "drizzle-orm";
import { dbHttp } from "../db";
import { decks } from "../db/schema";

type Payload = {
  title?: string;
  description?: string;
  userId?: string;
  public?: boolean;
  lastUpdate?: Date;
};

export const updateDeck = async (deckId: number, payload: Payload) => {
  const result = await dbHttp
    .update(decks)
    .set(payload)
    .where(eq(decks.id, deckId));

  return result;
};
