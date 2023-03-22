<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    
    import BuildingOffice from '~icons/heroicons/building-office-solid';
    import RectangleGroupSolid from '~icons/heroicons/rectangle-group-solid';
    import { page } from '$app/stores';

    const sections: { name: string; path: string; icon: typeof SvelteComponent }[] = [
        { name: 'Översikt', path: '/', icon: RectangleGroupSolid },
        { name: 'Undercentraler', path: '/subcentrals', icon: BuildingOffice },
    ];
</script>

<div class="sidebar">
    <ul class="sections">
        {#each sections as section}
            <li>
                <a href={section.path} class:active={$page.url.pathname == section.path} >
                    <svelte:component this={section.icon} style="font-size: var(--icon-size)" />
                    {section.name}
                </a>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .sidebar {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        /* min-height: 100vh; */
        width: 250px;

        /* background-color: ; */
        /* outline: 2px solid #ccc; */
        /* border-radius: 0.5rem; */
        padding: 1.5rem 1.5rem;

        /* very light box shadow inset only from the top */
        box-shadow: inset 0 8px 9px -7px rgba(0, 0, 0, 0.2);
    }

    .sections {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        width: 100%;

        li {
            list-style: none;

            a {
                display: flex;
                align-items: center;
                gap: 0.5rem;

                text-decoration: none;
                color: inherit;
                font-size: 1.1rem;
                font-weight: 500;
                --icon-size: 1.6rem;

                transition: color 0.2s ease-in-out;

                &.active {
                    color: $blue-600;
                }
            }
        }
    }
</style>
