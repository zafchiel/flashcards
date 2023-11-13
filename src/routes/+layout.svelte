<script lang="ts">
  import SideRail from "$lib/components/sideRail.svelte";
  import "../app.postcss";

  export let data;
</script>

<div class="flex">
  <SideRail user={data.user} />

  <main
    class="p-10 bg-gradient-to-br variant-gradient-primary-secondary w-full relative"
  >
    <slot />
  </main>
</div>
