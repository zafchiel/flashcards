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
  class="card card-hover flex justify-center items-center p-6 text-xl font-semibold md:text-3xl cursor-pointer min-h-[300px]"
>
  {#if showAnswer}
    {flashcard.answer}
  {:else}
    {flashcard.question}
  {/if}
</div>
