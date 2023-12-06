<script lang="ts">
  import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import type { User } from "lucia";
  import { LightSwitch } from "@skeletonlabs/skeleton";
  import DeckIcon from "$lib/assets/deckIcon.svelte";
  import GlobeIcon from "$lib/assets/globeIcon.svelte";

  export let user: User | undefined;
</script>

<aside>
  <AppRail>
    <svelte:fragment slot="lead">
      <AppRailAnchor href="/" selected={$page.url.pathname === "/"}>
        <p class="font-bold text-lg">F/HUH</p>
      </AppRailAnchor>
    </svelte:fragment>

    {#if user}
      <AppRailAnchor href="/decks" selected={$page.url.pathname === "/decks"}>
        <div class="flex flex-col items-center justify-center gap-1">
          <DeckIcon />
          <p>Dekcs</p>
        </div>
      </AppRailAnchor>
    {:else}
      <AppRailAnchor href="/signup" selected={$page.url.pathname === "/signup"}
        >Sign-Up</AppRailAnchor
      >
      <AppRailAnchor href="/login" selected={$page.url.pathname === "/login"}
        >Login</AppRailAnchor
      >
    {/if}

    <AppRailAnchor href="/explore" selected={$page.url.pathname === "/explore"}>
      <div class="flex flex-col items-center justify-center gap-1">
        <GlobeIcon />
        <p>Explore</p>
      </div>
    </AppRailAnchor>

    <svelte:fragment slot="trail">
      <div class="flex justify-center items-center p-3">
        <LightSwitch />
      </div>
      <AppRailAnchor
        href="/profile"
        selected={$page.url.pathname === "/profile"}
      >
        <div class="flex flex-col justify-center items-center">
          {#if user?.avatar}
            <img src={user.avatar} alt="User Avatar" class="w-10 h-10" />
          {/if}
          Profile
        </div>
      </AppRailAnchor>
    </svelte:fragment>
  </AppRail>
</aside>
