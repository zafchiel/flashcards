<script lang="ts">
  import ProgressBar from "$lib/components/progressBar.svelte";
  import SideRail from "$lib/components/sideRail.svelte";
  import { Modal, initializeStores } from "@skeletonlabs/skeleton";
  import "../app.postcss";

  export let data;
  initializeStores();
</script>

<Modal />

<div class="flex">
  <SideRail user={data.user} />
  <div class="relative w-full h-screen overflow-scroll">
    <ProgressBar />
    <slot />
  </div>
</div>
