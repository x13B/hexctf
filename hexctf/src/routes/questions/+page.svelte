<script lang="ts">
  import { onMount } from 'svelte';
  import type { PageData } from "./$types";


  let categories: any = [];

  export let data: PageData;
  let questions = data.questions;
  //console.log(questions[1]);
  
  onMount(async () => {
  // try {
  //   const response = await fetch('../api/getQuestions'); 
  //   if (response.ok) {
  //     allQuestions = await response.json();
  //     //console.log("from function questions", questions);
  //   } else {
  //     console.error('Failed to fetch data:', response.status);
  //   }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
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
    {#each questions as q}
      {#if q.categoryId === c.categoryId}
        <ul><a href="/questions/{q.questionId}">{q.title}</a> - {q.points} points</ul>
      {/if}
    {/each}
    <br>
  {/each}
</ul>
