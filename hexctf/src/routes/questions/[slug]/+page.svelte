<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData, ActionData } from "./$types";
  
    export let data: PageData;
    const { question } = data;
    export let form: ActionData;
  </script>

<div class="page">
    <main>
      <h2>{question?.Description}</h2>
      <p>{question?.points} Points</p>
      <form method="POST" use:enhance>
      <label for="answer">Answer:
      <input name="answer"/>
      <input type="submit" value="Submit" />
    </label></form>
    {#if form?.success}
    <p>Correct! You earned {question?.points} points!</p>
    {:else if form?.success === false}
    <p>Wrong!</p>
    {/if}
      <a href="./">Return</a>
    </main>
  </div>