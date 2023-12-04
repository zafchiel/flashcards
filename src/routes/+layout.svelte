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

<slot />
