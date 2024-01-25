<script lang="ts">
  import CardSvg from "$lib/assets/animatedCardSVG.svelte";
  import previewImage from "$lib/assets/preview.png?enhanced";
  import type { Action } from "svelte/action";

  const previewImageAction: Action = (node) => {
    const width = node.clientWidth;
    const height = node.clientHeight;

    const mouseOverHandler = (e: MouseEvent) => {
      const xVal = e.clientX;
      const yVal = e.clientY;

      const roationX = -8 * ((yVal - height / 2) / height);
      const rotationY = 8 * ((xVal - width / 2) / width);

      const animationString = `rotateX(${roationX}deg) rotateY(${rotationY}deg) scale(1.05)`;
      node.style.transform = animationString;
    };

    const mouseOutHanlder = () => {
      node.style.transform = `rotateX(0deg) rotateY(0deg)`;
    }

    node.addEventListener("mousemove", mouseOverHandler);
    node.addEventListener("mouseout", mouseOutHanlder);

    return {
      destroy() {
        node.removeEventListener("mousemove", mouseOverHandler);
        node.removeEventListener("mouseout", mouseOutHanlder);
      },
    };
  };
</script>

<svelte:head>
  <title>Flashcards\HUH</title>
</svelte:head>

<main
  class="min-h-[100svh] md:p-8 flex flex-col gap-8 items-center justify-center bg-gradient-to-b from-surface-800 from-30% to-primary-600 to-98%"
>
  <section
    class="p-4 m-2 md:p-10 flex flex-col items-center gap-5 card variant-soft-surface shadow-lg"
  >
    <div class="max-w-xl mb-5">
      <h1 class="h1 font-bold gradient-heading">Flashcards\HUH</h1>
      <p class="text-sm md:text-base">
        Here you can learn and practice various subjects using interactive
        flashcards. Start exploring our collection of flashcards and enhance
        your learning experience today!
      </p>
      <div class="p-3 flex flex-wrap gap-3 items-center max-w-xs">
        <a href="/auth?t=signup" class="btn variant-filled-primary flex-1"
          >Get Started</a
        >
        <a href="/auth?t=signin" class="btn variant-outline-secondary flex-1"
          >Sign-in</a
        >
      </div>
    </div>
    <CardSvg />
  </section>
  <section class="max-w-[80vw]">
    <div id="peviewImgWrapper" use:previewImageAction class="p-4">
      <enhanced:img
        src={previewImage}
        alt="Preview"
        class="rounded-xl shadow-2xl"
      />
    </div>
    <h2 class="text-xl md:text-4xl font-bold md:p-4 mt-4">Smooth Experience</h2>
  </section>
</main>

<style>
  section {
    perspective: 100vh;
  }

  #peviewImgWrapper {
    transition: transform 0.1s;
  }
</style>
