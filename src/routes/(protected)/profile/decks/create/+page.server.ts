import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { message, superValidate } from "sveltekit-superforms/server";

const schema = z.object({
	deckTitle: z.string().min(4, {message: "Must contain at least 4 characters"}).max(31),
    deckDescription: z.string().min(6, {message: "Must contain at least 6 characters"}).max(255).optional(),
    flashcards: z.array(z.object({
        question: z.string().min(4, {message: "Must contain at least 4 characters"}).max(255),
        answer: z.string().min(4, {message: "Must contain at least 4 characters"}).max(255)
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
        console.log(form.data)
    }
}