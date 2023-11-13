import { auth } from "$lib/server/lucia";
import { LuciaError } from "lucia";
import { fail, redirect } from "@sveltejs/kit";

import { z } from "zod";
import { message, superValidate } from "sveltekit-superforms/server";

const schema = z.object({
	username: z.string().min(4).max(31).includes("@"),
	password: z.string().min(6).max(255)
})

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, "/");
	const form = await superValidate(schema);
	return {form};
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, schema);

		if(!form.valid) {
			return fail(400, {form})
		}

		const {username, password} = form.data;
		
		try {
			// find user by key
			// and validate password
			const key = await auth.useKey(
				"username",
				username.toLowerCase(),
				password
			);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === "AUTH_INVALID_KEY_ID" ||
					e.message === "AUTH_INVALID_PASSWORD")
			) {
				// user does not exist
				// or invalid password
				return message(form, "Username of password is invalid!", { status: 403 });
			}
			return message(form, "Something went wrong", { status: 500})
		}
		// redirect to
		throw redirect(302, "/profile");
	}
};

