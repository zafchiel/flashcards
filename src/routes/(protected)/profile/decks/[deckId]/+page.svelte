<script lang="ts">
  import DisplayFlashcards from "$lib/components/displayFlashcards.svelte";

  export let data;
</script>

<h1 class="h1">
  {data.deck.title}
</h1>
<div class="opacity-60 text-sm">
  <p>Created: {data.deck.createdAt?.toLocaleString("en-GB")}</p>
  <p>Last Update: {data.deck.lastUpdate?.toLocaleString("en-GB")}</p>
</div>

<DisplayFlashcards flashcards={data.flashcards} />
