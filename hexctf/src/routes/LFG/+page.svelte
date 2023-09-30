<script lang="ts">
  import { onMount } from "svelte";

  // Holds all users in the competition
  let users: any = [];

  // type Groups = {
  //   quizId: number,
  //   UserId: number,
  //   score: number,
  // };

  // Holds admin ID
  let adminIDNumber: number;

  // Holds admin name !!! REMOVE WHEN LOGIN IS COMPLETED !!!
  let adminName: string;
  
  // Holds user scores from the database
  let userScores: any = [];

  // Holds the number of teams for the competition 
  let numGroups: number = -1;

  // Hides submit button to avoid changing group number
  let groupsButtonVisible: boolean = true;
  
  // Hides input field when submit button is clicked
  let inputVisible: boolean = true;
  
  // This function will easy sort the users into groups
  // TODO: continue working on this function
  function sortGroups(groups: any, numGroups: number) {
    // console.log("Sorting teams");
    // let officialTeams = Array.from({length: numGroups}, () => []);

    // // Filter out admin
    // let teams = groups.filter((group:any) => group.score != -1);

    // let front = 0;
    // let back = teams.length - 1;
    // console.log("Starting Sort")
    // while (front <= back) {
    //   console.log("First sort");
    //   for (let i = 0; i < officialTeams.length; i++) {
    //     console.log("Pushing front:", teams[front]);
    //     officialTeams[i].push(teams[front]);
    //     front++;
    //   }
    //   console.log(officialTeams)
    //   console.log("Second sort");
    //   for (let j = officialTeams.length - 1; j >= 0; j--) { // Corrected line
    //     console.log("Pushing", teams[back]);
    //     officialTeams[j].push(teams[back]);
    //     back--;
    //   }
    //   console.log(officialTeams)
    //   break;
    // }
    // console.log("End Sort")

    // return teams;
  }



  // This gets all users in the database
  onMount(async () => {
    try {
      const response = await fetch('../api/getUsers'); 
      if (response.ok) {
        users = await response.json();

        // This will get the admin user id from the dataset
        users.forEach((user:any) => {
          if (user.isAdmin === true) {
            adminIDNumber = user.UserID;
            adminName = user.username;
          }
        });

        // console.log("from function user", users);
      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });


  // This gets all the scores from the database
  onMount(async () => {
    try {
      const res = await fetch('../api/getQuizScores');
      if (res.ok) {
        userScores = await res.json();
        
        // Filters out the scores that are less than 0
        const filteredScores = userScores.filter((user:any) => user.score > 0);
        userScores = filteredScores;

        console.log("from function user", userScores);
      } else {
        console.error("Failed to get users", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })

  function easySort() {
    console.log("easy sort working");
  }

  function randomSort() {
    console.log("random sort working");
  }

  function complexFairSort() {
    console.log("Complex fair sort working");
  }

  // This hides the submit button to avoid changing group number
  function hideButton() {
    groupsButtonVisible = false;
    inputVisible = false;
  }

</script>

<h1>TEAM BUILDER</h1>

<!-- Iterate through each user and display them -->
<h1>WELCOME: {adminName}</h1>

<!-- This form wil submit the number of groups -->
<!-- Once submitted, it will hide the button to prevent resubmitting -->
<!-- The button is disabled until a postive value in entered -->
<form on:submit|preventDefault>
  Select the number of groups per team:
  {#if groupsButtonVisible === true && inputVisible === true} 
    <input type="number" bind:value={numGroups}>
    <button on:click={hideButton} class="group-button" disabled={numGroups <= 0}>submit</button>
  {/if}
</form>

<br>

<div>
  <strong>Select a sorting method:</strong>
  <button on:click={easySort}>Easy Sort</button>
  <button on:click={randomSort}>Random Sort</button>
  <button on:click={complexFairSort}>Complex Fair Sort</button>
</div>

<!-- This will be removed when login functionality works -->
<ul>
  {#each users as user (user.UserID)}
    {#if adminIDNumber !== user.UserID}
      <li>Non-Admin User: {user.UserID}, password: {user.password}</li>
    {/if}
  {/each}
</ul>

<div>
  The admins id number is: {adminIDNumber}<br>
  The number of groups is: {numGroups}
</div>
<br>
<div>
    {#each userScores as score (score.UserId)}
      <li>User Score: {score.UserId}: {score.score}</li>
    {/each}
</div>
