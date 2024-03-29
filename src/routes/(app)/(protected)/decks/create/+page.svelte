<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";
  import LoaderIcon from "$lib/assets/loaderIcon.svelte";
  import { InputChip } from "@skeletonlabs/skeleton";
  import Trash from "$lib/assets/trashIcon.svelte";

  export let data: PageData;

  const { form, errors, constraints, enhance, delayed } = superForm(data.form, {
    dataType: "json",
  });

  const addNewFlashcard = () => {
    form.update(
      ($form) => {
        $form.flashcards.push({ question: "", answer: "" });
        return $form;
      },
      { taint: false }
    );
    return false;
  };

  const removeFlashcard = (index: number) => {
    form.update(
      ($form) => {
        $form.flashcards.splice(index, 1);
        return $form;
      },
      { taint: false }
    );
  };

  addNewFlashcard();
  addNewFlashcard();
</script>

<h1 class="h1 md:mb-10 mb-3">Create new deck</h1>

<section>
  <form method="post" use:enhance>
    <h2 class="h2 p-3 text-primary-500 font-semibold">Deck details</h2>

    <div>
      <label for="deckTitle" class="label">Deck title</label>
      <input
        bind:value={$form.deckTitle}
        {...$constraints.deckTitle}
        class:input-error={$errors.deckTitle}
        name="deckTitle"
        id="deckTitle"
        placeholder="Deck title"
        class="input"
      />
      {#if $errors.deckTitle}
        <p class="text-error-500 text-sm">{$errors.deckTitle}</p>
      {/if}
    </div>

    <div>
      <label for="deckDescription" class="label">Deck description</label>
      <textarea
        bind:value={$form.deckDescription}
        {...$constraints.deckDescription}
        class:input-error={$errors.deckDescription}
        name="deckDescription"
        id="deckDescription"
        placeholder="Deck description"
        class="textarea"
      />
      {#if $errors.deckDescription}
        <p class="text-error-500 text-sm">{$errors.deckDescription}</p>
      {/if}
    </div>

    <div>
      <label for="tags" class="label">Tags</label>
      <InputChip
        bind:value={$form.tags}
        name="tags"
        rounded="rounded-md"
        placeholder="Write any tag and click enter"
      />
    </div>

    <h2 class="h2 p-3 mt-2 text-primary-500 font-semibold">Flashcards</h2>
    {#if $errors.flashcards?._errors}
      <p class="text-error-500 text-sm">{$errors.flashcards._errors}</p>
    {/if}

    {#each $form.flashcards as _, i}
      <div
        class="relative flex flex-col sm:flex-row sm:gap-3 justify-stretch card p-5 mb-3 rounded-tl-none"
      >
        <!-- Nr of flashcard badge -->
        <div
          class="index-badge w-7 h-7 pl-1 variant-soft-primary absolute top-0 left-0 z-10"
        >
          {i + 1}
        </div>

        <div class="flex-grow">
          <label
            for="question-{i}"
            class="label font-semibold text-secondary-700">Question</label
          >
          <textarea
            bind:value={$form.flashcards[i].question}
            class:input-error={$errors.flashcards?.[i]?.question}
            class="textarea mb-2"
            name="question-{i}"
            id="question-{i}"
          />
          {#if $errors.flashcards?.[i]?.question}
            <p class="text-error-500 text-sm">
              {$errors.flashcards[i].question}
            </p>
          {/if}

          <label for="answer-{i}" class="label font-semibold text-primary-700"
            >Answer</label
          >
          <textarea
            bind:value={$form.flashcards[i].answer}
            class:input-error={$errors.flashcards?.[i]?.answer}
            class="textarea"
            name="answer-{i}"
            id="answer-{i}"
          />
          {#if $errors.flashcards?.[i]?.answer}
            <p class="text-error-500 text-sm">
              {$errors.flashcards[i].answer}
            </p>
          {/if}
        </div>

        <button
          type="button"
          on:click={() => removeFlashcard(i)}
          class="btn-icon-sm btn-icon variant-outline-error self-end sm:self-auto order-first sm:order-last"
          ><Trash /></button
        >
      </div>
    {/each}
    <div class="flex justify-between items-center">
      <button
        type="button"
        on:click={addNewFlashcard}
        class="btn variant-outline-primary">Add Flashcard</button
      >

      <button class="btn variant-filled-primary"
        >Create Deck
        {#if $delayed}
          <span class="animate-spin ml-2">
            <LoaderIcon />
          </span>
        {/if}
      </button>
    </div>
  </form>
</section>

<style>
  .index-badge {
    -webkit-clip-path: circle(100.2% at 0 0);
    clip-path: circle(100.2% at 0 0);
  }
</style>
