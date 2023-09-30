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

  // Holds the teams for the competition
  let teamsMadeBySort: any = [];
  
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
      } else {
        console.error("Failed to get users", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })
 
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

  function easySort() {
    console.log("easy sort working");
  }

  // Using Fisher-Yates algorithm to randomly sort
  const shuffleArray = (array:any) => {
    // Create a shallow copy of the original array
    const shuffledArray = [...array]; 

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      // Swap the elements in the shuffledArray
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
    }

    // Return the shuffled array
    return shuffledArray;
  };

  function randomSort() {
    let shuffledTeams = shuffleArray(userScores);
    let index: number = 0;
    const membersPerTeam: number = Math.floor(userScores.length / numGroups);
    
    
    for (let i = 0; i < numGroups; i++) {
      let team: any = [];

      for (let j = 0; j < 2; j++) {
        team.push(shuffledTeams[index]);
        index++;
      }
      teamsMadeBySort.push(team);
    }

    console.log("teams", teamsMadeBySort);
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

<!-- Check to see if the number of groups is valid before sorting teams -->
<div>
  {#if numGroups > 0}
    <strong>Select a sorting method:</strong>
    <button on:click={easySort}>Easy Sort</button>
    <button on:click={randomSort}>Random Sort</button>
    <button on:click={complexFairSort}>Complex Fair Sort</button>
  {/if}
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

{#if teamsMadeBySort.length > 0}
  <!-- <strong>Teams have not been defined</strong> -->
<!-- {:else} -->
  <div>
    <strong>Current Teams</strong>
    {teamsMadeBySort}
    {#each teamsMadeBySort as teamArray}
      <div>
        <h2>Team:</h2>
        <ul>
          {#each teamArray as player}
            <li>{player.name}</li>
          {/each}
        </ul>
      </div>
    {/each}
  </div>
{/if}