<script lang="ts">
  import type { PageData } from "./$types";
  import DisplayPublicDeckList from "$lib/components/displayPublicDeckList.svelte";
  import SearchInput from "$lib/components/searchInput.svelte";

  export let data: PageData;
</script>

<svelte:head>
  <title>Explore | Flashcards\HUH</title>
</svelte:head>

<div class="flex flex-col md:flex-row justify-between mb-4">
  <h1 class="h1 p-4">Explore Decks</h1>
  <SearchInput />
</div>

{#await data.streamed.decks}
  <section class="flex gap-3 flex-wrap">
    <div class="placeholder h-40 w-60" />
    <div class="placeholder h-40 w-60" />
    <div class="placeholder h-40 w-60" />
    <div class="placeholder h-40 w-60" />
  </section>
{:then decks}
  <DisplayPublicDeckList {decks} />
{/await}
