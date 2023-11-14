<script lang="ts">
  import type { Flashcard } from "$lib/server/db/schema";

  export let flashcard: Flashcard;
</script>

<div
  class="card card-hover flex flex-col gap-3 justify-center items-center p-4 my-10 grow"
>
  <div>
    {flashcard.question}
  </div>
  <div>
    {flashcard.answer}
  </div>
</div>
