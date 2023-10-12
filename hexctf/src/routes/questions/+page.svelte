<script lang="ts">
      import { onMount } from 'svelte';

      let questions: any = [];
      let categories: any = [];
      
      onMount(async () => {
        try {
      const response = await fetch('../api/getQuestions'); 
      if (response.ok) {
        questions = await response.json();
        console.log("from function questions", questions);
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
        console.log("from function categories", categories);
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
  {#each categories as c (c.CategoryId)}
  <li>{c.CategoryName}</li>
    {#each questions as q (q.QuestionId)}
    {#if q.categoryId === c.CategoryId}
      <ul><a href="/questions/{q.QuestionId}">{q.Description}</a> - {q.points} points</ul>
    {/if}
      {/each}
    {/each}
</ul>
