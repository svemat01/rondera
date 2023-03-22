<script lang="ts">
    import { permsToString } from '$lib/utils/permissions.js';

    import type { PageData } from './$types';

    export let data: PageData;

    const { user } = data;
</script>

<div class="profile">
    <h1>Profil</h1>

    <section class="username">
        <h2>Användarnamn:</h2>
        <p>{user.username}</p>
    </section>

    <section class="permissions">
        <h2>Rättigheter:</h2>
        {#each permsToString(user.permissions) as permission}
            <li>{permission}</li>
        {/each}
    </section>

    <a href="/logout" class="logout">Logga ut</a>
</div>

<style lang="scss">
    .profile {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    /* .username {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        h1 {
            font-size: 1.5rem;
        }

        p {
            font-size: 1.25rem;
        }
    }

    .permissions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        h2 {
            font-size: 1.25rem;
        }

        li {
            font-size: 1rem;
        }
    } */

    section {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        h2 {
            font-size: 1.25rem;
        }

        p, li {
            font-size: 1rem;
        }
    }

    .logout {
        text-decoration: none;
        color: white;
        background-color: $blue-600;

        padding: 0.5rem 1rem;
        border-radius: 0.25rem;

        width: fit-content;

        font-size: 1rem;
        font-weight: 500;

        transition: all 0.2s ease;

        &:hover {
            background-color: $blue-700;
        }
        
    }
</style>
