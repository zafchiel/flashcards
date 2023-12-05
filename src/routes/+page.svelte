<script lang="ts">
  import CardSvg from "$lib/assets/cardSVG.svelte";
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
      [
        "#firstSide",
        { display: "none", animationDuration: 0.5 },
        { at: "-0.3" },
      ],
      [
        "#secondSide",
        { display: "block", rotateX: -180, animationDuration: 0.5 },
      ],
    ]);
  });
</script>

<main class="min-h-[100svh]">
  <section class="p-10 flex flex-col md:flex-row items-center gap-5">
    <div class="max-w-xl">
      <h1 class="h1 font-bold gradient-heading">Flashcards HUH</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos magni
        distinctio ut nihil eius commodi modi at alias. Fugit saepe modi aperiam
        nesciunt dicta repudiandae vero, magnam ea eaque animi.
      </p>
      <div class="p-3 flex gap-3 items-center">
        <a href="/signup" class="btn variant-filled-primary">Get Started</a>
        <a href="/login" class="btn variant-outline-secondary">Sign-in</a>
      </div>
    </div>
    <div
      id="fancydiv"
      class="min-h-[200px] w-full relative font-bold flex justify-center items-center"
    >
      <CardSvg />
      <p id="firstSide" class="h3">Learn Easily</p>
      <p id="secondSide" class="h3 hidden">Remember More</p>
    </div>
  </section>
</main>

<style>
  main {
    background: rgb(21, 23, 31);
    background: linear-gradient(
      45deg,
      rgba(21, 23, 31, 1) 0%,
      rgba(61, 36, 37, 0.7) 81%,
      rgba(212, 22, 60, 0.4) 100%
    );
  }

  section {
    perspective: 100vh;
  }
</style>
