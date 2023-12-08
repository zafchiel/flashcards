import { auth } from "$lib/server/lucia";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	if(event.url.pathname.startsWith('/profile') || event.url.pathname.startsWith('/decks')) {
		const session = await event.locals.auth.validate();
		if(!session) throw redirect(302, '/auth?t=signin');
		event.locals.user = session.user;
	}
	return await resolve(event);
};