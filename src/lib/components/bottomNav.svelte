<script lang="ts">
  import { TabGroup, TabAnchor } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
  import DeckIcon from "$lib/assets/deckIcon.svelte";
  import GlobeIcon from "$lib/assets/globeIcon.svelte";
  import type { User } from "lucia";
  import HomeIcon from "$lib/assets/homeIcon.svelte";

  export let user: User | undefined;
</script>

<nav class="fixed inset-x-0 bottom-0 z-50">
  <TabGroup
    padding="px-3 py-2"
    justify="justify-between"
    class="bg-surface-800"
  >
    <TabAnchor href="/" selected={$page.url.pathname === "/"}>
      <!-- <svelte:fragment slot="lead">
        <HomeIcon />
      </svelte:fragment> -->
      <p>Home</p>
    </TabAnchor>

    {#if user}
      <TabAnchor href="/decks" selected={$page.url.pathname === "/decks"}>
        <!-- <svelte:fragment slot="lead">
          <DeckIcon />
        </svelte:fragment> -->
        <p>Decks</p>
      </TabAnchor>

      <TabAnchor href="/explore" selected={$page.url.pathname === "/explore"}>
        <!-- <GlobeIcon /> -->
        <p>Explore</p>
      </TabAnchor>

      <TabAnchor href="/profile" selected={$page.url.pathname === "/profile"}>
        <!-- {#if user?.avatar}
          <img src={user.avatar} alt="User Avatar" class="w-10 h-10" />
        {:else} -->
        <p>Profile</p>
        <!-- {/if} -->
      </TabAnchor>
    {/if}
  </TabGroup>
</nav>
