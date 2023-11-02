<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data: PageData;
    //const isAdmin = data.isAdmin;
    
</script>
<style>
    nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    nav a {
        display: block;
    }

    nav li {
        padding-right: 5px;
        padding-left: 5px;
    }

    .nav-left {
        float: left;
    }

    .nav-left ul li {
        float: left;
    }

    .nav-right ul li {
        float: right;
    }
</style>

<header class="header">
<nav class="nav">
    <div class="nav-left">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/questions">Questions</a></li>
            <li><a href="/LFG">LFG</a></li>
            <li><a href="/board">Leaderboard</a></li>
            {#if data.isAdmin}
            <li><a href="/admin">Admin Dashboard</a></li>
            {/if}
    </ul>
    </div>
    <div class="nav-right">
        <ul>
            {#if !data.session}
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            {:else}
            <li><form method="post" action="?/logout" use:enhance><input type="submit" value="Sign out" /></form></li>
            <li>Welcome, {data.name}</li>
            {/if}
        </ul>
    </div>
</nav>
</header>

<slot />