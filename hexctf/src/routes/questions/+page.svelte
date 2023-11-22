<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  let questions = data.assignedQuestions;
  
</script>

<h1>Questions</h1>
<ul>
    {#each questions as q (q.categoryId)}
      <li><h3>{q.categoryName}</h3></li>
      {#each q.questions as ques}
        <ul><a href="/questions/{ques.questionId}">{ques.title}</a> - {ques.points} points</ul>
      {:else}
      <ul>No more questions in this category!</ul>
      {/each}
      <br>
    {/each}
</ul>
