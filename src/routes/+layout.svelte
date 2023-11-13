<script lang="ts">
  import SideRail from "$lib/components/sideRail.svelte";
  import "../app.postcss";

  export let data;
</script>

<div class="flex">
  <SideRail user={data.user} />

  <slot />
</div>
