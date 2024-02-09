<script lang="ts">
  import { goto } from "$app/navigation";
  import DisplayFlashcards from "$lib/components/displayFlashcards.svelte";
  import DisplayTags from "$lib/components/displayTags.svelte";
  import {
    errorToast,
    succesSavinDeckAsYoursToast,
    successDeleteToast,
  } from "$lib/toasts/index.js";
  import {
    getModalStore,
    getToastStore,
    getDrawerStore,
    type ModalSettings,
  } from "@skeletonlabs/skeleton";
  import type { ActionData } from "./$types.js";
  import { enhance } from "$app/forms";
  import LoaderIcon from "$lib/assets/loaderIcon.svelte";
  import { formatDate } from "$lib/utils/dateFormatter";

  export let data;
  export let form: ActionData;

  const drawerStore = getDrawerStore();
  const modalStore = getModalStore();
  const toastStore = getToastStore();

  // Update deck settings in drawer on initialising component
  $drawerStore.meta = {
    isPublic: data.deck.public,
  };

  let isFormLoading = false;

  // If saving deck as yours was successful, redirect to new deck page
  $: if (form?.success) {
    toastStore.trigger(succesSavinDeckAsYoursToast);
    goto(`/decks/${form.newDeckId}`);
  }

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
          goto("/decks");
        } else toastStore.trigger(errorToast);
      }
    },
  };
</script>

<svelte:head>
  <title>{data.deck.title}</title>
  <meta
    name="description"
    content={`This is description of the deck ${data.deck.description}`}
  />
</svelte:head>

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
      {#if !data.isOwner}
        <p class="text-sm opacity-60">Save as your to edit</p>
      {/if}
    <div class="text-sm">
      <p>
        <span class="opacity-60">Created At:</span>
        {formatDate(data.deck.createdAt)}
      </p>
      <p>
        <span class="opacity-60">Last Update:</span>
        {formatDate(data.deck.lastUpdate)}
      </p>
    </div>
    <DisplayTags tags={data.deck.tags} />
  </div>

  {#if data.isOwner}
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
  {:else}
    <div>
      <form
        method="post"
        action="?/saveDeck"
        use:enhance={() => {
          setTimeout(() => {
            isFormLoading = true;
          }, 300);
          return async ({ update }) => {
            isFormLoading = false;
            update();
          };
        }}
      >
        <button class="btn md:btn-lg variant-outline-secondary">
          Save as yours
          {#if isFormLoading}
            <span class="animate-spin ml-2">
              <!-- ⏳ -->
              <LoaderIcon />
            </span>
          {/if}
        </button>
      </form>
    </div>
  {/if}
</div>

<DisplayFlashcards
  isPublic={data.deck.public}
  flashcards={data.deck.flashcards}
  isOwner={data.isOwner}
/>

<style>
  h1 {
    view-transition-name: var(--deck_id);
  }
</style>
