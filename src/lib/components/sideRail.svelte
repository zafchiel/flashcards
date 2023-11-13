<script lang="ts">
  import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";

  export let user: { username: string; avatar: string; userId: string } | null;
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
    <AppRailAnchor href="/profile" selected={$page.url.pathname === "/profile"}
      >Profile</AppRailAnchor
    >
  </svelte:fragment>
</AppRail>
