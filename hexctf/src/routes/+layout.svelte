<script lang="ts">
  import "../app.pcss";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";

  export let data: PageData;

  // Gets the start time for the competition
  let start_timer: string = data.comp_timer?.startDate
    ? data.comp_timer.startDate
    : "";
  let end_timer: string = data.comp_timer?.endDate
    ? data.comp_timer.endDate
    : "";

  // Gets comp name
  let name: string = data.comp_timer?.competitionName
    ? data.comp_timer.competitionName
    : "";

  // Set countdown timer for display
  let countdown: string = "";

  function startCountdown() {
    const startTime = new Date(start_timer).getTime();
    const endTime = new Date(end_timer).getTime();
    const now = new Date().getTime();
    const timeDifferenceBefore = startTime - now;
    const timeDifferenceAfter = now - endTime;

    if (timeDifferenceBefore > 0) {
      const days = Math.floor(timeDifferenceBefore / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifferenceBefore % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifferenceBefore % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifferenceBefore % (1000 * 60)) / 1000);

      countdown = `${name} starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (timeDifferenceAfter > 0) {
      countdown = `${name} has ended!`;
    } else {
      countdown = `${name} has started!`;
    }
  }

  setInterval(() => {
    startCountdown();
  }, 1000);
</script>

<header class="header">
  <nav class="nav navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
    <div class="nav-left collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="/questions">Questions</a></li>
        <li class="nav-item"><a class="nav-link" href="/board">Leaderboard</a></li>
        {#if data.isAdmin}
          <li class="nav-item"><a class="nav-link" href="/admin">Admin Dashboard</a></li>
        {:else}
          <li class="nav-item"><a class="nav-link" href="/studentQuiz">Quiz</a></li>
        {/if}

        {#if start_timer}
          <li class="nav-item">
            <span class="navbar-text">
              {countdown}
            </span>
          </li>
        {/if}
      </ul>
    </div>
    <div class="nav-right" id="navbarNav">
      <ul>
        {#if !data.session}
          <li class="nav-item"><a class="nav-link" href="/login">Login</a></li>
          <li class="nav-item"><a class="nav-link" href="/register">Register</a></li>
        {:else}
          <li>
            <form method="post" action="/api/logout?/logout" use:enhance>
              <input class="btn btn-outline-secondary"type="submit" value="Sign out" />
            </form>
          </li>
          <li class="nav-item"><span class="navbar-text">Welcome, {data.name}</span></li>
        {/if}
      </ul>
    </div>
  </div>
  </nav>
</header>

<slot />

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
