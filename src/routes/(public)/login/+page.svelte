<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";
  import Loader from "$lib/assets/loader.svelte";

  export let data: PageData;

  const { form, errors, constraints, enhance, message, delayed } = superForm(
    data.form
  );

  const focusInput = (e: HTMLInputElement) => {
    e.focus();
  };
</script>

<section class="flex flex-col justify-center items-center h-full">
  <div class="variant-soft card p-4">
    <h1 class="h1 card-header mb-4">Sign-in</h1>
    <form method="post" use:enhance>
      <div class="flex flex-col gap-3 border-t pt-4">
        <div>
          <label for="username" class="label">Username</label>
          <input
            use:focusInput
            bind:value={$form.username}
            {...$constraints.username}
            class:input-error={$errors.username}
            name="username"
            id="username"
            placeholder="username"
            class="input"
          />
          {#if $errors.username}
            <p class="text-xs text-error-500">{$errors.username}</p>
          {/if}
        </div>

        <div>
          <label for="password" class="label">Password</label>
          <input
            bind:value={$form.password}
            {...$constraints.password}
            class:input-error={$errors.password}
            type="password"
            name="password"
            id="password"
            placeholder="*****"
            class="input"
          />
          {#if $errors.password}
            <p class="text-xs text-error-500">{$errors.password}</p>
          {/if}
        </div>

        <button class="btn variant-filled"
          >Login
          {#if $delayed}
            <span class="animate-spin ml-2">
              <!-- ⏳ -->
              <Loader />
            </span>
          {/if}
        </button>
        {#if $message}
          <p class="text-primary-400">{$message}</p>
        {/if}
        <p class="text-sm">
          Don't have account? <a
            href="/signup"
            class="text-secondary-400 underline">sign-up instead</a
          >
        </p>
      </div>
    </form>
  </div>
</section>
