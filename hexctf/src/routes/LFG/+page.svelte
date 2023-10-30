<script lang="ts">
  import { onMount } from "svelte";

  let sortUsed: string = '';

  // Holds all users in the competition
  let users: any = [];

  // Holds admin ID
  let adminIDNumber: number;
  
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

      } else {
        console.error('Failed to fetch data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  // Holds student quiz questions
  let quiz_questions: any[] = [];
  let questions_loaded: boolean = false;

  onMount(async () => {
    try {
      const res = await fetch("../api/getQuizQuestions");
      if (res.ok) {
        console.log("Quiz questions loaded.");
        quiz_questions = await res.json();
        questions_loaded = true;
        console.log(quiz_questions);

      }
    } catch (error) {
      console.log("Error occured when loading questions: ", error);
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
        
        for (let i = 0; i < userScores.length; i++) {
          if (userScores[i]['userId'] == users_id_logged_in) {
            console.log("Student has taken quiz, setting flag.");
            quiz_taken = true;
          } 
        }

        console.log("scores = ", userScores);
      } else {
        console.error("Failed to get users", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
  
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
  
  let show_manual_teams_form = false;

  // This function will sort players based on weighted score using edit distance algorithm
  function createTeamsManually() {
    console.log("This creates the teams manually");
    show_manual_teams_form = !show_manual_teams_form;
    sortUsed = "Manual Option";

    teamsMadeBySort = [];
    for (let i = 0; i < numGroups; i++) {
      teamsMadeBySort.push([]);
    }

    showTeamsButton = true;
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
  // Get username from login form 
  import { username_when_logged_in, check_if_admin, users_id } from "../createCompetition/username";
  import { onDestroy } from "svelte";

  let users_name: string = "";
  let user_is_admin: boolean;
  let users_id_logged_in: string = "";
  
  // Set the users name then destroy when not using anymore
  const unsubscribe = username_when_logged_in.subscribe(value => {
    users_name = value;

    onDestroy(() => {
      unsubscribe();
    })
  });

  // Checks if the user logged in is the admin
  const admin_unsubscribe = check_if_admin.subscribe(value => {
    user_is_admin = value;

    onDestroy(() => {
      admin_unsubscribe();
    })
  });

  const user_id_unsubscribe = users_id.subscribe(value => {
    users_id_logged_in = value;

    onDestroy(() => {
      user_id_unsubscribe();
    })
  });

  // Holds the students responses to the quiz
  let student_answers: any[] = [];
  let quiz_taken: boolean = false;

  // Used to check answered and score the quiz
  async function scoreQuiz() {
    // Remove the first element because 0 isn't the first id in the quiz
    console.log("The student answered:", student_answers);
    
    // lowercase all answers to properly compare
    for (let i = 1; i < student_answers.length; i++) {
      student_answers[i] = student_answers[i].toLowerCase();
    }
    console.log("The student answered (lowercased):", student_answers);

    // Holds the student score for the quiz
    let student_score: number = 0;

    // Checks answers to give score
    for (let i = 1; i < student_answers.length; i++) {
      if (student_answers[i] === quiz_questions[i-1].questionAnswer) {
        student_score++;
      }
    }

    console.log("The student scored: ", student_score);
    let quizId: number = quiz_questions[0].quizQuestionsId;

    // This does not grab the users ID so we have to adjust this value
    let id: string = users_id_logged_in;
    let score: number = student_score;
    
    try {
      const res = await fetch("../api/submitQuizScore", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({ quizId, id, score }),
      });
  
      if (res.ok) {
        console.log("User score added to DB");
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("An error occured");
    }
    
    // Set quiz taken to true so the student cannot submit a second one
    quiz_taken = true;

    // This function should redirect student to Questions page for Competition
  }

  // This function will reset all the teams
  const clearTeams = () => {
    // reset teams
    teamsMadeBySort = [];
  }

  let team_number: number = 0;
  let student_id: string = "";
  const addStudentToTeam = () => {
    console.log(team_number);
    console.log(student_id);

    teamsMadeBySort[team_number-1].push({"quizId": 1, "userId":student_id});
    
    team_number = 0;
    student_id = "";  
  }

  user_is_admin = true;
</script>


<!-- Iterate through each user and display them -->

{#if user_is_admin === true}
  <h1>TEAM BUILDER (ADMIN)</h1>
  <h1>WELCOME: {users_name}</h1>

  <!-- This form wil submit the number of groups -->
  <!-- Once submitted, it will hide the button to prevent resubmitting -->
  <!-- The button is disabled until a postive value in entered -->
  <form on:submit|preventDefault>
    {#if groupsButtonVisible === true && inputVisible === true} 
    Select the number of teams:
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
      <button on:click={createTeamsManually}>Create Teams (Manually)</button>
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

  {#if show_manual_teams_form === true}
    <form on:submit|preventDefault>
      <h2>This form will let the admin create teams manually!</h2>
      {#each userScores as score (score.userId)}
        Student ID: <strong>{score.userId}</strong> Score: <strong>{score.score}</strong>
        <br>
      {/each}
      <label for="team#">Enter Team #:</label>
      <input type="number" bind:value={team_number}>
      <br>
      <label for="student-name">Enter Student ID:</label>
      <input type="text" bind:value={student_id}>
      <button on:click={addStudentToTeam}>Add Student</button>
    </form>
  {/if}
  
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
        <li>Team member: {player.userId}, score: {player.score}</li>
        {/each}
      </ul>
    </div>
    {/each}
    {/if}
  </div>
  <button on:click={clearTeams}>Clear Teams</button>
{:else}
  <h1>TEAM BUILDER (STUDENT)</h1>
  <h1>WELCOME: {users_name}</h1>
  <br>
  {#if quiz_taken === false}
    <h1>YOU HAVE NOT TAKEN THE QUIZ YET!</h1>
    <div>
      <form on:submit|preventDefault>
        {#each quiz_questions as question (question.quizQuestionsId)}
          <p>Question: {question.questionBody}</p>
          <input type="text" bind:value={student_answers[question.quizQuestionsId]}>
        {/each}
        <br>
        <button on:click={scoreQuiz}>Submit Quiz</button>
      </form>
    </div>
  {:else}
    <div>
      <h1>Quiz Taken!</h1>
    </div>
  {/if}
{/if}

