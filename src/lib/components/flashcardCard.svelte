<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let flashcard: Flashcard;
  export let showAnswer: Boolean;

  let flipped = false;

  const handleSwitchView = () => {
    dispatch("switchView");
    flipped = !flipped;
  };
</script>

<div class="container">
  <div
    on:click={handleSwitchView}
    class:flipped
    class="card card-hover flex justify-center items-center p-6 text-xl font-semibold md:text-3xl cursor-pointer min-h-[300px]"
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
  </div>
</div>

<style>
  .container {
    perspective: 100vh;
  }
  .card {
    transform: rotateX(0);
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  .card.flipped {
    transform: rotateX(180deg);
  }
  /* .back,
  .front {
    backface-visibility: hidden;
  } */
  .back {
    transform: rotateX(180deg);
  }
</style>
