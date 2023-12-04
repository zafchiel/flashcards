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
      ["#firstSide", { opacity: 0, animationDuration: 0.5 }, { at: "-0.3" }],
      ["#secondSide", { opacity: 1, rotateX: -180, animationDuration: 0.5 }],
    ]);
  });
</script>

<main class="min-h-[100svh]">
  <section class="p-10 flex flex-col items-center gap-5">
    <div class="max-w-xl text-center">
      <h1 class="h1 font-bold gradient-heading text-center">Flashcards HUH</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos magni
        distinctio ut nihil eius commodi modi at alias. Fugit saepe modi aperiam
        nesciunt dicta repudiandae vero, magnam ea eaque animi.
      </p>
    </div>
    <div
      id="fancydiv"
      class="p-14 min-h-[200px] md:mx-24 grid relative font-bold"
    >
      <CardSvg />
      <p id="firstSide" class="h3 place-self-center">Learn Easily</p>
      <p id="secondSide" class="h3 place-self-center opacity-0">
        Remember More
      </p>
    </div>
  </section>

  <div class="flex gap-3 justify-center items-center">
    <a href="/signup" class="btn variant-filled-primary">Get Started</a>
    <a href="/login" class="btn variant-outline-secondary">Sign-in</a>
  </div>
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
