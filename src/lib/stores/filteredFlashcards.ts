import type { Flashcard } from "$lib/server/db/schema";
import { setContext, getContext } from "svelte";
import { writable, type Writable } from "svelte/store";

export const CONTEXT_KEY = Symbol();

export function createFilteredFlashcardsStore() {
  const store = writable<Flashcard[]>();
  setContext(CONTEXT_KEY, store);
  return store;
}

export function getFitleredFlashcardsStore() {
  return getContext<Writable<Flashcard[]>>(CONTEXT_KEY);
}
