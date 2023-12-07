import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { message, superValidate } from "sveltekit-superforms/server";
import { createDeck } from "$lib/server/actions/createDeck.js";
import { createFlashcard } from "$lib/server/actions/createFlashcard.js";
import { DatabaseError } from "@neondatabase/serverless";
import { createTags } from "$lib/server/actions/createTags.js";

export const _deckFormSchema = z.object({
  deckTitle: z
    .string()
    .min(3, { message: "Must contain at least 3 characters" })
    .max(31),
  deckDescription: z
    .string()
    .min(6, { message: "Must contain at least 6 characters" })
    .max(255)
    .optional(),
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
    .min(2, { message: "Must contain at least 2 flashcards" })
    .max(100),
  tags: z.array(z.string().max(50)).max(10).optional(),
});

export const load = async () => {
  const form = await superValidate(_deckFormSchema);
  return { form };
};

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, _deckFormSchema);
    let redirectId = null;

    if (!form.valid) {
      return fail(400, { form });
    }

    const { deckTitle, deckDescription, flashcards, tags } = form.data;

    try {
      const { newDeckId } = await createDeck(
        locals.user.userId,
        deckTitle,
        deckDescription
      );
      await createFlashcard(newDeckId, flashcards);
      if(tags && tags.length > 0) await createTags(tags, newDeckId);

      redirectId = newDeckId;
    } catch (error) {
      if (error instanceof DatabaseError) {
        return message(form, error.message, { status: 500 });
      }
    }

    throw redirect(302, `/decks/${redirectId}`);
  },
};
