<script lang="ts">
  import type { PageData } from "./$types";
  import DeckCard from "$lib/components/deckCard.svelte";
  import { flip } from "svelte/animate";

  export let data: PageData;
</script>

<div class="flex justify-between items-center">
  <h1 class="h1 p-4">Decks Page</h1>
  <a href="/decks/create" class="btn md:btn-lg variant-outline-primary"
    >Create Deck</a
  >
</div>
<section class="flex gap-3 flex-wrap items-stretch">
  {#if data.decks.length === 0}
    <p>No decks found</p>
  {/if}
  {#each data.decks as deck (deck.id)}
    <div animate:flip={{ duration: 500 }}>
      <DeckCard {deck} />
    </div>
  {/each}
</section>
