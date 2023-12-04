<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let hide_submit_button: boolean = (data.comp == null) ? false : true;

  // Bound variable from form for start date of competition
  let start: string = "";
  let end: string = "";
  let comp_description: string = "";

  let start_date: string = (data.comp?.startDate) ? data.comp.startDate : "";
  let end_date: string = (data.comp?.endDate) ? data.comp.endDate : "";
  
  // Bound variable for name of competition
  let competition_name: string = '';

  // let countdown: string = '';
  let show_comp_details: boolean = (data.comp != null) ? true : false;

  let comp_name: string = (data.comp?.competitionName) ? data.comp.competitionName : "";

  // This function will submit user options to the DB
  async function submitOptions() {
    if (!competition_name || !start || !end || !comp_description) {
      return;
    }

    // Assign to new variables to prevent undefined
    let name: string = competition_name;
    let desc: string = comp_description;

    start = start.toString();
    end = end.toString();

    // Submit options to server file to upload to DB
    try {
      const res = await fetch("../api/submitCompDetails", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({name, start, end, desc})
      });

      if (res.ok) {
          console.log('Competitions successfully created');
          comp_name = name;
          start_date = start;
          end_date = end;
          show_comp_details = true;
          hide_submit_button = true;
        } else {
          console.error('Failed to create competition:', res.statusText);
        }
    } catch (error) {
      console.error('Error adding comp details to the database:', error);
    }

    // Reset competition_name
    competition_name = '';
    comp_description = '';

    show_comp_details = true;
  }
</script>

<h1>Create Competition</h1>

<form action="#">
  <label for="name">Name of Competition</label>
  <input type="text" name="comp-name" placeholder="Name of competition" bind:value={competition_name} required/><br>
  <label for="length">Start Date:</label>
  <input type="datetime-local" bind:value={start} required/><br>
  
  <label for="length">End Date:</label>
  <input type="datetime-local" bind:value={end} required/><br>
  <label for="description">Competition Description</label><br>
  <textarea placeholder="Enter details and notes about competition." bind:value={comp_description}></textarea>
  {#if !hide_submit_button}
  <p>Note: All fields required. Cannot submit form with empty input.</p>
  <button class="btn variant-filled" type="submit" on:click={submitOptions}>Submit</button>
  {/if}
</form>

{#if show_comp_details === true}
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