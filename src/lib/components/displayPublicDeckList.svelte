<script lang="ts">
  import { flip } from "svelte/animate";
  import type { Deck, DeckTags, User } from "$lib/server/db/schema";
  import PublicDeckCard from "./publicDeckCard.svelte";

  // typing sheningans
  type DecksWithTags<T, U> = Deck & { tags: T[]; user: U };

  export let decks: DecksWithTags<DeckTags, User>[];
</script>

<section class="grid gap-x-3 gap-y-2 grid-cols-1 sm:grid-cols-2">
  {#if decks.length === 0}
    <p>No decks found</p>
  {/if}
  {#each decks as deck (deck.id)}
    <div animate:flip={{ duration: 500 }}>
      <PublicDeckCard {deck} />
    </div>
  {/each}
</section>
