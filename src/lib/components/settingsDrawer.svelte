<script lang="ts">
  import { tooltip } from "$lib/actions/tooltip";
  import SettingsIcon from "$lib/assets/settingsIcon.svelte";
  import { getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  const drawerSettings: DrawerSettings = {
    id: "settingsDrawer",
    position: "right",
    bgDrawer: "variant-filled-surface",
    bgBackdrop:
      "bg-gradient-to-tr from-primary-500/50 via-purple-500/50 to-secondary-500/50",
    width: "w-[280px] md:w-[480px]",
    padding: "p-2",
    rounded: "rounded-xl",
  };
</script>

<button
  on:click={() => drawerStore.open(drawerSettings)}
  use:tooltip={{ content: "Settings" }}
>
  <SettingsIcon />
</button>
