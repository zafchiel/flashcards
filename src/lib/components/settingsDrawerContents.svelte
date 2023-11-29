<script lang="ts">
  import { getDrawerStore, SlideToggle } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import { onDestroy } from "svelte";

  const drawerStore = getDrawerStore();

  // Update deck settings on closing modal
  onDestroy(async () => {
    await fetch(`/api/decks?deckId=${$page.params.deckId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public: $drawerStore.meta.public,
      }),
    });
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
