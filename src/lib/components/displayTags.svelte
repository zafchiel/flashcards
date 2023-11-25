<script lang="ts">
  import type { DeckTags } from "$lib/server/db/schema";

  export let tags: DeckTags[];
</script>

<div class="p-2">
  {#each tags as tag (tag.id)}
    <span class="chip variant-filled mr-2 mb-2">{tag.tagName}</span>
  {/each}
</div>
