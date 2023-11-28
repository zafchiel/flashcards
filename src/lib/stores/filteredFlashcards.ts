import type { Flashcard } from "$lib/server/db/schema";
import { writable } from "svelte/store";

export const filteredFlashcards = writable<Flashcard[]>();