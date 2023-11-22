<script lang="ts">
  import Trash from "$lib/assets/trash.svelte";
  import Edit from "$lib/assets/edit.svelte";
  import {
    getModalStore,
    getToastStore,
    type ModalSettings,
  } from "@skeletonlabs/skeleton";
  import DisplayTags from "./displayTags.svelte";
  import { goto, invalidate } from "$app/navigation";
  import { errorToast, successDeleteToast } from "$lib/toasts";
  import { tooltip } from "$lib/actions/tooltip";

  export let deck: {
    id: number;
    userId: string;
    title: string;
    description: string | null;
    public: boolean | null;
    createdAt: Date | null;
    lastUpdate: Date | null;
    tags: {
      id: number;
      deckId: number | null;
      tagName: string;
    }[];
  };

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  let isDeleting: boolean = false;

  const modal: ModalSettings = {
    type: "confirm",
    title: "Are you sure",
    body: `You will delete <span class="text-error-500 font-semibold uppercase">${deck.title}</span> deck, this action cannot be undone`,
    // TRUE if confirm pressed, FALSE if cancel pressed
    response: async (r: boolean) => {
      if (r) {
        const res = await fetch(`/api/decks?deckId=${deck.id}`, {
          method: "DELETE",
        });
        const response = await res.json();
        if (response.success) {
          isDeleting = true;
          modalStore.close();
          invalidate("/api/decks");
          toastStore.trigger(successDeleteToast);
        } else {
          isDeleting = false;
          toastStore.trigger(errorToast);
        }
      }
    },
  };
</script>

<a
  href="/profile/decks/{deck.id}"
  class="h-full max-w-md card p-4 variant-filled-primary flex gap-3 card-hover"
  class:deleting-animation={isDeleting}
>
  <div class="min-w-0 break-words">
    <h2 class="h2 font-semibold">{deck.title}</h2>
    <p class="text-sm opacity-60">
      {deck.createdAt?.toLocaleString("en-GB")}
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
      on:click={(e) => {
        e.preventDefault();
        goto(`/profile/decks/${deck.id}/edit`);
      }}
      class="btn-icon btn-icon-sm variant-filled"
      use:tooltip
    >
      <Edit />
    </button>
    <button
      on:click={(e) => {
        e.preventDefault();
        modalStore.trigger(modal);
      }}
      class="btn-icon btn-icon-sm variant-filled-error"
    >
      <Trash />
    </button>
  </div>
</a>

<style>
  .deleting-animation {
    opacity: 0.7;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  @keyframes pulsing {
    50% {
      opacity: 0.5;
    }
  }
</style>
