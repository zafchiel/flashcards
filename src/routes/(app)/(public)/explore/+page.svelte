<script lang="ts">
  import type { PageData } from "./$types";
  import DisplayPublicDeckList from "$lib/components/displayPublicDeckList.svelte";
  import SearchInput from "$lib/components/searchInput.svelte";

  export let data: PageData;
  export let form;

  $: displayedDecks = form?.decks ? form.decks : data.decks;
</script>

<svelte:head>
  <title>Explore | Flashcards\HUH</title>
</svelte:head>

<div class="flex justify-between items-center">
  <h1 class="h1 p-4">Explore Decks</h1>
  <SearchInput />
</div>

<DisplayPublicDeckList decks={displayedDecks} />