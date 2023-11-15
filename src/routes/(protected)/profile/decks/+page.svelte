<script lang="ts">
  import type { PageData } from "./$types";
  import DeckCard from "$lib/components/deckCard.svelte";

  export let data: PageData;
</script>

<div class="flex justify-between items-center">
  <h1 class="h1 p-4">Decks Page</h1>
  <a href="/profile/decks/create" class="btn md:btn-lg variant-outline-primary"
    >Create Deck</a
  >
</div>
<section class="flex gap-3 flex-wrap">
  {#each data.result as deck (deck.id)}
    <DeckCard {deck} />
  {/each}
</section>
