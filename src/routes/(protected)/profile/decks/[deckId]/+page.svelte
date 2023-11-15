<script lang="ts">
  import { goto } from "$app/navigation";
  import DisplayFlashcards from "$lib/components/displayFlashcards.svelte";
  import {
    getModalStore,
    getToastStore,
    type ModalSettings,
    type ToastSettings,
  } from "@skeletonlabs/skeleton";

  const modalStore = getModalStore();
  const toastStore = getToastStore();
  export let data;

  const errorToast: ToastSettings = {
    message: "Something went wrong",
    timeout: 3000,
    background: "variant-filled-error",
  };
  const successToast: ToastSettings = {
    message: `Deck deleted successfully`,
    timeout: 3000,
    background: "variant-filled-success",
  };

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
          toastStore.trigger(successToast);
          goto("/profile/decks");
        } else toastStore.trigger(errorToast);
      }
    },
  };
</script>

<div class="flex flex-col md:flex-row flex-wrap justify-between items-center">
  <div>
    <h1 class="h1">
      {data.deck.title}
    </h1>
    <div class="opacity-60 text-sm">
      <p>Created: {data.deck.createdAt?.toLocaleString("en-GB")}</p>
      <p>Last Update: {data.deck.lastUpdate?.toLocaleString("en-GB")}</p>
    </div>
  </div>

  <div class="flex gap-5">
    <button class="btn md:btn-lg variant-outline-secondary">Edit</button>
    <button
      on:click={() => modalStore.trigger(modal)}
      class="btn md:btn-lg variant-outline-error">Delete</button
    >
  </div>
</div>

<div class="p-2">
  {#each data.tags as tag (tag.id)}
    <span class="chip variant-filled mr-2">{tag.tagName}</span>
  {/each}
</div>

<DisplayFlashcards flashcards={data.flashcards} />
