import { DatabaseError } from "@neondatabase/serverless";
import { auth } from "../lucia";
import { deleteDeck } from "./deleteDeck";
import { getUserDecks } from "./getUserDecks";

export const deleteUser = async (userId: string) => {
  try {
    const userDecks = await getUserDecks(userId);
    if (!userDecks) {
      await auth.deleteUser(userId);
      return { success: true };
    }

    let decksPromisesArray: Promise<any>[] = [];
    for (const userDeck of userDecks) {
      decksPromisesArray.push(deleteDeck(userDeck.id, userId));
    }

    const promisesResults = await Promise.allSettled(decksPromisesArray);

    const failedDecks = promisesResults.filter(
      (result) => result.status === "rejected"
    );
    if (failedDecks.length > 0) {
      throw new Error(`Failed to delete ${failedDecks.length} decks.`);
    }

    await auth.deleteUser(userId);
    return { success: true };
  } catch (error) {
    if (error instanceof DatabaseError) return { success: false, message: error.message };
    return { success: false, message: "Something went wrong" };
  }
};
