<script lang="ts">
  import { AppRail, AppRailAnchor, Avatar } from "@skeletonlabs/skeleton";
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
        <p class="font-bold text-[1.25rem]">F\HUH</p>
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
      <AppRailAnchor
        href="/profile"
        selected={$page.url.pathname === "/profile"}
      >
        <div class="flex flex-col justify-center items-center">
          {#if user?.avatar}
            <Avatar
              src={user.avatar ?? undefined}
              initials={user.username.slice(0, 2)}
              alt="User Profile Avatar"
              width="w-10"
              rounded="ronded-md"
            />
          {/if}
          Profile
        </div>
      </AppRailAnchor>
    </svelte:fragment>
  </AppRail>
</aside>
