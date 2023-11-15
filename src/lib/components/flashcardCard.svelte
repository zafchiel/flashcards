<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";

  export let flashcard: Flashcard;
  export let showAnswer: Boolean;

  const handleSwitchView = () => {
    showAnswer = !showAnswer;
  };
</script>

<div class="container">
  <button
    on:click={handleSwitchView}
    class:showAnswer
    class="card card-hover w-full flex justify-center items-center p-6 text-xl font-semibold md:text-3xl cursor-pointer min-h-[300px]"
  >
    {#if showAnswer}
      <div class="front">
        {flashcard.answer}
      </div>
    {:else}
      <div class="back">
        {flashcard.question}
      </div>
    {/if}
  </button>
</div>

<style>
  .container {
    perspective: 100vh;
  }
  .card {
    transform: rotateX(180deg);
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .card.showAnswer {
    transform: rotateX(0);
  }
  .back,
  .front {
    backface-visibility: hidden;
  }
  .back {
    transform: rotateX(180deg);
  }
</style>
