<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="h1">Decks Page</h1>
{#each data.result as deck (deck.id)}
  <div>
    <p>{deck.title}</p>
  </div>
{/each}
