<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let questions = data.assignedQuestions;
  
</script>

<main>
  <div class="container">
<h1>Questions</h1>
    {#each questions as q (q.categoryId)}
    <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{q.categoryName}</h5>
      {#each q.questions as ques}
        <a href="/questions/{ques.questionId}">
          <h6 class="card-subtitle mb-2 text-body-secondary">{ques.title}</h6>
        </a>
        <p class="card-text">{ques.points} points</p>
      {:else}
      <p class="card-text">No more questions in this category!</p>
      {/each}
      </div></div>
      <br>
    {/each}
</div>
</main>