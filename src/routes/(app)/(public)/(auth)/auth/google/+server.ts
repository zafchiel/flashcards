import type { RequestHandler } from "./$types";
import { googleAuth } from "$lib/server/lucia";
import { dev } from "$app/environment";

export const GET: RequestHandler = async ({ cookies }) => {
    const [url, state] = await googleAuth.getAuthorizationUrl();

    // store state in cookie
    cookies.set("github_oauth_state", state, {
        httpOnly: true,
        secure: !dev,
        path: "/",
        maxAge: 60 * 60,
    });
    
    return new Response(null, {
        status: 302,
        headers: {
            location: url.toString(),
        }
    });
};