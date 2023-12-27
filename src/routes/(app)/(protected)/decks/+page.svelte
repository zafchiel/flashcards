<script lang="ts">
  import type { PageData } from "./$types";
  import PlusIcon from "$lib/assets/plusIcon.svelte";
  import DisplayDeckList from "$lib/components/displayDeckList.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Decks | Flashcards\HUH</title>
</svelte:head>

<div class="flex flex-col md:flex-row justify-between items-center mb-4">
  <h1 class="h1 p-4">Decks Page</h1>
  <a
    href="/decks/create"
    class="btn md:btn-lg variant-outline-primary flex items-center gap-1"
  >
    <PlusIcon />
    Create Deck
  </a>
</div>

<DisplayDeckList decks={data.decks} />
