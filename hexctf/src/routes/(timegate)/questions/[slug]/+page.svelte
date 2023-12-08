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

<main>
  <div class="container">
  <h2>{question?.title}</h2>
  <p>{question?.description}</p>
  {#if dockerState?.containerStatus === "running"}
    <p>{dockerState.containerIp}:{dockerState.containerPort}</p>
    <p>{dockerState.containerInfo}</p>
    {:else}
    <p>container is offline</p>
  {/if}
      <p>{question?.points} Points</p>

      {#if question.hint != ""}
    <button class="btn btn-outline-secondary" on:click|once={() => hintClicked = true}>
      Hint
    </button>
      {/if}
  {#if hintClicked}
    <p>{question?.hint}</p>
  {/if}
  {#if question.hint2 != ""}
    <button class="btn btn-outline-secondary" on:click|once={() => hintClicked2 = true}>
      Hint 2
    </button>
  {/if}
  {#if hintClicked2}
    <p>{question?.hint2}</p>
  {/if}
  {#if question.hint3 != ""}
    <button class="btn btn-outline-secondary" on:click|once={() => hintClicked3 = true}>
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

    <div class="mb-3">
    <form method="POST" action="?/answerQues" use:enhance>
      <label class="form-label" for="answer">Answer:</label>
      <input class="form-control" name="answer"/> <br/>
      <input class="btn btn-outline-primary" type="submit" value="Submit" />
    </form>
      </div>
      <div class="mb-3">
    <form method="POST" action="?/forfeit" use:enhance>
      <input class="btn btn-outline-danger" type="submit" value="Forfeit"/>
    </form>
    </div>
  {/if}
  <a class="btn btn-outline-secondary" href="./">Return</a>
</div>
</main>