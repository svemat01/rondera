<script lang="ts">
    import type { SecureUser } from '$db/types/user.js';
    
    export let user: SecureUser;
</script>

<div class="topbar">
    <div class="user">
        <a href="/profile">{user.username}</a>
    </div>
</div>

<style lang="scss">
    .topbar {
        display: flex;
        align-items: center;

        padding: 0.5rem 2rem;
    }

    .user {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        flex-wrap: wrap;

        margin-left: auto;

        a {
            text-decoration: none;
            font-weight: 600;
            font-size: 1.4rem;

            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            color: #2B32B2;
            transition: color 0.2s ease-in-out;

            &:hover {
                color: #1E213A;
            }

        }
    }
    
</style>