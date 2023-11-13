<script lang="ts">
  import { afterNavigate, beforeNavigate, onNavigate } from "$app/navigation";
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { fade } from "svelte/transition";

  let isNavigating = false;
  let progress = tweened(0, { easing: cubicOut });

  beforeNavigate(() => {
    isNavigating = true;
    progress.set(0.7, { duration: 2000 });
  });

  onNavigate(() => {
    progress.set(1, { duration: 400 });
  });

  afterNavigate(() => {
    progress.set(0, { delay: 500, duration: 1 });
    setTimeout(() => {
      isNavigating = false;
    }, 700);
  });
</script>

{#if isNavigating}
  <span out:fade={{ duration: 500 }}>
    <ProgressBar
      value={$progress}
      min={0}
      max={1}
      class="absolute top-0 inset-x-0 w-full"
      meter="bg-primary-500"
      rounded="rounded-none"
    />
  </span>
{/if}
