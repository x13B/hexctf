<script lang="ts">
      import { onMount } from 'svelte';

      let questions: any = [];
      
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
  });
</script>

<h1>Questions</h1>
<ul>
    {#each questions as q (q.QuestionId)}
      <li>{q.QuestionId} - {q.Description} - {q.points}</li>
    {/each}
</ul>