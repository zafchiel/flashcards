<script lang="ts">
  import { goto } from "$app/navigation";
  import DisplayFlashcards from "$lib/components/displayFlashcards.svelte";
  import DisplayTags from "$lib/components/displayTags.svelte";
  import { errorToast, successDeleteToast } from "$lib/toasts/index.js";
  import {
    getModalStore,
    getToastStore,
    type ModalSettings,
  } from "@skeletonlabs/skeleton";

  const modalStore = getModalStore();
  const toastStore = getToastStore();
  export let data;

  const modal: ModalSettings = {
    type: "confirm",
    title: "Are you sure",
    body: `You will delete <span class="text-error-500 font-semibold uppercase">${data.deck.title}</span> deck, this action cannot be undone`,
    // TRUE if confirm pressed, FALSE if cancel pressed
    response: async (r: boolean) => {
      if (r) {
        const res = await fetch(`/api/decks?deckId=${data.deck.id}`, {
          method: "DELETE",
        });
        const response = await res.json();
        if (response.success) {
          modalStore.close();
          toastStore.trigger(successDeleteToast);
          goto("/profile/decks");
        } else toastStore.trigger(errorToast);
      }
    },
  };
</script>

<div
  class="flex flex-col md:flex-row flex-wrap justify-between md:items-center"
>
  <div>
    <h1
      class="h1 text-primary-500 font-bold"
      style:--deck_id="deck-{data.deck.id}"
    >
      {data.deck.title}
    </h1>
    <div class="opacity-60 text-sm">
      <p>Created: {data.deck.createdAt?.toLocaleString("en-GB")}</p>
      <p>Last Update: {data.deck.lastUpdate?.toLocaleString("en-GB")}</p>
    </div>
    <DisplayTags tags={data.tags} />
  </div>

  <div class="flex md:flex-col gap-5">
    <button
      on:click={() => modalStore.trigger(modal)}
      class="btn md:btn-lg variant-outline-error flex-1 min-w-0"
    >
      Delete
    </button>
    <a
      href={`/decks/${data.deck.id}/edit`}
      class="btn md:btn-lg variant-outline-secondary flex-1 min-w-0"
    >
      Edit
    </a>
  </div>
</div>

<DisplayFlashcards flashcards={data.flashcards} />

<style>
  h1 {
    view-transition-name: var(--deck_id);
  }
</style>
