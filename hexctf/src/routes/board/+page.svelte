<script lang="ts">
  
  import type { PageData } from "./$types";

  export let data: PageData;
  const teams = data.teams;
  const qAns = data.qAnswer;
  const qCount = qAns.length;
  //console.log("qcount " + qCount);
</script>

<main>
  <h1>Leaderboard</h1>
  <table>
      <tr>
          <th>Team Name</th>
          <th>Points</th>
          <th>Count</th>
      </tr>
  {#each teams as t (t.teamId)}
      <tr>
          <th><a href="/teams/{t.teamId}">{t.teamName}</a></th>
          <th>{t.points}</th>
          <th>{t.count}</th>
      </tr>
  {:else}
    <p>No teams formed</p>
  {/each}
  </table>
</main>