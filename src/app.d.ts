// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

// src/app.d.ts
/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import("$lib/server/lucia").Auth;
		type DatabaseUserAttributes = import("$lib/server/db/schema").User;
		type DatabaseSessionAttributes = {};
	}
	namespace App {
		interface Locals {
			auth: import('Lucia').AuthRequest;
		}
	}

}

// THIS IS IMPORTANT!!!
export {};