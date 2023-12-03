<script lang="ts">
  import {
    Drawer,
    Modal,
    Toast,
    getDrawerStore,
    initializeStores,
  } from "@skeletonlabs/skeleton";
  import { onNavigate } from "$app/navigation";
  import SettingsDrawerContents from "$lib/components/settingsDrawerContents.svelte";
  import "../app.postcss";
  import type { LayoutData } from "./$types";
  import ProgressBar from "$lib/components/progressBar.svelte";
  import SideRail from "$lib/components/sideRail.svelte";

  export let data: LayoutData;

  initializeStores();

  const drawerStore = getDrawerStore();

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<Drawer>
  {#if $drawerStore.id === "settingsDrawer"}
    <SettingsDrawerContents />
  {/if}
</Drawer>
<Modal />
<Toast />

<!-- Show side rail only if user is logged in -->
{#if data.user}
  <div class="flex">
    <SideRail user={data.user} />
    <main
      class="p-3 md:p-10 relative w-full h-screen overflow-y-auto overflow-x-hidden max-w-4xl"
    >
      <ProgressBar />
      <slot />
    </main>
  </div>
{:else}
  <slot />
{/if}
