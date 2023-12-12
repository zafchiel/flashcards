<script lang="ts">
  import {
    getDrawerStore,
    getToastStore,
    SlideToggle,
  } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import { onDestroy } from "svelte";
  import {
    errorToast,
    savingSettingsStateToast,
    successSavedSettignsToast,
  } from "$lib/toasts";

  const drawerStore = getDrawerStore();
  const toastStore = getToastStore();

  // To compare stingified settings
  const initialSettings = JSON.stringify($drawerStore.meta);

  // Update deck settings on closing modal
  onDestroy(async () => {
    // If nothing changed, don't send request
    if (initialSettings === JSON.stringify($drawerStore.meta)) return;

    const watingStateToastId = toastStore.trigger(savingSettingsStateToast);

    const res = await fetch(`/api/decks?deckId=${$page.params.deckId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public: $drawerStore.meta.isPublic,
      }),
    });
    if (!res.ok) {
      toastStore.trigger(errorToast);
    } else {
      toastStore.close(watingStateToastId);
      toastStore.trigger(successSavedSettignsToast);
    }
  });
</script>

<div class="p-4">
  <div class="flex justify-between border-b pb-2">
    <div>
      <h3 class="h3 font-semibold leading-none">Settings</h3>
      <p class="text-sm opacity-60">Saved automatically on close</p>
    </div>
    <button
      class="btn variant-outline-warning"
      on:click={() => {
        drawerStore.close();
      }}
      >Close
    </button>
  </div>

  <div class="p-1">
    <p>Should this deck be visible to anybody?</p>
    <SlideToggle
      bind:checked={$drawerStore.meta.isPublic}
      name="switchPublic"
      active="bg-secondary-500"
    >
      <div class="cursor-pointer">
        {#if $drawerStore.meta.isPublic}
          <p>Public</p>
        {:else}
          <p>Private</p>
        {/if}
      </div>
    </SlideToggle>
  </div>
</div>
