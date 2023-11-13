import { auth } from "$lib/server/lucia";
import { DatabaseError } from "@neondatabase/serverless";
import { fail, redirect } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const username = formData.get("username");
		const password = formData.get("password");
		// basic check
		if (
			typeof username !== "string" ||
			username.length < 4 ||
			username.length > 31
		) {
			return fail(400, {
				message: "Invalid username"
			});
		}
		if (
			typeof password !== "string" ||
			password.length < 6 ||
			password.length > 255
		) {
			return fail(400, {
				message: "Invalid password"
			});
		}
		try {
			const user = await auth.createUser({
				key: {
					providerId: "username", // auth method
					providerUserId: username.toLowerCase(), // unique id when using "username" auth method
					password // hashed by Lucia
				},
                // @ts-ignore
				attributes: {
					username,
					avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${username}&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if(e instanceof DatabaseError && e.constraint == 'auth_user_username_unique'){
				return fail(400, {
					message: "Username already taken"
				});
			}
			return fail(500, {
				message: "An unknown error occurred"
			});
		}
		// redirect to
		// make sure you don't throw inside a try/catch block!
		throw redirect(302, "/");
	}
};

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, "/");
	return {};
};