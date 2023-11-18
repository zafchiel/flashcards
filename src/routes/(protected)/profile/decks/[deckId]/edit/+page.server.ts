import { error, fail, redirect } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { z } from "zod";
import type { PageServerLoad } from "../$types";
import { getDeckWithFlashcardsAndTags } from "$lib/server/actions/getDeckWithFlashcardsAndTags";
import { DatabaseError } from "@neondatabase/serverless";
import { dbHttp } from "$lib/server/db";
import { decks, flashcards, deckTags } from "$lib/server/db/schema";
import { createFlashcard } from "$lib/server/actions/createFlashcard";
import { eq } from "drizzle-orm";
import { createTags } from "$lib/server/actions/createTags";

const schema = z.object({
  deckTitle: z
    .string()
    .min(3, { message: "Must contain at least 3 characters" })
    .max(31),
  deckDescription: z.string().max(255).optional(),
  flashcards: z
    .array(
      z.object({
        question: z
          .string()
          .min(1, { message: "Must contain at least 1 character" })
          .max(255),
        answer: z
          .string()
          .min(1, { message: "Must contain at least 1 character" })
          .max(255),
      })
    )
    .min(2)
    .max(100),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

export const load: PageServerLoad = async ({ locals, params }) => {
  const session = await locals.auth.validate();
  if (!session) throw redirect(302, "/");

  const deck = await getDeckWithFlashcardsAndTags(parseInt(params.deckId));
  if (!deck) throw error(404, "Deck not found");

  const tagsArray = deck.tags.map((tag) => tag.tagName);
  const deckFormInitData: z.infer<typeof schema> = {
    deckTitle: deck.title,
    deckDescription: deck.description ?? undefined,
    flashcards: deck.flashcards,
    tags: tagsArray,
  };

  const form = await superValidate(deckFormInitData, schema);
  return { form, deckId: deck.id };
};

export const actions = {
  default: async ({ request, params }) => {
    const form = await superValidate(request, schema);

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

      if (
        deckInDb?.title !== form.data.deckTitle ||
        deckInDb?.description !== form.data.deckDescription
      ) {
        await dbHttp
          .update(decks)
          .set({
            title: form.data.deckTitle,
            description: form.data.deckDescription,
          })
          .where(eq(decks.id, parseInt(params.deckId)));
      }

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
    } catch (error) {
      if (error instanceof DatabaseError) {
        return message(form, error.message, { status: 500 });
      }
    }

    throw redirect(302, `/profile/decks/${params.deckId}`);
  },
};
