import { error, fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import  type { z } from "zod";
import type { PageServerLoad } from "../$types";
import { getDeckWithFlashcardsAndTags } from "$lib/server/actions/getDeckWithFlashcardsAndTags";
import { DatabaseError } from "@neondatabase/serverless";
import { dbHttp } from "$lib/server/db";
import { decks, flashcards, deckTags } from "$lib/server/db/schema";
import { createFlashcard } from "$lib/server/actions/createFlashcard";
import { eq } from "drizzle-orm";
import { createTags } from "$lib/server/actions/createTags";
import { _deckFormSchema } from "../../create/+page.server";

export const load: PageServerLoad = async ({ params }) => {
  const deck = await getDeckWithFlashcardsAndTags(parseInt(params.deckId));
  if (!deck) throw error(404, "Deck not found");

  const tagsArray = deck.tags.map((tag) => tag.tagName);
  const deckFormInitData: z.infer<typeof _deckFormSchema> = {
    deckTitle: deck.title,
    deckDescription: deck.description ?? undefined,
    flashcards: deck.flashcards,
    tags: tagsArray,
  };

  const form = await superValidate(deckFormInitData, _deckFormSchema);
  return { form, deckId: deck.id };
};

export const actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(request, _deckFormSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      const deckInDb = await getDeckWithFlashcardsAndTags(
        parseInt(params.deckId)
      );

      if (form.data.tags?.length !== deckInDb?.tags.length) {
        await dbHttp
          .delete(deckTags)
          .where(eq(deckTags.deckId, parseInt(params.deckId)));
        if (form.data.tags)
          await createTags(form.data.tags, parseInt(params.deckId));
      }

      await dbHttp
        .update(decks)
        .set({
          title: form.data.deckTitle,
          description: form.data.deckDescription ?? null,
          lastUpdate: new Date(),
        })
        .where(eq(decks.id, parseInt(params.deckId)));

      // If the number of flashcards is the same, then we can update the flashcards
      if (deckInDb?.flashcards.length === form.data.flashcards.length) {
        for (let i = 0; i < form.data.flashcards.length; i++) {
          // updated flashcard
          const data = {
            ...form.data.flashcards[i],
            id: deckInDb?.flashcards[i].id,
          };
          await dbHttp
            .update(flashcards)
            .set(data)
            .where(eq(flashcards.id, data.id));
        }
      }

      // If the number of new flashcards is higher than in the db, then we need to create new flashcards or update the existing ones
      if (deckInDb?.flashcards.length! < form.data.flashcards.length) {
        let newFlashcards = [];
        for (let i = 0; i < form.data.flashcards.length; i++) {
          if (deckInDb?.flashcards[i] === undefined) {
            // new flashcard
            newFlashcards.push({ ...form.data.flashcards[i] });
          } else {
            // updated flashcard
            const data = {
              ...form.data.flashcards[i],
              id: deckInDb?.flashcards[i].id,
            };
            await dbHttp
              .update(flashcards)
              .set(data)
              .where(eq(flashcards.id, data.id));
          }
        }
        await createFlashcard(parseInt(params.deckId), newFlashcards);
      }

      // If the number of new flashcards is lower than in the db, then we need to delete the flashcards
      if (deckInDb?.flashcards.length! > form.data.flashcards.length) {
        await dbHttp
          .delete(flashcards)
          .where(eq(flashcards.deckId, parseInt(params.deckId)));
        await createFlashcard(parseInt(params.deckId), form.data.flashcards);
      }
    } catch (error) {
      if (error instanceof DatabaseError) {
        return message(form, error.message, { status: 500 });
      }
    }

    throw redirect(302, `/decks/${params.deckId}`);
  },
};
