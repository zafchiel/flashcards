<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let flashcard: Flashcard;

  export let showAnswer: Boolean;

  const handleSwitchView = () => {
    dispatch("switchView");
  };
</script>

<div
  on:click={handleSwitchView}
  class="card card-hover flex justify-center items-center p-6 text-xl font-semibold md:text-3xl cursor-pointer min-h-[300px]"
>
  {#if showAnswer}
    {flashcard.answer}
  {:else}
    {flashcard.question}
  {/if}
</div>
