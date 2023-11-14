import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { message, superValidate } from "sveltekit-superforms/server";

const schema = z.object({
	deckTitle: z.string().min(4).max(31),
    deckDescription: z.string().min(6).max(255).optional(),
    flashcards: z.array(z.object({
        question: z.string().min(4).max(255),
        answer: z.string().min(4).max(255)
    })).min(1).max(100)
})

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/");
	const form = await superValidate(schema);
	return {form};
};