<script lang="ts">
  import DisplayTags from "./displayTags.svelte";
  import type { Deck, DeckTags, User } from "$lib/server/db/schema";
  import { formatDate } from "$lib/utils/dateFormatter";

  type DecksWithTags<T, U> = Deck & { tags: T[]; user: U };

  export let deck: DecksWithTags<DeckTags, User>;
</script>

<a
  href="/decks/{deck.id}"
  class="h-full max-w-md card p-4 variant-ghost-primary flex gap-3 card-hover"
>
  <div class="min-w-0 break-words">
    <h2 class="h2 font-semibold" style:--deck_id="deck-{deck.id}">
      {deck.title}
    </h2>
    <p class="text-sm opacity-60">
      {formatDate(deck.createdAt)}
    </p>
    <p class="text-sm">
      <span class="opacity-60">Author:</span>
      <span class="font-semibold">
        {deck.user.username}
      </span>
    </p>
    <DisplayTags tags={deck.tags} />
    {#if deck.description}
      <div>
        <p>{deck.description}</p>
      </div>
    {/if}
  </div>
</a>

<style>
  h2 {
    view-transition-name: var(--deck_id);
  }
</style>
