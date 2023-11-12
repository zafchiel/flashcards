import { auth } from "$lib/server/lucia";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.auth = auth.handleRequest(event);

	if(event.url.pathname.startsWith('/profile')) {
		const session = await event.locals.auth.validate();
		if(!session) throw redirect(302, '/login');
		event.locals.user = session.user;
	}
	return await resolve(event);
};