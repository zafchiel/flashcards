<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";
  import FlashcardCard from "./flashcardCard.svelte";
  import ArrowLeft from "$lib/assets/arrowLeft.svelte";
  import ArrowRight from "$lib/assets/arrowRight.svelte";
  import { fly } from "svelte/transition";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { onDestroy, onMount } from "svelte";
  import ShuffleIcon from "$lib/assets/shuffleIcon.svelte";
  import shuffleArray from "$lib/utils/shuffleArray";
  import { tooltip } from "$lib/actions/tooltip";
  import SettingsDrawer from "./settingsDrawer.svelte";
  import { getToastStore } from "@skeletonlabs/skeleton";
  import { allFlashcardsLearnedToast } from "$lib/toasts";
  import { getFitleredFlashcardsStore } from "$lib/stores/filteredFlashcards";

  const toastStore = getToastStore();
  const filteredFlashcards = getFitleredFlashcardsStore();

  export let isPublic: boolean;
  export let isOwner: boolean;
  export let flashcards: Flashcard[];
  $filteredFlashcards = flashcards;
  // create deep copy for comparison
  const initFlashcards = JSON.parse(JSON.stringify(flashcards));

  let showLearned = true;
  let currentFlashcardIndex = 0;
  let previousIndex = 0;
  let showAnswer = false;


  const unsub = filteredFlashcards.subscribe((values) => {
    if (values.length === 0) {
      toastStore.trigger(allFlashcardsLearnedToast);
      showLearned = true;
      $filteredFlashcards = flashcards;
    }
    showLearned = showLearned;
  });

  $: $filteredFlashcards = showLearned
    ? flashcards
    : flashcards.filter((flashcard) => flashcard.learned === false);

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

  // If not owner, reset learned to false
  if (!isOwner) {
    onMount(() => {
      $filteredFlashcards = $filteredFlashcards.map((flashcard) => ({
        ...flashcard,
        learned: false,
      }));
    });
  }

  onDestroy(() => {
    // Un subscribing from filteredFlashcards
    unsub();

    // If not owner, don't save
    if (!isOwner) return;

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
      <FlashcardCard {currentFlashcardIndex} {showAnswer} />
    </div>
  {/key}

  <!-- Controls Component -->
  <div class="flex justify-between gap-3 items-center p-3">
    <button
      use:tooltip={{ content: "Shuffle flashcards" }}
      on:click={() => {
        $filteredFlashcards = shuffleArray($filteredFlashcards);
      }}
    >
      <ShuffleIcon />
    </button>

    <!-- Navigation -->
    <div class="flex gap-3">
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

    <div class:pointer-events-none={!isOwner} class:opacity-50={!isOwner}>
      <SettingsDrawer {isPublic} />
    </div>
  </div>

  <SlideToggle
    name="showLearned"
    bind:checked={showLearned}
    on:change={() => {
      if (!showLearned) {
        currentFlashcardIndex = 0;
      }
    }}
    active="bg-secondary-500"
    class="mt-10"
  >
    {#if showLearned}
      Showing Learned
    {:else}
      Hiding Learned
    {/if}
  </SlideToggle>
</div>
