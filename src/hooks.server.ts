import { auth } from "$lib/server/lucia";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	// we can pass `event` because we used the SvelteKit middleware
	event.locals.auth = auth.handleRequest(event);
	if(event.url.pathname.startsWith('/profile')) {

		const session = await event.locals.auth.validate();
		if(!session) throw redirect(302, '/login');
		event.locals.user = session.user;
		
	}
	return await resolve(event);
};