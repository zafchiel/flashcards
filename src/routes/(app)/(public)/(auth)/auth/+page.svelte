<script lang="ts">
  import { superForm } from "sveltekit-superforms/client";
  import type { PageData } from "./$types";
  import LoaderIcon from "$lib/assets/loaderIcon.svelte";
  import { page } from "$app/stores";
  import GithubIcon from "$lib/assets/githubIcon.svelte";
  import GoogleIcon from "$lib/assets/googleIcon.svelte";

  export let data: PageData;
  $: pageType = $page.url.searchParams.get("t");

  const { form, errors, constraints, enhance, message, delayed } = superForm(
    data.form
  );

  const focusInput = (e: HTMLInputElement) => {
    e.focus();
  };
</script>

<svelte:head>
  <title>{pageType === "signup" ? "Register" : "Login"} | Flashcards\HUH</title>
</svelte:head>

<section class="flex flex-col justify-center items-center h-full">
  <div class="variant-soft card p-4 shadow-md">
    <h1 class="h1 font-bold card-header mb-4">
      {#if pageType === "signup"}
        Create new account
      {:else}
        Sign-in
      {/if}
    </h1>

    <hr class="h-1 bg-surface-300 rounded-xl max-w-[60px] mx-auto my-5" />

    <form method="post" use:enhance action={`?/${pageType}`}>
      <div class="flex flex-col gap-3">
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

        {#if pageType === "signup"}
          <div>
            <label for="repeatPassword" class="label">Repeat Password</label>
            <input
              bind:value={$form.repeatPassword}
              {...$constraints.password}
              class:input-error={$errors.password}
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              placeholder="*****"
              class="input"
            />
            {#if $errors.repeatPassword}
              <p class="text-xs text-error-500">{$errors.repeatPassword}</p>
            {/if}
          </div>
        {/if}

        <button class="btn variant-filled mt-3 rounded-md">
          {#if pageType === "signup"}
            Register
          {:else}
            Login
          {/if}
          {#if $delayed}
            <span class="animate-spin ml-2">
              <!-- ⏳ -->
              <LoaderIcon />
            </span>
          {/if}
        </button>
        {#if pageType === "signup"}
          <p class="text-sm">
            Have account already? <a
              href="/auth?t=signin"
              class="text-secondary-400 underline">sign-in instead</a
            >
          </p>
        {:else}
          <p class="text-sm">
            Don't have account? <a
              href="/auth?t=signup"
              class="text-secondary-400 underline">sign-up instead</a
            >
          </p>
        {/if}
        {#if $message}
          <p class="text-primary-400">{$message}</p>
        {/if}

        <div class="flex gap-3 items-center justify-center px-2">
          <hr class="h-1 bg-surface-300 rounded-xl w-full mx-auto my-5" />
          <p class="uppercase text-center">or</p>
          <hr class="h-1 bg-surface-300 rounded-xl w-full mx-auto my-5" />
        </div>
        <a href="/auth/github" class="btn variant-outline-tertiary flex gap-2">
          <GithubIcon />
          <p>
            Continue with <span class="font-semibold">Github</span>
          </p>
        </a>
        <a href="/auth/google" class="btn variant-outline-tertiary flex gap-2">
          <GoogleIcon />
          <p>
            Continue with <span class="font-semibold">Google</span>
          </p>
        </a>
      </div>
    </form>
  </div>
</section>
