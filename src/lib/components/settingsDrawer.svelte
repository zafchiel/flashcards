<script lang="ts">
  import { tooltip } from "$lib/actions/tooltip";
  import SettingsIcon from "$lib/assets/settingsIcon.svelte";
  import { getDrawerStore, type DrawerSettings } from "@skeletonlabs/skeleton";

  const drawerStore = getDrawerStore();

  export let isPublic: boolean;

  const drawerSettings: DrawerSettings = {
    id: "settingsDrawer",
    position: "right",
    bgDrawer: "variant-filled-surface",
    shadow: "shadow-xl",
    bgBackdrop:
      "bg-gradient-to-tr from-primary-500/50 to-surface-500/50",
    width: "w-[80vw] md:w-[480px]",
    padding: "",
    rounded: "rounded-l-xl",
    meta: {
      isPublic,
    },
  };
</script>

<button
  on:click={() => drawerStore.open(drawerSettings)}
  use:tooltip={{ content: "Settings" }}
>
  <SettingsIcon />
</button>
