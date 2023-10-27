<script lang="ts">
    import { onMount } from 'svelte';
  
    let teams: any = [];
    
    onMount(async () => {
    try {
      const response = await fetch('../api/getTeams'); 
      if (response.ok) {
        teams = await response.json();
        //console.log("from function questions", questions);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  </script>
<h1>Leaderboard</h1>
<table>
    <tr>
        <th>Team Name</th>
        <th>Points</th>
    </tr>
{#each teams as t (t.teamId)}
    <tr>
        <th>{t.teamName}</th>
        <th>{t.points}</th>
    </tr>
{/each}
</table>