<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData, ActionData } from "./$types";

    export let data: PageData;
    const  question  = data.question;
    const  check  = data.check;
    export let form: ActionData;
    let hintClicked:boolean = false
   

  </script>

<div class="page">
    <main>
      <h2>{question?.title}</h2>
      <p>{question?.description}</p>
      <button on:click|once={() => hintClicked = true}>
        Need a hint?
      </button>
      {#if hintClicked}
        <p>{question?.hint}</p>
      {/if}
      <p>{question?.points} Points</p>
      {#if check.resp}
        <p><b>Your team has already answered this question!</b></p>
      {:else}
        {#if form?.response}
          <p><b>Correct! You earned {question?.points} points!</b></p>
        {:else if form?.response === false}
          <p><b>Wrong!</b></p>
        {/if}

        <form method="POST" action="?/answerQues" use:enhance>
        <label for="answer">Answer:
        <input name="answer"/>
        <input type="submit" value="Submit" />
        </label></form>
        <form method="POST" action="?/forfeit" use:enhance>
        <input type="submit" value="Forfeit"/></form>
        
     {/if}
     <a href="./">Return</a>
    </main>
  </div>