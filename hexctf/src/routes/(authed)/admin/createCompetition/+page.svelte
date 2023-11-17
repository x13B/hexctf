<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";

  export let data: PageData;
  let users_name: string = data.username;

  // Bound variable from form for start date of competition
  let start: string = "";
  let end: string = "";

  let start_date: string = (data.comp?.startDate) ? data.comp.startDate : "";
  let end_date: string = (data.comp?.endDate) ? data.comp.endDate : "";
  
  // Bound variable for name of competition
  let competition_name: string = '';

  let countdown: string = '';
  let show_timer: boolean = (data.comp != null) ? true : false;
  console.log(show_timer)
  let comp_name: string = (data.comp?.competitionName) ? data.comp.competitionName : "";

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
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({name, start, end})
      });

      if (res.ok) {
          console.log('Competitions successfully created');
          comp_name = name;
          start_date = start;
          end_date = end;
          show_timer = true;
        } else {
          console.error('Failed to create competition:', res.statusText);
        }
    } catch (error) {
      console.error('Error adding comp details to the database:', error);
    }

    // Reset competition_name
    competition_name = '';

    show_timer = true;
  }

  function startCountdown() {
    const startTime = new Date(start_date).getTime();
    const now = new Date().getTime();
    const timeDifference = startTime - now;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      countdown = `Starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    } 
  }

  let countdown_interval: NodeJS.Timeout;

  function startCountdownInterval() {
    startCountdown();
    // update every second
    countdown_interval = setInterval(startCountdown, 1000); 
  }

  onMount(startCountdownInterval);
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

{#if show_timer === true}
  <p>{countdown}</p>
  <h2>Competition Details</h2>
  <table>
    <tr>
      <th>Competition Name</th>
      <th>Start Date</th>
      <th>End Date</th>
    </tr>
    <tr>
      <td>{comp_name}</td>
      <td>{start_date}</td>
      <td>{end_date}</td>
    </tr>
  </table>
{/if}