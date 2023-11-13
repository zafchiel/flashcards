<script lang="ts">
  import { enhance } from "$app/forms";

  export let data;
</script>

<h3 class="h3">Welcome</h3>
<div class="flex items-center">
  <img
    src={data.user?.avatar}
    alt="User profile picture"
    width="64"
    height="64"
  />
  <div
    class="font-bold border-t border-r border-b self-stretch rounded-r-sm p-3"
  >
    <p class="text-3xl break-words">
      {data.user?.username}
    </p>
  </div>
</div>
<form method="post" action="?/logout" use:enhance>
  <button class="btn variant-filled-secondary">Log-out</button>
</form>
