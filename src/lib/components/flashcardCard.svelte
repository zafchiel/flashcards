<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";
  import { tooltip } from "$lib/actions/tooltip";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let flashcard: Flashcard;
  export let showAnswer: Boolean;

  const handleSwitchView = () => {
    showAnswer = !showAnswer;
  };

  const handleLearnedChange = (e: Event) => {
    flashcard.learned = (e.target as HTMLInputElement)?.checked;
    dispatch("learnedChange", { learned: flashcard.learned });
  };
</script>

<div class="container relative">
  {#if flashcard.learned !== null}
    <div class="absolute top-3 left-3 z-10">
      <input
        type="checkbox"
        id="starToggle"
        name="starToggle"
        class="hidden"
        on:change={handleLearnedChange}
      />
      <label
        for="starToggle"
        class="cursor-pointer"
        use:tooltip={{ content: "Mark as learned" }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill={flashcard.learned ? "currentColor" : "none"}
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          ><polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          /></svg
        >
      </label>
    </div>
  {/if}
  <button
    on:click={handleSwitchView}
    class:showAnswer
    class="card card-hover w-full flex justify-center items-center p-6 text-xl font-semibold md:text-3xl cursor-pointer min-h-[300px]"
  >
    {#if showAnswer}
      <div class="front text-primary-200">
        {flashcard.answer}
      </div>
    {:else}
      <div class="back text-secondary-200">
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
