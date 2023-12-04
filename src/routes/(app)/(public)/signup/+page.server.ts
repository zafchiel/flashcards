import { auth } from "$lib/server/lucia";
import { DatabaseError } from "@neondatabase/serverless";
import { fail, redirect } from "@sveltejs/kit";

import { z } from "zod";
import { message, setError, superValidate } from "sveltekit-superforms/server";

const schema = z.object({
  username: z.string().min(4).max(31),
  password: z.string().min(6).max(255),
  repeatPassword: z.string().min(6).max(255),
});

export const load = async ({ locals }) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, "/decks");
  const form = await superValidate(schema);
  return { form };
};

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, schema);

    if (!form.valid) return fail(400, { form });

	if(form.data.password !== form.data.repeatPassword) return setError(form, "repeatPassword", "Passwords do not match");

    const { username, password } = form.data;
    try {
      const user = await auth.createUser({
        key: {
          providerId: "username", // auth method
          providerUserId: username.toLowerCase(), // unique id when using "username" auth method
          password, // hashed by Lucia
        },
        // @ts-ignore
        attributes: {
          username,
          avatar: `https://api.dicebear.com/7.x/thumbs/svg?seed=${username}&backgroundColor=0a5b83,1c799f,69d2e7,f1f4dc,f88c49,ffdfbf,ffd5dc,d1d4f9,c0aede,b6e3f4`,
        },
      });
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      locals.auth.setSession(session); // set session cookie
    } catch (e) {
      if (
        e instanceof DatabaseError &&
        e.constraint == "auth_user_username_unique"
      ) {
        return message(form, "Username already exists!", { status: 400 });
      }
      return message(form, "Something went wrong", { status: 500 });
    }
    // redirect to
    // make sure you don't throw inside a try/catch block!
    throw redirect(302, "/profile");
  },
};
