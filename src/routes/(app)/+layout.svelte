<script lang="ts">
  import ProgressBar from "$lib/components/progressBar.svelte";
  import SideRail from "$lib/components/sideRail.svelte";

  export let data;
</script>

{#if data.user}
  <slot />
{:else}
  <div class="flex">
    <SideRail user={data.user} />
    <main
      class="p-3 md:p-10 relative w-full h-screen overflow-y-auto overflow-x-hidden max-w-4xl"
    >
      <ProgressBar />
      <slot />
    </main>
  </div>
{/if}
