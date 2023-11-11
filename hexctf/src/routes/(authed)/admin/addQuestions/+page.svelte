<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;
    
    // Only shows categories when loaded from DB
    let showCategories: boolean = false;

    // Holds categories from DB
    let categories: any[] = data.categories;
    let newCategory: string = "";
    let questions: any[] = data.questions;
    let questions_not_empty: boolean = (questions.length > 0) ? true : false;
    console.log(questions)

    // Load categories from DB
    onMount(async () => {
        try {
            const res = await fetch('../api/getCategories');
            if (res.ok) {
            categories = await res.json();      

            // Only show when categories have been loaded from DB
            showCategories = true;

            } else {
            console.error("Failed to get categories", res.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    })
  
 
    const addCompQuestion = () => {
        console.log("Adding: ", );
    }

        // Let's you add new categories without overwriting the old ones.
        const createNewCategory = async () => {
        const newCategoryObj = {
        categoryId: categories.length + 1,
        categoryName: newCategory,
        };
        
        // Add the category to your local array
        categories.push(newCategoryObj);
        // Trigger a reactivity update by assigning a new array
        categories = [...categories];

        // Clear the input field after adding the category
        newCategory = '';

        let id: number = newCategoryObj.categoryId;
        let name: string = newCategoryObj.categoryName;

        try {
        const res = await fetch('/api/addCategory', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, name}),
        });

        if (res.ok) {
            console.log('Category added successfully to the database');
            // You can optionally fetch the updated list of categories from the server
            // and update your local categories array here.
        } else {
            console.error('Failed to add category to the database:', res.statusText);
        }
        } catch (error) {
        console.error('Error adding category to the database:', error);
        }
    };
</script>

<br>
<form action="#">
  <h3>Add Questions Form</h3>
  <label for="question-body">Question:</label>
  <input type="text">
  <br>
  <label for="answer">Answer:</label>
  <input type="text">
  <br>
  <label for="points">Points:</label>
  <input type="number">
  <br>
  <label for="difficulty">Difficulty:</label>
  <input type="text">
  <br>
  {#if showCategories == true}
    {#each categories as cat (cat.categoryId)}
        {cat.categoryName}
        <input type="radio" name="{cat.categoryName}">
    {/each}
  {/if}
  <br>
  <button on:click={addCompQuestion}>Add</button>
</form>

<br>
<label for="add">Create New Category: </label>
<input type="text" name="new-cat" bind:value={newCategory}/>
<button type="button" on:click={createNewCategory}>Create New</button><br>

<h3>QUESTIONS</h3>
<h3>Search</h3>
{#if questions_not_empty == false}
    <h4>Questions Not Available</h4>
{:else}
    <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {#each questions as question (question.questionId)}
            <tr>
              <td>{question.title}</td>
              <td>{question.description}</td>
              <td>{question.difficulty}</td>
              <td>{question.points}</td>
              <td>Edit</td>
            </tr>
          {/each}
        </tbody>
      </table>      
{/if}