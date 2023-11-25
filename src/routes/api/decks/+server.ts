import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { deleteDeck } from "$lib/server/actions/deleteDeck";
import { DatabaseError } from "@neondatabase/serverless";
import { getUserDecksWithTags } from "$lib/server/actions/getUserDecksWithTags";

// Delete deck handler
export const DELETE: RequestHandler = async ({ url, locals }) => {
  const session = await locals.auth.validate();
  if (!session) return json({ message: "Not logged in" }, { status: 401 });

  const deckId = url.searchParams.get("deckId");
  if (!deckId) return json({ message: "Missing deckId" }, { status: 400 });

  try {
    await deleteDeck(parseInt(deckId), session.user.userId);
    return json({ success: true, message: "Deleted" });
  } catch (error) {
    console.log(error);
    if (error instanceof DatabaseError) {
      return json({ error: error.message }, { status: 500 });
    }
    return json({ error: "Something went wrong" }, { status: 500 });
  }
};

export const GET: RequestHandler = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) return json({ message: "Not logged in" }, { status: 401 });

  try {
    const result = await getUserDecksWithTags(session.user.userId);
    return json(result);
    
  } catch (error) { 
    console.log(error);
    if (error instanceof DatabaseError) {
      return json({ error: error.message }, { status: 500 });
    }
    return json({ error: "Something went wrong" }, { status: 500 });
  }

}