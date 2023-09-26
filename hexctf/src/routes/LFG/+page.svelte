<script lang="ts">
  import { onMount } from "svelte";

  let users: any = [];

  type Groups = {
    quizId: number,
    UserId: number,
    score: number,
  };
  
  let userScores: Groups[];
  
  // This function will easy sort the users into groups
  function sortGroups(groups: Groups[], numGroups: number) {
    console.log("Sorting teams");
    let officialTeams = Array.from({length: numGroups}, () => [] as Groups[]);

    // Filter out admin
    let teams = groups.filter(group => group.score != -1);

    let front = 0;
    let back = teams.length - 1;
    console.log("Starting Sort")
    while (front <= back) {
      console.log("First sort");
      for (let i = 0; i < officialTeams.length; i++) {
        console.log("Pushing front:", teams[front]);
        officialTeams[i].push(teams[front]);
        front++;
      }
      console.log(officialTeams)
      console.log("Second sort");
      for (let j = officialTeams.length - 1; j >= 0; j--) { // Corrected line
        console.log("Pushing", teams[back]);
        officialTeams[j].push(teams[back]);
        back--;
      }
      console.log(officialTeams)
      break;
    }
    console.log("End Sort")

    // console.log(officialTeams)

    return teams;
  }




  onMount(async () => {
    try {
      const response = await fetch('../api/getUsers'); 
      if (response.ok) {
        users = await response.json();
        // console.log("from function user", users);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  onMount(async () => {
    try {
      const res = await fetch('../api/getQuizScores');
      if (res.ok) {
        userScores = await res.json();
        sortGroups(userScores, 2);
        // console.log(userScores);
      } else {
        console.error("Failed to get users", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })

</script>

<h1>LOOKING FOR GROUP PAGE</h1>
<!-- Iterate through each user and display them -->
<h1>Users</h1>

<ul>
  {#each users as user (user.UserID)}
    {#if user.isAdmin === true}
      <h2>This is the admin: {user.UserID}</h2>
    {:else}
      <li>Non-Admin User: {user.UserID}, password: {user.password}</li>
    {/if}
  {/each}
</ul>

<style>
  h2 {
    color: red;
  }
</style>