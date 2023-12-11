<script lang="ts">
  import { flip } from "svelte/animate";
  import type { Deck, DeckTags, User } from "$lib/server/db/schema";
  import PublicDeckCard from "./publicDeckCard.svelte";

  // typing sheningans
  type DecksWithTags<T, U> = Deck & { tags: T[]; user: U };

  export let decks: DecksWithTags<DeckTags, User>[];
</script>

<section class="flex gap-3 flex-wrap">
  {#if decks.length === 0}
    <p>No decks found</p>
  {/if}
  {#each decks as deck (deck.id)}
    <div animate:flip={{ duration: 500 }}>
      <PublicDeckCard {deck} />
    </div>
  {/each}
</section>
