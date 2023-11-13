<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="h1 p-4">Decks Page</h1>
<section class="flex gap-3 flex-wrap">
  {#each data.result as deck (deck.id)}
    <a
      href="/profile/decks/${deck.id}"
      class="card p-4 variant-filled-primary block card-hover"
    >
      <div class="card-header">
        <h2 class="h2 font-semibold">{deck.title}</h2>
        <p class="text-sm text-opacity-70 text-surface-100">
          {new Date(deck.createdAt ?? "").toLocaleString("en-GB")}
        </p>
      </div>
      <div class="">
        <p>{deck.description}</p>
      </div>
    </a>
  {/each}
</section>
