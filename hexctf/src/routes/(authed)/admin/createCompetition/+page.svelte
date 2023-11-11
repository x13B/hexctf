<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let users_name: string = data.username;

  // Bound variable from form for start date of competition
  let start: string;

  // Bound variable from form for end date of competition
  let end: string;

  // Bound variable for name of competition
  let competition_name: string = '';

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
