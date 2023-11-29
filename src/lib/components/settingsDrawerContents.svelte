<script lang="ts">
  import {
    getDrawerStore,
    getToastStore,
    SlideToggle,
  } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import { onDestroy } from "svelte";
  import { errorToast, successSavedSettignsToast } from "$lib/toasts";

  const drawerStore = getDrawerStore();
  const toastStore = getToastStore();

  // To compare stingified settings
  const initialSettings = JSON.stringify($drawerStore.meta);

  // Update deck settings on closing modal
  onDestroy(async () => {
    if (initialSettings === JSON.stringify($drawerStore.meta)) return;

    const res = await fetch(`/api/decks?deckId=${$page.params.deckId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public: $drawerStore.meta.public,
      }),
    });
    if (!res.ok) {
      toastStore.trigger(errorToast);
    } else {
      toastStore.trigger(successSavedSettignsToast);
    }
  });
</script>

<div class="p-4">
  <h3 class="h3 font-semibold mb-2">Settings</h3>
  <div class="p-1">
    <p>Should this deck be visible to anybody?</p>
    <SlideToggle
      bind:checked={$drawerStore.meta.public}
      name="switchPublic"
      active="bg-secondary-500"
    >
      {#if $drawerStore.meta.public}
        <p>Public</p>
      {:else}
        <p>Private</p>
      {/if}
    </SlideToggle>
  </div>
</div>
