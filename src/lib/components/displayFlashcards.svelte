<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";
  import FlashcardCard from "./flashcardCard.svelte";
  import ArrowLeft from "$lib/assets/arrowLeft.svelte";
  import ArrowRight from "$lib/assets/arrowRight.svelte";

  export let flashcards: Flashcard[];

  let currentFlashcardIndex = 0;

  const handleChangeCard = (direction: "next" | "prev") => {
    switch (direction) {
      case "next":
        if (currentFlashcardIndex === flashcards.length - 1) {
          currentFlashcardIndex = 0;
        } else currentFlashcardIndex++;
        break;
      case "prev":
        if (currentFlashcardIndex === 0) {
          currentFlashcardIndex = flashcards.length - 1;
        } else currentFlashcardIndex--;
        break;
    }
  };
</script>

<div class="mt-10">
  <FlashcardCard flashcard={flashcards[currentFlashcardIndex]} />

  <div class="flex justify-between items-center p-3">
    <button
      on:click={() => handleChangeCard("prev")}
      class="btn-icon btn-icon-lg variant-filled"
    >
      <ArrowLeft />
    </button>

    <div class="text-center p-3">
      <p>{currentFlashcardIndex + 1}/{flashcards.length}</p>
    </div>

    <button
      on:click={() => handleChangeCard("next")}
      class="btn-icon btn-icon-lg variant-filled"
    >
      <ArrowRight />
    </button>
  </div>
</div>
