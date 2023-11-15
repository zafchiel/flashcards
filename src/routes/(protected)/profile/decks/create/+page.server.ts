import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { message, superValidate } from "sveltekit-superforms/server";
import { createDeck } from "$lib/server/actions/createDeck.js";
import { createFlashcard } from "$lib/server/actions/createFlashcard.js";
import { DatabaseError } from "@neondatabase/serverless";

const schema = z.object({
	deckTitle: z.string().min(3, {message: "Must contain at least 3 characters"}).max(31),
    deckDescription: z.string().min(6, {message: "Must contain at least 6 characters"}).max(255).optional(),
    flashcards: z.array(z.object({
        question: z.string().min(1, {message: "Must contain at least 1 character"}).max(255),
        answer: z.string().min(1, {message: "Must contain at least 1 character"}).max(255)
    })).min(2).max(100)
})

const  flashcards = [{ question: "", answer: "" },
{ question: "", answer: "" },]

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/");
	const form = await superValidate({flashcards}, schema);
	return {form};
};

export const actions = {
    default: async ({request, locals}) => {
        const form = await superValidate(request, schema);
        let redirectId = null;
        
        if(!form.valid) {
			return fail(400, {form})
		};

        const { deckTitle, deckDescription, flashcards } = form.data;

        try {
            const {deckId: newDeckId} = await createDeck(locals.user.userId, deckTitle, deckDescription);
            await createFlashcard(newDeckId, flashcards);
            redirectId = newDeckId;

        } catch (error) {
            if(error instanceof DatabaseError) {
                return message(form, error.message, {status: 500})
            }
        }

        throw redirect(302, `/profile/decks/${redirectId}`);
    }
}