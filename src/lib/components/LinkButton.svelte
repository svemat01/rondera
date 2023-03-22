<script lang="ts">
    export let href: string;
    export let style: 'primary';
</script>

<!-- 
    @component
    # LinkButton
    A button based on `<a>` element.
    
    ## Props
    - `href` - The href attribute of the <a> element.
    - `style` - The style of the button. Currently only `primary` is supported.

    ## CSS Variables (Optional)
    - `--padding` - The padding of the button.
    - `--width` - The width of the button.
    - `--font-size` - The font size of the button.

    ## Example
    ```svelte
    <LinkButton href="/logout" style="primary" --padding="1rem">
        Logout
    </LinkButton>
    ```
 -->

<a {href} class="link-button {style}" {...$$restProps}>
    <slot />
</a>

<style lang="scss">
    .link-button {
        display: inline-block;

        padding: var(--padding, 0.75rem 1rem);
        border-radius: 0.3rem;

        width: var(--width, fit-content);

        text-decoration: none;
        text-align: center;
        font-size: var(--font-size, 1rem);
        font-weight: 500;

        cursor: pointer;
    }

    .primary {
        color: $stone-50;
        background-color: $blue-600;

        transition: background-color 0.2s ease-in-out;

        &:hover {
            background-color: $blue-700;
        }
    }
</style>
