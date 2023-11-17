<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData, ActionData } from "./$types";

    export let data: PageData;
    const  question  = data.question;
    const  check  = data.check;
    export let form: ActionData;
    let hintClicked:boolean = false;
    let hintClicked2:boolean = false;
    let hintClicked3:boolean = false;
   


  </script>

<div class="page">
    <main>
      <h2>{question?.title}</h2>
      <p>{question?.description}</p>
      <button on:click|once={() => hintClicked = true}>
        Hint
      </button>
      {#if hintClicked}
        <p>{question?.hint}</p>
      {/if}
      {#if question.hint2 != ""}
        <button on:click|once={() => hintClicked2 = true}>
          Hint 2
        </button>
      {/if}
      {#if hintClicked2}
        <p>{question?.hint2}</p>
      {/if}
      {#if question.hint3 != ""}
        <button on:click|once={() => hintClicked3 = true}>
          Hint 3
        </button>
      {/if}
      {#if hintClicked3}
        <p>{question?.hint3}</p>
      {/if}
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