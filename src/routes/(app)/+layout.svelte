<script lang="ts">
    import icon from '$lib/assets/icon.svg';
    import Sidebar from '$lib/components/Sidebar.svelte';
    import Topbar from '$lib/components/Topbar.svelte';
    
    import type { LayoutData } from './$types';

    export let data: LayoutData;

    const { user } = data;
</script>

<!-- <div class="vertical">
    <Topbar {user} />
    <div class="horizontal">
        <Sidebar {user} />
        <main>
            <slot />
        </main>
    </div>
</div>

<style lang="scss">
    .vertical {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    .horizontal {
        display: flex;
        flex-direction: row;
        flex: 1;
    }

    main {
        flex: 1;
        padding: 1rem;

        background-color: #f5f5f5;
    }
</style> -->

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

        background-color: #f2f2f2;
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

        background-color: #ededed;

        /* Inset shadow */
        box-shadow: inset 0 0 8px 0 rgba(0, 0, 0, 0.2);
    }
</style>