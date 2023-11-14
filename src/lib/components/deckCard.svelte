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
    <p class="text-sm opacity-60">
      {deck.createdAt?.toLocaleString("en-GB")}
    </p>
  </div>
  <div class="">
    <p>{deck.description}</p>
  </div>
</a>
