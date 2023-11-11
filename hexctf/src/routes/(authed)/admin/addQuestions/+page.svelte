<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    
    // Holds categories from DB
    let categories: any[] = data.categories;
    let newCategory: string = "";
    let questions: any[] = data.questions;
    let questions_not_empty: boolean = (questions.length > 0) ? true : false;
    let category_id: number = categories[categories.length - 1].categoryId + 1;
    
    // Only shows categories when loaded from DB
    let showCategories: boolean = (categories.length > 0) ? true : false;

    let original_questions: any[] = [];

    const addCompQuestion = () => {

    }

    // Let's you add new categories without overwriting the old ones.
    const createNewCategory = async () => {
      let id: number = category_id;
      let name: string = newCategory;
      
      try {
        const res = await fetch('/api/addCategory', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, name }),
        });
        
        if (res.ok) {
          console.log('Category added successfully to the database');
          // Fetch the updated list of categories from the server
          const updatedRes = await fetch('/api/getCategories');
          if (updatedRes.ok) {
            categories = await updatedRes.json();
          }
        } else {
          console.error('Failed to add category to the database:', res.statusText);
        }
      } catch (error) {
        console.error('Error adding category to the database:', error);
      }
      
      // Clear the input field after adding the category
      newCategory = '';
    };

    let editingRow: number | null = null;

    const startEditing = (index: number) => {
      editingRow = index;
      original_questions[index] = {...questions[index]};
    };

    const saveChanges = async (index: number) => {
      try {
          let id = questions[index].questionId;
          let title = questions[index].title;
          let description = questions[index].description;
          let answer = questions[index].answer;
          let difficulty = questions[index].difficulty;
          let points = questions[index].points;

          console.log(id, title, description, answer, difficulty, points);

          const res = await fetch('/api/updateQuestion', {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({id, title, description, answer, difficulty, points}),
          });

          if (res.ok) {
              console.log('Question updated successfully in the database');
              editingRow = null; // Exit edit mode
          } else {
              console.error('Failed to update question in the database:', res.statusText);
              // Handle error or display a message
          }
      } catch (error) {
          console.error('Error updating question in the database:', error);
          // Handle error or display a message
      }
    };

    const cancelUpdates = (index: number) => {
      questions[index] = { ...original_questions[index] };
      editingRow = null; // Exit edit mode
    };
  </script>

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
  {:else}
    <h4>No Categories Available</h4>
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
            <th>Answer</th>
            <th>Difficulty</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {#each questions as question, index (question.questionId)}
              <tr>
                  {#if editingRow === index}
                      <td><input type="text" bind:value={questions[index].title} /></td>
                      <td><input type="text" bind:value={questions[index].description} /></td>
                      <td><input type="text" bind:value={questions[index].answer}></td>
                      <td><input type="text" bind:value={questions[index].difficulty} /></td>
                      <td><input type="number" bind:value={questions[index].points} /></td>
                      <td>
                          <button on:click={() => saveChanges(index)}>Save</button>
                          <button on:click={() => cancelUpdates(index)}>Cancel</button>
                      </td>
                  {:else}
                      <td>{question.title}</td>
                      <td>{question.description}</td>
                      <td>{question.answer}</td>
                      <td>{question.difficulty}</td>
                      <td>{question.points}</td>
                      <td>
                          <button on:click={() => startEditing(index)}>Edit</button>
                      </td>
                  {/if}
              </tr>
          {/each}
        </tbody>
      </table>      
{/if}