<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";
  import Loader from "$lib/assets/loader.svelte";

  export let data: PageData;

  const { form, errors, constraints, enhance, message, delayed } = superForm(
    data.form,
    { dataType: "json" }
  );
</script>

<h1 class="h1 mb-10">Create new deck</h1>

<section>
  <form method="post" use:enhance>
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

    <h3 class="h3 p-3 font-semibold">Flashcards</h3>

    {#each $form.flashcards as _, i}
      <div>
        Question
        <input
          type="text"
          bind:value={$form.flashcards[i].question}
          class="input"
        />
      </div>

      <div>
        Answer
        <input
          type="text"
          bind:value={$form.flashcards[i].answer}
          class="input"
        />
      </div>
    {/each}
  </form>
</section>
