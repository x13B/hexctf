<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data: PageData;

    // Gets the start time for the competition
    let start_timer: string = (data.comp_timer?.startDate) ? data.comp_timer.startDate : "";

    // Gets comp name
    let name: string = (data.comp_timer?.competitionName) ? data.comp_timer.competitionName : "";

    // Set countdown timer for display
    let countdown: string = "";

    function startCountdown() {
        const startTime = new Date(start_timer).getTime();
        const now = new Date().getTime();
        const timeDifference = startTime - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            countdown = `${name} starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
        } 
    }

    setInterval(() => {
        startCountdown();
    }, 1000);
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
            <li><a href="/board">Leaderboard</a></li>
            {#if data.isAdmin}
            <li><a href="/admin">Admin Dashboard</a></li>
            {:else}
            <li><a href="/studentQuiz">Quiz</a></li>
            {/if}
            
            {#if start_timer}
            <li>{countdown}</li>
            {/if}
    </ul>
    </div>
    <div class="nav-right">
        <ul>
            {#if !data.session}
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
            {:else}
            <li><form method="post" action="/api/logout?/logout" use:enhance><input type="submit" value="Sign out" /></form></li>
            <li>Welcome, {data.name}</li>
            {/if}
        </ul>
    </div>
</nav>
</header>

<slot />