<script lang="ts">
  import ProgressBar from "$lib/components/progressBar.svelte";
  import SideRail from "$lib/components/sideRail.svelte";
  import "../app.postcss";

  export let data;
</script>

<div class="flex">
  <SideRail user={data.user} />
  <div class="relative w-full">
    <ProgressBar />
    <slot />
  </div>
</div>
