<script lang="ts">
  import "../app.postcss";
  import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
</script>

<div class="flex">
  <AppRail class="h-screen">
    <svelte:fragment slot="lead">
      <AppRailAnchor href="/" selected={$page.url.pathname === "/"}
        >Home</AppRailAnchor
      >
    </svelte:fragment>

    <AppRailAnchor href="/create" selected={$page.url.pathname === "/create"}
      >Create</AppRailAnchor
    >
    <AppRailAnchor href="/signup" selected={$page.url.pathname === "/signup"}
      >Sign-Up</AppRailAnchor
    >
    <AppRailAnchor href="/login" selected={$page.url.pathname === "/login"}
      >Login</AppRailAnchor
    >

    <svelte:fragment slot="trail">
      <AppRailAnchor
        href="/profile"
        selected={$page.url.pathname === "/profile"}>Profile</AppRailAnchor
      >
    </svelte:fragment>
  </AppRail>

  <main class="p-10">
    <slot />
  </main>
</div>
