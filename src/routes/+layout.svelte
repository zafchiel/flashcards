<script lang="ts">
  import ProgressBar from "$lib/components/progressBar.svelte";
  import SideRail from "$lib/components/sideRail.svelte";
  import { Modal, Toast, initializeStores } from "@skeletonlabs/skeleton";
  import { onNavigate } from "$app/navigation";
  import "../app.postcss";

  export let data;
  initializeStores();

  onNavigate((navigation) => {
    //@ts-ignore
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      //@ts-ignore
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<Modal />
<Toast />

<div class="flex">
  <SideRail user={data.user} />
  <div class="relative w-full h-screen overflow-y-auto overflow-x-hidden">
    <ProgressBar />
    <slot />
  </div>
</div>
