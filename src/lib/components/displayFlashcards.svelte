<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";
  import FlashcardCard from "./flashcardCard.svelte";
  import ArrowLeft from "$lib/assets/arrowLeft.svelte";
  import ArrowRight from "$lib/assets/arrowRight.svelte";
  import { fly } from "svelte/transition";
  import { SlideToggle } from "@skeletonlabs/skeleton";

  export let flashcards: Flashcard[];
  let filteredFlashcards: Flashcard[] = flashcards;
  let showLearned = true;

  let currentFlashcardIndex = 0;
  let previousIndex = 0;
  let showAnswer = false;

  const handleChangeCard = (direction: "next" | "prev") => {
    previousIndex = currentFlashcardIndex;
    switch (direction) {
      case "next":
        if (currentFlashcardIndex === filteredFlashcards.length - 1) {
          currentFlashcardIndex = 0;
        } else currentFlashcardIndex++;
        showAnswer = false;
        break;
      case "prev":
        if (currentFlashcardIndex === 0) {
          currentFlashcardIndex = filteredFlashcards.length - 1;
        } else currentFlashcardIndex--;
        showAnswer = false;
        break;
    }
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

  const switchShowCorrectFlashcards = () => {
    if (showLearned) {
      filteredFlashcards = flashcards;
    } else if (!showLearned) {
      filteredFlashcards = flashcards.filter(
        (flashcard) => flashcard.learned === false
      );
    }
  };
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
        flashcard={filteredFlashcards[currentFlashcardIndex] ??
          flashcards[currentFlashcardIndex]}
        {showAnswer}
        on:learnedChange={() => switchShowCorrectFlashcards()}
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
        {currentFlashcardIndex + 1}/{filteredFlashcards.length ??
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
    on:change={switchShowCorrectFlashcards}
  >
    {#if showLearned}
      Showing Learned
    {:else}
      Hiding Learned
    {/if}
  </SlideToggle>
</div>
