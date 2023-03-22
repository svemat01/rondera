<script lang="ts">
    import icon from '$lib/assets/icon.svg';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Topbar from '$lib/components/Topbar.svelte';
    
    import type { LayoutData } from './$types';

    export let data: LayoutData;

    const { user } = data;
</script>

<div class="wrapper">
    <div class="branding">
        <img src={icon} alt="Logo" />
        <h1>RONDERA</h1>
    </div>
    <Topbar {user} />
    <Sidebar />
    <main>
        <slot />
    </main>
</div>

<style lang="scss">
    .wrapper {
        display: grid;
        grid-template-columns: 250px auto;
        grid-template-rows: 70px auto;
        min-height: 100vh;

        background-color: $stone-50;
    }

    .branding {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        h1 {
            font-size: 1.5rem;
            font-weight: 400;

            font-family: 'Jura', sans-serif;
        }

        img {
            width: 40px;
        }
    }

    main {
        padding: 1rem;

        background-color: $stone-100;

        /* Inset shadow */
        box-shadow: inset 0 0 8px 0 rgba(0, 0, 0, 0.2);
    }
</style>