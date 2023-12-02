<script lang="ts">
  import { Avatar } from "@skeletonlabs/skeleton";
  import { enhance } from "$app/forms";
  export let data;
</script>

<div class="flex items-center justify-between mb-10">
  <h1 class="h1">Profile page</h1>
  <form method="post" action="?/logout" use:enhance>
    <button class="btn md:btn-lg variant-filled-secondary">Log-out</button>
  </form>
</div>
<div class="flex items-center">
  <Avatar
    src={data.user?.avatar ?? undefined}
    initials={data.user?.username.slice(0, 2)}
    alt="User profile"
    rounded="rounded-none"
  />
  <div
    class="font-bold border-t border-r border-b self-stretch rounded-r-sm p-3"
  >
    <p class="text-3xl break-words">
      {data.user?.username}
    </p>
  </div>
</div>
