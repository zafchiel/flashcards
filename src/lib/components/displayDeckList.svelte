<script lang="ts">
  import { flip } from "svelte/animate";
  import DeckCard from "$lib/components/deckCard.svelte";
  import type { Deck, DeckTags } from "$lib/server/db/schema";

  // typing sheningans
  type DecksWithTags<T> = Deck & { tags: T[] };

  export let decks: DecksWithTags<DeckTags>[];
</script>

<section class="grid gap-x-3 gap-y-2 grid-cols-1 sm:grid-cols-2">
  {#if decks.length === 0}
    <p>No decks found</p>
  {/if}
  {#each decks as deck (deck.id)}
    <div animate:flip={{ duration: 500 }}>
      <DeckCard {deck} />
    </div>
  {/each}
</section>
