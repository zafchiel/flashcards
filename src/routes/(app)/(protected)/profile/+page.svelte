<script lang="ts">
  import {
    Avatar,
    getToastStore,
    getModalStore,
    type ModalSettings,
  } from "@skeletonlabs/skeleton";
  import { enhance } from "$app/forms";
  import { errorToast } from "$lib/toasts/index.js";
  import { goto } from "$app/navigation";
  import LoaderIcon from "$lib/assets/loaderIcon.svelte";
  export let data;

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  let isDeleting: boolean = false;

  const modal: ModalSettings = {
    type: "confirm",
    title: "Are you sure?",
    body: `You will delete your account, this action cannot be undone`,
    // TRUE if confirm pressed, FALSE if cancel pressed
    response: async (r: boolean) => {
      if (r) {
        isDeleting = true;
        try {
          const res = await fetch(`/api/user`, {
            method: "DELETE",
          });

          if (res.ok) {
            modalStore.close();
            goto("auth?t=signup");
          } else {
            throw new Error();
          }
        } catch (error) {
          toastStore.trigger(errorToast);
        } finally {
          isDeleting = false;
        }
      }
    },
  };
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
      <p class="text-3xl break-words leading-none font-semibold">
        {data.user?.username}
      </p>
      <p class="text-sm opacity-60 leading-none">username</p>
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

<div class="py-8">
  <button
    on:click={(e) => {
      e.preventDefault();
      modalStore.trigger(modal);
    }}
    class="btn-sm variant-filled-error flex gap-2 items-center"
  >
    Delete Account
    {#if isDeleting}
      <span class="animate-spin ml-2">
        <LoaderIcon />
      </span>
    {/if}
  </button>
</div>
