<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";
  import FlashcardCard from "./flashcardCard.svelte";
  import ArrowLeft from "$lib/assets/arrowLeft.svelte";
  import ArrowRight from "$lib/assets/arrowRight.svelte";
  import { fly } from "svelte/transition";
  import { SlideToggle } from "@skeletonlabs/skeleton";

  export let flashcards: Flashcard[];

  let showLearned = true;

  $: filteredFlashcards = showLearned
    ? flashcards
    : flashcards.filter((flashcard) => flashcard.learned === false);

  let currentFlashcardIndex = 0;
  let previousIndex = 0;
  let showAnswer = false;

  $: maxIndex = filteredFlashcards.length - 1;

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

  // const switchShowCorrectFlashcards = () => {
  //   if (filteredFlashcards.length === 0) {
  //     showLearned = true;
  //     filteredFlashcards = flashcards;
  //     return;
  //   }
  //   if (showLearned) {
  //     filteredFlashcards = flashcards;
  //   } else if (!showLearned) {
  //     filteredFlashcards = flashcards.filter(
  //       (flashcard) => flashcard.learned === false
  //     );
  //   }
  // };
</script>

<svelte:window on:keydown={handleKeyDown} />

<div class="mt-10">
  {#key currentFlashcardIndex}
    <div
      in:fly={{
        x: previousIndex < currentFlashcardIndex ? 100 : -100,
        duration: 500,
      }}
    >
      <FlashcardCard
        flashcard={filteredFlashcards[currentFlashcardIndex] || flashcards[0]}
        {showAnswer}
        on:learnedChange={() => {
          if (!showLearned) {
            filteredFlashcards = filteredFlashcards.filter(
              (flashcard) => flashcard.learned === false
            );
            currentFlashcardIndex--;
          }
        }}
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
        {currentFlashcardIndex + 1}/{filteredFlashcards.length ||
          flashcards.length}
      </p>
    </div>

    <button
      on:click={() => handleChangeCard("next")}
      class="btn-icon btn-icon-lg variant-filled"
    >
      <ArrowRight />
    </button>
  </div>

  <SlideToggle
    name="showLearned"
    bind:checked={showLearned}
    on:change={() => {
      if (!showLearned) {
        currentFlashcardIndex = 0;
      }
    }}
  >
    {#if showLearned}
      Showing Learned
    {:else}
      Hiding Learned
    {/if}
  </SlideToggle>
</div>
