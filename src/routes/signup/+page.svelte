<script lang="ts">
  import { enhance } from "$app/forms";

  export let form;

  $: console.log(form);
</script>

<h1 class="h1 mb-10">Sign up</h1>

<form method="post" use:enhance>
  <div class="flex flex-col gap-3 card p-4 variant-soft">
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

    <button class="btn variant-filled">Register</button>
  </div>
</form>
