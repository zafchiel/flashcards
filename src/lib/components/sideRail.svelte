<script lang="ts">
  import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import type { User } from "lucia";

  export let user: User | null;
</script>

<AppRail class="h-screen">
  <svelte:fragment slot="lead">
    <AppRailAnchor href="/" selected={$page.url.pathname === "/"}
      >Home</AppRailAnchor
    >
  </svelte:fragment>

  {#if user}
    <AppRailAnchor
      href="/profile/decks"
      selected={$page.url.pathname === "/profile/decks"}>Dekcs</AppRailAnchor
    >
  {:else}
    <AppRailAnchor href="/signup" selected={$page.url.pathname === "/signup"}
      >Sign-Up</AppRailAnchor
    >
    <AppRailAnchor href="/login" selected={$page.url.pathname === "/login"}
      >Login</AppRailAnchor
    >
  {/if}

  <svelte:fragment slot="trail">
    <AppRailAnchor href="/profile" selected={$page.url.pathname === "/profile"}>
      <div class="flex flex-col justify-center items-center">
        {#if user?.avatar}
          <img src={user.avatar} alt="User Avatar" class="w-10 h-10" />
        {/if}
        Profile
      </div>
    </AppRailAnchor>
  </svelte:fragment>
</AppRail>
