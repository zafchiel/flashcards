<script lang="ts">
  import type { PageData } from "./$types";
  import DeckCard from "$lib/components/deckCard.svelte";

  export let data: PageData;
</script>

<h1 class="h1 p-4">Decks Page</h1>
<section class="flex gap-3 flex-wrap">
  {#each data.result as deck (deck.id)}
    <DeckCard {deck} />
  {/each}
</section>
