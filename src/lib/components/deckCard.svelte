<script lang="ts">
  import TrashIcon from "$lib/assets/trashIcon.svelte";
  import EditIcon from "$lib/assets/editIcon.svelte";
  import {
    getModalStore,
    getToastStore,
    type ModalSettings,
  } from "@skeletonlabs/skeleton";
  import DisplayTags from "./displayTags.svelte";
  import { goto, invalidate } from "$app/navigation";
  import { errorToast, successDeleteToast } from "$lib/toasts";
  import { tooltip } from "$lib/actions/tooltip";
  import type { Deck, DeckTags } from "$lib/server/db/schema";
  import { formatDate } from "$lib/utils/dateFormatter";

  type DecksWithTags<T> = Deck & { tags: T[] };

  export let deck: DecksWithTags<DeckTags>;

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  let isDeleting: boolean = false;

  const modal: ModalSettings = {
    type: "confirm",
    title: "Are you sure?",
    body: `You will delete <span class="text-error-500 font-semibold uppercase">${deck.title}</span> deck, this action cannot be undone`,
    // TRUE if confirm pressed, FALSE if cancel pressed
    response: async (r: boolean) => {
      if (r) {
        isDeleting = true;
        try {
          const res = await fetch(`/api/decks?deckId=${deck.id}`, {
            method: "DELETE",
          });
          const response = await res.json();

          if (response.success) {
            modalStore.close();
            invalidate("invalidate:decks");
            toastStore.trigger(successDeleteToast);
          } else {
            throw new Error(response.message);
          }
        } catch (error) {
          toastStore.trigger(errorToast);
        } finally {
          isDeleting = false;
        }
      }
    },
  };
</script>

<a
  href="/decks/{deck.id}"
  class="h-full max-w-md card p-4 variant-ghost-primary flex justify-between gap-3 card-hover"
  class:deleting-animation={isDeleting}
>
  <div class="min-w-0 break-words">
    <h2 class="h2 font-semibold" style:--deck_id="deck-{deck.id}">
      {deck.title}
    </h2>
    <p class="text-sm opacity-60">
      {formatDate(deck.createdAt)}
    </p>
    <DisplayTags tags={deck.tags} />
    {#if deck.description}
      <div>
        <p>{deck.description}</p>
      </div>
    {/if}
  </div>
  <div class="flex flex-col gap-2">
    <button
      use:tooltip={{ content: "Edit deck" }}
      on:click={(e) => {
        e.preventDefault();
        goto(`/decks/${deck.id}/edit`);
      }}
      class="btn-icon btn-icon-sm variant-filled-secondary"
    >
      <EditIcon />
    </button>
    <button
      use:tooltip={{ content: "Delete deck" }}
      on:click={(e) => {
        e.preventDefault();
        modalStore.trigger(modal);
      }}
      class="btn-icon btn-icon-sm variant-outline-error"
    >
      <TrashIcon />
    </button>
  </div>
</a>

<style>
  .deleting-animation {
    opacity: 0.7;
    animation: pulsing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulsing {
    50% {
      opacity: 0.3;
    }
  }

  h2 {
    view-transition-name: var(--deck_id);
  }
</style>
