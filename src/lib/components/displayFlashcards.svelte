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

<div class="flex gap-2 md:gap-10 items-center justify-between">
  <button
    on:click={() => handleChangeCard("prev")}
    class="btn-icon btn-icon-lg variant-filled"
  >
    <ArrowLeft />
  </button>

  <FlashcardCard flashcard={flashcards[currentFlashcardIndex]} />

  <button
    on:click={() => handleChangeCard("next")}
    class="btn-icon btn-icon-lg variant-filled"
  >
    <ArrowRight />
  </button>
</div>
<div class="text-center">
  <p>{currentFlashcardIndex + 1}/{flashcards.length}</p>
</div>
