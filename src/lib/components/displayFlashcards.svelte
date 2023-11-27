<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";
  import FlashcardCard from "./flashcardCard.svelte";
  import ArrowLeft from "$lib/assets/arrowLeft.svelte";
  import ArrowRight from "$lib/assets/arrowRight.svelte";
  import { fly } from "svelte/transition";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { writable } from "svelte/store";
  import { onDestroy } from "svelte";
  import ShuffleIcon from "$lib/assets/shuffleIcon.svelte";
  import shuffleArray from "$lib/utils/shuffleArray";

  export let flashcards: Flashcard[];
  // create deep copy for comparison
  const initFlashcards = JSON.parse(JSON.stringify(flashcards));

  let showLearned = true;

  const filteredFlashcards = writable(flashcards);

  const unsub = filteredFlashcards.subscribe((values) => {
    if (values.length === 0) {
      alert("No flashcards to show");
      showLearned = true;
      $filteredFlashcards = flashcards;
    }
  });

  $: $filteredFlashcards = showLearned
    ? flashcards
    : flashcards.filter((flashcard) => flashcard.learned === false);

  let currentFlashcardIndex = 0;
  let previousIndex = 0;
  let showAnswer = false;

  $: maxIndex = $filteredFlashcards.length - 1;

  const handleChangeCard = (direction: "next" | "prev") => {
    previousIndex = currentFlashcardIndex;
    currentFlashcardIndex =
      direction === "next"
        ? currentFlashcardIndex === maxIndex
          ? 0
          : currentFlashcardIndex + 1
        : currentFlashcardIndex === 0
          ? maxIndex
          : currentFlashcardIndex - 1;

    showAnswer = false;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.code) {
      case "ArrowLeft":
        handleChangeCard("prev");
        break;
      case "ArrowRight":
        handleChangeCard("next");
        break;
      case "ArrowUp":
        showAnswer = true;
        break;
      case "ArrowDown":
        showAnswer = false;
        break;
      case "Space":
        showAnswer = !showAnswer;
        break;
    }
  };

  const handleLearnedChange = (e: CustomEvent) => {
    $filteredFlashcards[currentFlashcardIndex].learned = e.detail.learned;
  };

  onDestroy(() => {
    // Un subscribing from filteredFlashcards
    unsub();
    for (let i = 0; i < initFlashcards.length; i++) {
      if (initFlashcards[i].learned !== flashcards[i].learned) {
        fetch(`/api/flashcard?id=${flashcards[i].id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flashcards[i]),
        });
      }
    }
  });
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="md:mt-10 mt-3">
  {#key currentFlashcardIndex}
    <div
      in:fly={{
        x: previousIndex < currentFlashcardIndex ? 100 : -100,
        duration: 500,
      }}
    >
      <FlashcardCard
        flashcard={$filteredFlashcards[currentFlashcardIndex]}
        {showAnswer}
        on:learnedChange={handleLearnedChange}
      />
    </div>
  {/key}

  <div class="flex justify-between items-center p-3">
    <button
      on:click={() => handleChangeCard("prev")}
      class="btn-icon btn-icon-lg variant-filled"
    >
      <ArrowLeft />
    </button>

    <div class="text-center p-3">
      <p>
        {currentFlashcardIndex + 1}/{$filteredFlashcards.length}
      </p>
    </div>

    <button
      on:click={() => handleChangeCard("next")}
      class="btn-icon btn-icon-lg variant-filled"
    >
      <ArrowRight />
    </button>
  </div>

  <div class="flex items-center gap-3">
    <button
      on:click={() => {
        $filteredFlashcards = shuffleArray($filteredFlashcards);
      }}
      class="btn-icon variant-filled rounded-md"
    >
      <ShuffleIcon />
    </button>
    Shuffle deck
  </div>
  <br />

  <SlideToggle
    name="showLearned"
    bind:checked={showLearned}
    on:change={() => {
      if (!showLearned) {
        currentFlashcardIndex = 0;
      }
    }}
    active="bg-secondary-500"
  >
    {#if showLearned}
      Showing Learned
    {:else}
      Hiding Learned
    {/if}
  </SlideToggle>
</div>
