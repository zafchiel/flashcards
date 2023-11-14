<script lang="ts">
  import type { Deck } from "$lib/server/db/schema";

  export let deck: Deck;
</script>

<a
  href="/profile/decks/{deck.id}"
  class="card p-4 variant-filled-primary block card-hover"
>
  <div class="">
    <h2 class="h2 font-semibold">{deck.title}</h2>
    <p class="text-sm text-opacity-70 text-surface-100">
      {deck.createdAt
        ? new Date(deck.createdAt).toLocaleString("en-GB")
        : new Date().toLocaleString("en-GB")}
    </p>
  </div>
  <div class="">
    <p>{deck.description}</p>
  </div>
</a>
