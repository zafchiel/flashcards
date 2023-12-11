import { auth } from "$lib/server/lucia";
import { redirect, type Handle } from "@sveltejs/kit";

const protectedPaths = ["/profile", "/decks", "/api"];

const isPathProtected = (path: string, protectedPathsArray: string[]) => {
  return protectedPathsArray.some((protectedPath) =>
    path.startsWith(protectedPath)
  );
};

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.auth = auth.handleRequest(event);

  if (isPathProtected(event.url.pathname, protectedPaths)) {
    const session = await event.locals.auth.validate();
    if (!session) throw redirect(302, "/auth?t=signin");
    event.locals.user = session.user;
  }
  return await resolve(event);
};
