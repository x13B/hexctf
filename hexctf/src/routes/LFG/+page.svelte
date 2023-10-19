<script lang="ts">
  import { onMount } from "svelte";

  let sortUsed: string = '';

  // Holds all users in the competition
  let users: any = [];

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

  // Hides team button until teams are formed
  let showTeamsButton: boolean = false;
  
  // Hides sort buttons until number of groups if defined
  let showSortButtons: boolean = false;

  // This gets all users in the database
  onMount(async () => {
    try {
      const response = await fetch('../api/getUsers'); 
      if (response.ok) {
        users = await response.json();
        console.log(users);
        // This will get the admin user id from the dataset
        users.forEach((user:any) => {
          if (user.isAdmin === true) {
            adminIDNumber = user.id;
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
        const filteredScores = userScores.filter((user:any) => user.score >= 0);
        userScores = filteredScores;
        
        console.log(userScores);
      } else {
        console.error("Failed to get users", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })
  
  // This function will sort members in alternating order from high to low
  const easySort = () => {
    // Reset the teams before sorting
    teamsMadeBySort = [];
    
    // Toggle showTeamsButton
    showTeamsButton = true;
  
    // Set string to current algorithm
    sortUsed = "Easy Sort";

    // Sort the teams in ascending order
    userScores.sort((a:any, b:any) => a.score - b.score);
    
    // Will point from beginning to mid of array
    let leftPtr: number = 0;
    
    // Will point from end to mid of array
    let rightPtr: number = userScores.length - 1;
    
    // Make empty array for each team
    for (let i = 0; i < numGroups; i++) {
      teamsMadeBySort.push([]);
    }
    
    for (let i = 0; leftPtr <= rightPtr; i++) {
      teamsMadeBySort[i % numGroups].push(userScores[leftPtr]);
      leftPtr++;
    }

    for (let i = 0; i < teamsMadeBySort.length; i++) {
        for (let j = 0; j < teamsMadeBySort[i].length; j++) {
            console.log(teamsMadeBySort[i][j]);
        }
    }
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

  // This function will generate random groups regardless of quiz score
  function randomSort() {
    // Reset teams to an empty array to prevent adding more data
    teamsMadeBySort = [];

    // Show the show teams button
    showTeamsButton = true;

    // Shuffle all players 
    let shuffledTeams = shuffleArray(userScores);

    // Used to keep track of current index of randomized array
    let index: number = 0;

    // Determine the number of players per team
    const membersPerTeam: number = Math.floor(userScores.length / numGroups);
    
    // Iterate and create teams based on calculation
    for (let i = 0; i < numGroups; i++) {
      let team: any = [];

      for (let j = 0; j < membersPerTeam; j++) {
        team.push(shuffledTeams[index]);
        index++;
      }

      // Add team to teams array
      teamsMadeBySort.push(team);
    }

    // Handle remaining players if the number of players is odd
    while (index < shuffledTeams.length) {
      for (let i = 0; i < numGroups && index < shuffledTeams.length; i++) {
        teamsMadeBySort[i].push(shuffledTeams[index]);
        index++;
      }
    }
    
    // Set string to current algorithm
    sortUsed = "Random Sort";
  }
  
  // This function will sort players based on weighted score using edit distance algorithm
  function complexFairSort() {
    console.log("Complex fair sort working");
  }

  let showRoster: boolean = false;

  function showStudentRoster() {
    showRoster = !showRoster;
  }
    
  // This function toggles buttons to prevent resubmission of data
  function hideButton() {
    groupsButtonVisible = false;
    inputVisible = false;
    showSortButtons = true;
  }

</script>

<h1>TEAM BUILDER</h1>

<!-- Iterate through each user and display them -->
<h1>WELCOME: {adminName}</h1>

<!-- This form wil submit the number of groups -->
<!-- Once submitted, it will hide the button to prevent resubmitting -->
<!-- The button is disabled until a postive value in entered -->
<form on:submit|preventDefault>
  {#if groupsButtonVisible === true && inputVisible === true} 
    Select the number of groups per team:
    <input type="number" bind:value={numGroups}>
    <button on:click={hideButton} class="group-button" disabled={numGroups <= 1}>Submit</button>
  {/if}
</form>

<br>

<!-- Check to see if the number of groups is valid before sorting teams -->
<div>
  {#if showSortButtons === true}
    <strong>Select a sorting method:</strong>
    <button on:click={easySort}>Easy Sort</button>
    <button on:click={randomSort}>Random Sort</button>
    <button on:click={complexFairSort}>Complex Fair Sort</button>
  {/if}
</div>

<br>
<div>
    Show Student Roster:
    <button on:click={showStudentRoster}>Submit</button>
    <br>
    {#if showRoster === true}
      <h3>Student Name</h3>
      ================
      {#each users as student (student.id)}
        {#if student.isAdmin !== true}
          <li><strong>{student.username}</strong></li>
        {/if}
      {/each}
    {/if}
</div>

<div>
  {#if showTeamsButton === false}
  <h3>Currently no teams are formed</h3>
  {:else}
  <h2>Teams for the Competition</h2>
  <h3>Current Teams using {sortUsed}</h3>
    {#each teamsMadeBySort as teamArray, i}
    <div>
      <h2>Team: {i + 1}</h2>
          <ul>
            {#each teamArray as player (player.userId)}
            <li>Team member: {player.userId}</li>
            {/each}
          </ul>
        </div>
        {/each}
    {/if}
</div>