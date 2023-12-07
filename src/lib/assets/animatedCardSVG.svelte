<script lang="ts">
  import { onMount } from "svelte";
  import { timeline } from "motion";

  onMount(async () => {
    const draw = (progress: number) => ({
      strokeDashoffset: 1 - progress,
      visibility: "visible",
    });

    timeline([
      ["rect", draw(1), { duration: 2 }],
      [
        "div#fancydiv",
        { rotateX: 180, animationDuration: 2 },
        { easing: "ease-in-out", delay: 1 },
      ],
      ["#firstSide", { display: "none" }, { at: "-0.7" }],
      [
        "#secondSide",
        { display: "block", rotateX: -180, animationDuration: 1 },
      ],
    ]);
  });
</script>

<div
  id="fancydiv"
  class="min-h-[200px] min-w-full relative font-bold flex justify-center items-center"
>
  <svg width="100%" height="100%" class="stroke-secondary-500 absolute inset-0">
    <g>
      <rect pathLength="1" rx="16" height="100%" width="100%" />
    </g>
  </svg>
  <p id="firstSide" class="text-xl md:text-3xl">Learn Easily</p>
  <p id="secondSide" class="text-xl md:text-3xl hidden">Remember More</p>
</div>

<style>
  rect {
    fill: transparent;
    stroke-width: 6px;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    visibility: hidden;
    transform-style: preserve-3d;
  }
</style>
