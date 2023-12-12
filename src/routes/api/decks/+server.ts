import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { deleteDeck } from "$lib/server/actions/deleteDeck";
import { DatabaseError } from "@neondatabase/serverless";
import { getUserDecksWithTags } from "$lib/server/actions/getUserDecksWithTags";
import { z } from "zod";
import { updateDeck } from "$lib/server/actions/updateDeck";

// Delete deck handler
export const DELETE: RequestHandler = async ({ url, locals }) => {
  // Refactor to check if user in owner of deck

  const session = await locals.auth.validate();
  if (!session) return json({ message: "Not logged in" }, { status: 401 });

  const deckId = url.searchParams.get("deckId");
  if (!deckId) return json({ message: "Missing deckId" }, { status: 400 });

  try {
    const result = await deleteDeck(parseInt(deckId), session.user.userId);
    if(result.success) return json({ success: true, message: "Deleted" });
    
    return json({ error: "Failed to delete deck" }, { status: 500 });

  } catch (error) {
    if (error instanceof DatabaseError) {
      return json({ error: error.message }, { status: 500 });
    }
    // Handle other types of errors
    return json({ error: "An unexpected error occurred" }, { status: 500 });
  }
};

// Get all user decks
export const GET: RequestHandler = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (!session) return json({ message: "Not logged in" }, { status: 401 });

  try {
    const result = await getUserDecksWithTags(session.user.userId);
    if(!result) return json({ message: "No decks found" }, { status: 404 });

    return json(result);
    
  } catch (error) { 
    console.log(error);
    if (error instanceof DatabaseError) {
      return json({ error: error.message }, { status: 500 });
    }
    return json({ error: "Something went wrong" }, { status: 500 });
  }

}

const deckPayloadSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  userId: z.string().optional(),
  public: z.boolean().optional(),
  lastUpdate: z.date().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "At least one field must be provided",
});

// Update deck
export const PATCH: RequestHandler = async ({ url, locals, request }) => {
  try {
    const session = await locals.auth.validate();
    if (!session) return json({ message: "Not logged in" }, { status: 401 });
  
    const deckId = url.searchParams.get("deckId");
    if (!deckId) return json({ message: "Missing deckId" }, { status: 400 });
  
    const payload = await request.json();
    deckPayloadSchema.parse(payload);
  
    await updateDeck(parseInt(deckId), payload);
  
    return json({ success: true, message: "Updated" });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return json({ message: error.message }, { status: 400 });
    }
    // Handle other types of errors
    return json({ message: "Something went wrong" }, { status: 500 });
  }
}