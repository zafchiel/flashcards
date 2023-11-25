import { dbHttp } from "$lib/server/db";
import { flashcards } from "$lib/server/db/schema";
import { json, type RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const PATCH: RequestHandler = async ({url, request}) => {
    const flashcardId = url.searchParams.get('id');
    if(!flashcardId) {
        return json({error: 'No flashcard id provided'});
    }

    const updatedFlashcard = await request.json();
    await dbHttp.update(flashcards).set(updatedFlashcard).where(eq(flashcards.id, parseInt(flashcardId)));
    

    return json({ success: true, updatedFlashcardId: flashcardId });
}