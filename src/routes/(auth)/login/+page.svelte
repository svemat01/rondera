<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';

    import { Password, Username } from '$lib/schemes.js';

    import type { PageData } from './$types';

    export let data: PageData;

    const { form, errors, constraints, enhance } = superForm(data.form, {
        validators: {
            username: (value) => {
                const parsed = Username.safeParse(value);
                if (!parsed.success) {
                    return parsed.error.issues[0].message;
                }
            },
            password: (value) => {
                const parsed = Password.safeParse(value);
                if (!parsed.success) {
                    return parsed.error.issues[0].message;
                }
            },
        },
    });

    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
</script>

<h1>Setup Tracka</h1>

<form method="POST" use:enhance>
    <label for="username">
        Username<br />
        <input
            type="text"
            name="username"
            data-invalid={$errors.username}
            bind:value={$form.username}
            {...$constraints.username}
        />
        {#if $errors.username}
            <div class="error">{$errors.username}</div>
        {/if}
    </label>

    <label for="password">
        Password<br />
        <input
            type="password"
            name="password"
            data-invalid={$errors.password}
            bind:value={$form.password}
            {...$constraints.password}
        />
        {#if $errors.password}
            <div class="error">{$errors.password}</div>
        {/if}
    </label>

    <div><button>Login</button></div>
</form>

<br />
<SuperDebug data={$form} />

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
