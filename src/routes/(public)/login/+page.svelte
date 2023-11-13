<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";

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
            bind:value={$form.username}
            {...$constraints.username}
            name="username"
            id="username"
            placeholder="username"
            class="input"
          />
          {#if $errors.username}
            <span>{$errors.username}</span>
          {/if}
        </div>

        <div>
          <label for="password" class="label">Password</label>
          <input
            bind:value={$form.password}
            {...$constraints.password}
            type="password"
            name="password"
            id="password"
            placeholder="*****"
            class="input"
          />
          {#if $errors.password}
            <span>{$errors.password}</span>
          {/if}
        </div>

        <button class="btn variant-filled"
          >Login
          {#if $delayed}
            <span class="animate-spin ml-2">⏳</span>
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
