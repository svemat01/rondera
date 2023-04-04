<script lang="ts">
    import icon from '$lib/assets/icon.svg';
</script>

<main>
    <div class="branding">
        <img src={icon} alt="Logo" />
        <h1>RONDERA</h1>
    </div>
    <div class="separator" />
    <slot />
</main>

<style lang="scss">
    main {
        display: grid;
        grid-template-columns: 1fr 2px 1fr;
        align-items: center;
        justify-items: center;
        gap: 1rem;

        min-height: 100vh;
        max-width: 1300px;

        margin-inline: auto;
    }

    .separator {
        width: 100%;
        background-color: #ccc;
        height: 60%;
    }

    .branding {
        display: flex;
        align-items: center;
        gap: 1rem;

        h1 {
            font-size: 5.5rem;
            font-weight: 400;

            font-family: 'Jura', sans-serif;
        }

        img {
            width: 100px;
        }
    }
</style>
