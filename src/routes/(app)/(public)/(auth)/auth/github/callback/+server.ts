import { auth, githubAuth } from "$lib/server/lucia";
import type { RequestHandler } from "@sveltejs/kit";
import { OAuthRequestError } from "@lucia-auth/oauth";

export const GET: RequestHandler = async ({ cookies, url, locals }) => {
  // get state stored in cookie
  const storedState = cookies.get("github_oauth_state");
  const state = url.searchParams.get("state");
  const code = url.searchParams.get("code");

  // check state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    // validate callback
    const { getExistingUser, githubUser, createUser } =
      await githubAuth.validateCallback(code);

    const getUser = async () => {
      // check if user already exists
      const existingUser = await getExistingUser();
      if (existingUser) return existingUser;
      // if not create user in database
      const user = await createUser({
        attributes: {
          username: githubUser.login,
          avatar: githubUser.avatar_url,
        },
      });
      return user;
    };

    const user = await getUser();
    // create user session
    const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
    })
    locals.auth.setSession(session);

    return new Response(null, {
        status: 302,
        headers: {
            location: "/profile"
        }
    })
  } catch (error) {
    if (error instanceof OAuthRequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
        status: 500,
    })
  }
};
