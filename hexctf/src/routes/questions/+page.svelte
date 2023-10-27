<script lang="ts">
  import { onMount } from 'svelte';

  let questions: any = [];
  let categories: any = [];
  
  onMount(async () => {
  try {
    const response = await fetch('../api/getQuestions'); 
    if (response.ok) {
      questions = await response.json();
      //console.log("from function questions", questions);
    } else {
      console.error('Failed to fetch data:', response.status);
    }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  try {
    const response = await fetch('../api/getCategories'); 
    if (response.ok) {
      categories = await response.json();
      //console.log("from function categories", categories);
    } else {
      console.error('Failed to fetch data:', response.status);
    }
    } catch (error) {
    console.error('Error fetching data:', error);
    }
  });
</script>

<h1>Questions</h1>
<ul>
  {#each categories as c (c.categoryId)}
    <li><h3>{c.categoryName}</h3></li>
    {#each questions as q (q.questionId)}
      {#if q.categoryId === c.categoryId}
        <ul><a href="/questions/{q.questionId}">{q.title}</a> - {q.points} points</ul>
      {/if}
    {/each}
    <br>
  {/each}
</ul>
