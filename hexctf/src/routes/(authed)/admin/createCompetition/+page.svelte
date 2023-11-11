<script lang="ts">
  import { onMount } from "svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
  let users_name: string = data.username;

  // Holds categories from DB
  let categories: any[];

  // Bound variable from form for start date of competition
  let start: string;

  // Bound variable from form for end date of competition
  let end: string;

  // Bound variable for name of competition
  let competition_name: string = '';

  // Only shows categories when loaded from DB
  let showCategories: boolean = false;
  
  // Load categories from DB
  onMount(async () => {
    console.log("Fetching categories");
    try {
      const res = await fetch('../api/getCategories');
      if (res.ok) {
        categories = await res.json();      
        console.log("Categories: ", categories);

        // Only show when categories have been loaded from DB
        showCategories = true;

      } else {
        console.error("Failed to get categories", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })
  
  // This function will submit user options to the DB
  async function submitOptions() {

    // Assign to new variables to prevent undefined
    let name: string = competition_name;

    start = start.toString();
    end = end.toString();

    // Submit options to server file to upload to DB
    try {
      const res = await fetch("../api/submitCompDetails", {
        method: 'POST',
        headers: {
          'Content-Type' : 'applications/json',
        },
        body: JSON.stringify({name, start, end})
      });

      if (res.ok) {
          console.log('Competitions successfully created');
        } else {
          console.error('Failed to create competition:', res.statusText);
        }
    } catch (error) {
      console.error('Error adding comp details to the database:', error);
    }

    // Reset competition_name
    competition_name = '';
  }

 
  const addCompQuestion = () => {
    console.log("Adding: ", );
  }
</script>

<h1>Welcome: {users_name}</h1>

<form action="#">
    <label for="name">Name of Competition</label>
    <input type="text" name="comp-name" placeholder="Name of competition" bind:value={competition_name}/><br>
    <label for="length">Start Date:</label>
    <input type="datetime-local" bind:value={start}/><br>
    
    <label for="length">End Date:</label>
    <input type="datetime-local" bind:value={end}/><br>
    
    <button type="submit" on:click={submitOptions}>Submit</button>
  </form>
  
<br>
<form action="#">
  <h3>Add Questions Form</h3>
  <label for="question-body">Question:</label>
  <input type="text">
  <br>
  <label for="answer">Answer:</label>
  <input type="text">
  <br>
  <label for="points">Points:</label>
  <input type="number">
  <br>
  <label for="difficulty">Difficulty:</label>
  <input type="text">
  <br>
  {#if showCategories == true}
    {#each categories as cat (cat.categoryId)}
        {cat.categoryName}
        <input type="radio" name="{cat.categoryName}">
    {/each}
  {/if}
  <br>
  <button on:click={addCompQuestion}>Add</button>
</form>