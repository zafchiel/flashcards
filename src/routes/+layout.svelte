<script lang="ts">
  import SideRail from "$lib/components/sideRail.svelte";
  import "../app.postcss";
</script>

<div class="flex">
  <SideRail />

  <main
    class="p-10 bg-gradient-to-br variant-gradient-primary-secondary w-full"
  >
    <slot />
  </main>
</div>
