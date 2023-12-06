<script lang="ts">
  import { tooltip } from "$lib/actions/tooltip";
  import { filteredFlashcards } from "$lib/stores/filteredFlashcards";

  export let currentFlashcardIndex: number;
  export let showAnswer: Boolean;

  const handleSwitchView = () => {
    showAnswer = !showAnswer;
  };

  const handleLearnedChange = (e: Event) => {
    $filteredFlashcards[currentFlashcardIndex].learned = (
      e.target as HTMLInputElement
    ).checked;
  };
</script>

<div class="container relative">
  {#if $filteredFlashcards[currentFlashcardIndex]}
    <!-- Is Leaner star icon -->
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
          fill={$filteredFlashcards[currentFlashcardIndex].learned
            ? "currentColor"
            : "none"}
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
      <div class="front dark:text-primary-200 text-primary-700">
        {$filteredFlashcards[currentFlashcardIndex].answer}
      </div>
    {:else}
      <div class="back dark:text-secondary-300 text-secondary-700">
        {$filteredFlashcards[currentFlashcardIndex].question}
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

  #starToggle + label:hover svg {
    fill: currentColor;
  }
</style>
