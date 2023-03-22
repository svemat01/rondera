<script lang="ts">
    export let label: string;
    export let errors: string[] | undefined = undefined;
    export let value = '';
</script>

<!-- 
    @component

    # TextInput
    A text input field with a label and error messages.

    ## Props
    - `label` - The label for the input field
    - `errors` - An array of error messages (optional)
    - `value` - The value of the input field (optional) (bindable)

    ## CSS Variables (Optional)
    - `--width` - The width of the input field.

    ## Example
    ```svelte
    <TextInput label="Username" bind:value={username} />
    ```
 -->

<div class="text-input">
    <label for="text-input">{label}</label>

    <input type="text" bind:value {...$$restProps} />

    {#if errors}
        <div class="error">{errors}</div>
    {/if}
</div>

<style lang="scss">
    .text-input {
        display: flex;
        flex-direction: column;

        width: var(--width, unset);

        label {
            font-size: 0.8rem;
            margin-bottom: 0.5rem;
        }

        input {
            padding: 0.5rem;
            border: 1px solid $stone-300;
            border-radius: 0.25rem;
            font-size: 1rem;
        }

        .error {
            color: $red-600;
            font-size: 0.8rem;
            margin-top: 0.5rem;
        }
    }
</style>
