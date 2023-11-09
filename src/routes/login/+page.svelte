<script lang="ts">
  import { enhance } from "$app/forms";
</script>

<h1 class="h1 mb-10">Sign in</h1>

<form method="post" use:enhance>
  <div class="flex flex-col gap-3">
    <div>
      <label for="username" class="label">Username</label>
      <input
        name="username"
        id="username"
        placeholder="username"
        class="input"
      />
    </div>

    <div>
      <label for="password" class="label">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="*****"
        class="input"
      />
    </div>

    <button class="btn variant-filled">Login</button>
  </div>
</form>
