<script lang="ts">
  import { Avatar, getToastStore } from "@skeletonlabs/skeleton";
  import { enhance } from "$app/forms";
  import { errorToast } from "$lib/toasts/index.js";
  export let data;
  export let form;

  const toastStore = getToastStore();

  $: if (form?.status === "failed") {
    toastStore.trigger(errorToast);
  }
</script>

<svelte:head>
  <title>Profile | Flashcards\HUH</title>
</svelte:head>

<div class="flex items-center justify-between mb-10">
  <h1 class="h1">Profile page</h1>
  <form method="post" action="?/logout" use:enhance>
    <button class="btn md:btn-lg variant-filled-secondary">Log-out</button>
  </form>
</div>

<div class="flex">
  <Avatar
    src={data.user?.avatar ?? undefined}
    initials={data.user?.username.slice(0, 2)}
    alt="User Profile Avatar"
    rounded="rounded-none"
    width="w-32"
  />
  <div class="flex flex-col justify-between pl-2 py-1">
    <div>
      <p class="text-3xl break-words font-semibold">
        {data.user?.username}
      </p>
      <p class="text-sm opacity-60">username</p>
    </div>

    <div>
      <p>
        Number of decks:
        <span class="opacity-60">
          {data.numberOfDecks}
        </span>
      </p>
    </div>
  </div>
</div>

<div class="py-4">
  <form method="post" action="?/delete" use:enhance>
    <button class="btn-sm variant-filled-error">Delete Account</button>
    <p>This action cannot be undone!</p>
  </form>
</div>
