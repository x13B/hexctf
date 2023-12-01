<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData, ActionData } from "./$types";

    export let data: PageData;
    const  question  = data.question;
    const  check  = data.check;
    const dockerState = data.dockerState;
    export let form: ActionData;
    let hintClicked:boolean = false;
    let hintClicked2:boolean = false;
    let hintClicked3:boolean = false;
   

  </script>

<div class="page">
    <main>
      <h2>{question?.title}</h2>
      <p>{question?.description}</p>
      <p>{question?.points} Points</p>

      {#if question.hint != ""}
        <button on:click|once={() => hintClicked = true}>
          Hint
        </button>
      {/if}
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

      {#if dockerState}
        <p>This question has docker</p>
        {#if dockerState.containerStatus === "offline"}
        <form method="POST" action="?/dockerDeploy" use:enhance>
        Deploy Docker Image:<input type="submit" value="Deploy"/></form>
          <br />
          
        {:else if dockerState.containerStatus === "online"}
        <p>IP Address: {dockerState.containerIp}
        Port: {dockerState.containerPort}</p>
        {/if}
      {/if}
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
        <br />
        <form method="POST" action="?/forfeit" use:enhance>
        <input type="submit" value="Forfeit"/></form>
        
     {/if}
     <br />
     <a href="./">Return</a>
    </main>
  </div>