<script lang="ts">
  import DisplayFlashcards from "$lib/components/displayFlashcards.svelte";

  export let data;
</script>

<div class="flex flex-col md:flex-row justify-between items-center">
  <div>
    <h1 class="h1">
      {data.deck.title}
    </h1>
    <div class="opacity-60 text-sm">
      <p>Created: {data.deck.createdAt?.toLocaleString("en-GB")}</p>
      <p>Last Update: {data.deck.lastUpdate?.toLocaleString("en-GB")}</p>
    </div>
  </div>

  <div class="flex gap-5">
    <button class="btn md:btn-lg variant-outline-secondary">Edit</button>
    <button class="btn md:btn-lg variant-outline-error">Delete</button>
  </div>
</div>

<DisplayFlashcards flashcards={data.flashcards} />
