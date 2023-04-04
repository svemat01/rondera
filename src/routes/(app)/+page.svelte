<script lang="ts">
    export let data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if data.user}
    <a href="/auth/logout">Logout</a>
{:else if !data.setup}
    <a href="/auth/setup">Setup Tracka</a>
{:else}
    <a href="/auth/login">Login</a>
{/if}

<p>{JSON.stringify(data, null, 4)}</p>
