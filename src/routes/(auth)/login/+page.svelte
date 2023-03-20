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
</script>

<div class="setup">
    <div class="header">
        <h1>Logga In</h1>
    </div>

    <form method="POST" use:enhance>
        <div class="field">
            <label for="username">Användarnamn</label>
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
        </div>

        <div class="field">
            <label for="password">Lösenord</label>
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
        </div>

        <button>Logga In</button>
    </form>
</div>

<style lang="scss">
    .setup {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        max-width: 300px;
        width: 100%;
    }

    .header {
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        width: 100%;

        .field {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            widows: 100%;

            label {
                font-size: 0.9rem;
            }

            input {
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 0.25rem;
                outline: none;

                &[data-invalid] {
                    border-color: red;
                }
            }

            .error {
                color: red;
                font-size: 0.8rem;
            }
        }

        button {
            padding: 0.75rem;
            border: none;
            border-radius: 0.25rem;
            outline: none;

            font-size: 1rem;
            font-weight: 600;

            background-color: #43adeb;
            color: #111111;

            cursor: pointer;

            &:hover {
                background-color: #3c9dd0;
            }
        }
    }
</style>
