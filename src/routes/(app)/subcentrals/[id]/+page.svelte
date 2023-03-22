<script lang="ts">
    import { superForm } from 'sveltekit-superforms/client';

    import Button from '$lib/components/Button.svelte';
    import Textarea from '$lib/components/Textarea.svelte';
    import TextInput from '$lib/components/TextInput.svelte';

    import type { PageData } from './$types';

    export let data: PageData;

    const { form, errors, constraints, enhance } = superForm(data.form, {
        validators: {
            name: (value) => {
                if (value.length < 1) {
                    return 'Namn måste vara minst 1 tecken långt';
                }
                if (value.length > 512) {
                    return 'Namn får inte vara längre än 512 tecken';
                }
            },
            description: (value) => {
                if (value.length < 1) {
                    return 'Beskrivning måste vara minst 1 tecken långt';
                }
                if (value.length > 1024) {
                    return 'Beskrivning får inte vara längre än 1024 tecken';
                }
            },
        },
    });
</script>

<h2>Redigera undercentral</h2>

<form method="post" use:enhance>
    <input type="hidden" name="id" bind:value={$form.id} />

    <TextInput
        label="Namn"
        name="name"
        errors={$errors.name}
        data-invalid={$errors.name}
        bind:value={$form.name}
        {...$constraints.name}
    />

    <Textarea
        label="Beskrivning"
        name="description"
        errors={$errors.description}
        data-invalid={$errors.description}
        bind:value={$form.description}
    />

    <div class="horizontal">
        <Button type="submit" style="primary" value="update" name="update">Uppdatera</Button>
        <Button
            type="submit"
            style="danger"
            value="delete"
            name="delete"
            on:click={(e) =>
                !confirm(`Är du säker på att du vill ta bort ${$form.name}?`) && e.preventDefault()}
            >Ta bort</Button
        >
    </div>
</form>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        max-width: 400px;

        margin-top: 1rem;
    }

    .horizontal {
        display: flex;
        gap: 1rem;
    }
</style>
