<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData, ActionData } from "./$types";
  
    export let data: PageData;
    const  question  = data.question;
    export let form: ActionData;
    const  check  = data.check;

  </script>

<div class="page">
    <main>
      <h2>{question?.title}</h2>
      <p>{question?.description}</p>
      <p>{question?.points} Points</p>
      {#if check.resp}
        <p><b>Your team has already answered this question!</b></p>
      {:else}
        <form method="POST" use:enhance>
        <label for="answer">Answer:
        <input name="answer"/>
        <input type="submit" value="Submit" />
        </label></form>
        {#if form?.response}
          <p>Correct! You earned {question?.points} points!</p>
        {:else if form?.response === false}
          <p>Wrong!</p>
        {/if}
    {/if}
    <a href="./">Return</a>
    </main>
  </div>