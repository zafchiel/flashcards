// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

// src/app.d.ts
/// <reference types="lucia" />
declare global {
  namespace Lucia {
    type Auth = import("$lib/server/lucia").Auth;
    type DatabaseUserAttributes = {
      username: string;
      avatar: string;
    };
    type DatabaseSessionAttributes = {};
  }
  namespace App {
    interface Locals {
      auth: import("Lucia").AuthRequest;
      user: { username: string; avatar: string | null; userId: string };
    }
  }

  // New ViewTransition API types
  interface ViewTransition {
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
    finished: Promise<void>;
    skipTransition: () => void;
  }

  interface Document {
    startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
  }
}

// THIS IS IMPORTANT!!!
export {};
