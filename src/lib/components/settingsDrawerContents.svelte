<script lang="ts">
  import { getDrawerStore } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();
</script>

<div class="p-4">
  <h3 class="h3 font-semibold">Settings</h3>
  <div>
    <button
      on:click={() => {
        $drawerStore.meta = {
          ...$drawerStore.meta,
          message: "cps",
        };
      }}
    >
      Click me
    </button>
  </div>
</div>
