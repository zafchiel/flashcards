<script lang="ts">
  import CardSvg from "$lib/assets/cardSVG.svelte";
  import { onMount } from "svelte";
  import { timeline } from "motion";
  import { tooltip } from "$lib/actions/tooltip";

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
      ["#firstSide", { opacity: 0, animationDuration: 0.5 }, { at: "-0.3" }],
      ["#secondSide", { opacity: 1, rotateX: -180, animationDuration: 0.5 }],
    ]);
  });
</script>

<section class="p-10 flex flex-col gap-5 items-stretch">
  <h1
    use:tooltip={{ content: "h1" }}
    class="h1 font-bold gradient-heading text-center"
  >
    Flashcards HUH
  </h1>
  <div
    id="fancydiv"
    class="p-14 min-h-[200px] md:mx-24 grid relative font-bold"
  >
    <CardSvg />
    <p id="firstSide" class="h3 place-self-center">Learn Easily</p>
    <p id="secondSide" class="h3 place-self-center opacity-0">Remember More</p>
  </div>
</section>

<style>
  section {
    perspective: 100vh;
  }
</style>
