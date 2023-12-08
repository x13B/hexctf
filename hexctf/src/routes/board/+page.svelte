<script lang="ts">
  
  import type { PageData } from "./$types";

  export let data: PageData;
  const teams = data.teamQuesAnsCount;
</script>
<main>
  <div class="container">
  <h1>Leaderboard</h1>
  <table class="table table-striped">
    <thead>
      <tr>
          <th>Team Name</th>
          <th>Points</th>
          <th>Count</th>
      </tr>
    </thead>
    <tbody>
  {#each teams as t (t.teamId)}
      <tr>
          <th><a href="/teams/{t.teamId}">{t.teamName}</a></th>
          <th>{t.points}</th>
          <th>{t._count.answers}</th>
      </tr>
  {:else}
    <p>No teams formed</p>
  {/each}
  </tbody>
  </table>
</div>
</main>