<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";

  export let flashcard: Flashcard;

  let showAnswer = false;

  const handleSwitchView = () => {
    showAnswer = !showAnswer;
  };
</script>

<div
  on:click={handleSwitchView}
  class="card card-hover p-6 grow max-w-xl text-xl md:text-3xl cursor-pointer text-center"
>
  {#if showAnswer}
    {flashcard.answer}
  {:else}
    {flashcard.question}
  {/if}
</div>
