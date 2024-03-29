import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { pg } from "@lucia-auth/adapter-postgresql";
import { pool } from "./db";

import { github, google } from "@lucia-auth/oauth/providers";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  DEPLOYMENT_URL,
} from "$env/static/private";

export const auth = lucia({
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  adapter: pg(pool, {
    user: "auth_user",
    key: "user_key",
    session: "user_session",
  }),

  getUserAttributes: (data) => {
    return {
      username: data.username,
      avatar: data.avatar,
    };
  },
});

export const githubAuth = github(auth, {
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
});

export const googleAuth = google(auth, {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: dev
    ? "http://localhost:5173/auth/google/callback"
    : DEPLOYMENT_URL + "/auth/google/callback",
});

export type Auth = typeof auth;
