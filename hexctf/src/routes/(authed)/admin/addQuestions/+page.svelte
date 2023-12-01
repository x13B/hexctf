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
        let hint = questions[index].hint;
        let hint2 = questions[index].hint2;
        let hint3 = questions[index].hint3;
        let answer = questions[index].answer;
        let difficulty = questions[index].difficulty;
        let points = questions[index].points;

        const res = await fetch('/api/updateQuestion', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, title, description, hint, hint2, hint3, answer, difficulty, points}),
        });

        if (res.ok) {
            console.log('Question updated successfully in the database');
            editingRow = null; // Exit edit mode

            questions = [...questions]; // TESTING
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

  const deleteQuestion = async (index: number) => {
    let id = questions[index].questionId;

    try {
      const res = await fetch("/api/deleteQuestion", {
        method: 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({id}),
      });

      if (res.ok) {
        console.log("The question has been deleted!");

        questions.splice(index, 1); // TESTING
        questions = [...questions]; // TESTING
      }
    } catch (error) {
      console.log("Error occured trying to delete question: ", error);
    }
  }

  let title: string = "";
  let question: string = "";
  let hint: string = "";
  let hint2: string = "";
  let hint3: string = "";
  let answer: string = "";
  let points: number = 0;
  let difficulty: string = "";
  let category: number = 0;

  const addCompQuestion = async () => {
    let cat = category;

    const res = await fetch("/api/addQuestion", {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({title, question, hint, hint2, hint3, answer, points, difficulty, cat}),
    })

    let qID = questions[questions.length-1].questionId + 1;

    let new_question = {
      answer: answer, 
      categoryId: cat, 
      description: question, 
      difficulty: difficulty, 
      hint: hint, 
      hint2: hint2,
      hint3: hint3,
      points: points,  
      title: title,
      questionId: qID
    }

    questions.push(new_question);
    questions = [...questions];

    title = "";
    question = "";
    hint = "";
    hint2 = "";
    hint3 = "";
    answer = "";
    points = 0;
    difficulty = "";
    category = 0;
  }

  let searchQuery: string = "";

  function filteredQuestionsWithIndex() {
    if (questions.length === 0) {
      return []; // Return an empty array if there are no questions
    }

    if (searchQuery === '') {
      return questions.map((question, index) => ({ originalIndex: index, question }));
    } else {
      // Filter questions based on the search query and store their original index
      return questions.map((question, index) => ({ originalIndex: index, question })).filter(({ question }) => {
        return (
          question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }
  }

  let filteredResults: any[] = [];
  const updateFilteredQuestions = () => {
    filteredResults = filteredQuestionsWithIndex();
  }

  // Function to handle filtering when the "Filter" button is clicked
  const filterQuestions = () => {
    updateFilteredQuestions(); // Update the filtered results based on the search query
  }
</script>

<h2>Add Questions Page</h2>

<form action="#">
  <h3>Add Questions Form</h3>
  <p>Please give one hint for hard questions, two hints for medium questions, and three hints for easy questions.</p>
  <label for="title">Title:</label>
  <input type="text" bind:value={title}>
  <br>
  <label for="question-body">Question:</label>
  <input type="text" bind:value={question}>
  <br>
  <label for="hint">Hint 1:</label>
  <input type="text" bind:value={hint}>
  <br>
  <label for="hint2">Hint 2:</label>
  <input type="text" bind:value={hint2}>
  <br>
  <label for="hint">Hint 3:</label>
  <input type="text" bind:value={hint3}>
  <br>
  <label for="answer">Answer:</label>
  <input type="text" bind:value={answer}>
  <br>
  <label for="points">Points:</label>
  <input type="number" bind:value={points}>
  <br>
  <label for="difficulty">Difficulty:</label>
  <select name="difficulty" bind:value={difficulty}>
    <option value="Easy">Easy</option>
    <option value="Medium">Medium</option>
    <option value="Hard">Hard</option>
  </select>
  <br>
  <label for="category">Category:</label>
  <select name="category" bind:value={category}>
    {#if showCategories == true}
      {#each categories as cat (cat.categoryId)}
        <option value={cat.categoryId}>{cat.categoryName}</option>
      {/each}
    {:else}
      <option value="">No Categories Available</option>
    {/if}
  </select>
  <br>
 <label for="docker">Docker:</label>
  <select name="docker">
    <!--   {#each dockers as docker}
        <option value={cat.categoryId}>{cat.categoryName}</option>
      {/each}
    {:else}
      <option value="">No Categories Available</option>
     -->
  </select>
  <br>
  <button on:click={addCompQuestion}>Add</button>
</form>

<br>
<label for="add">Create New Category: </label>
<input type="text" name="new-cat" bind:value={newCategory}/>
<button type="button" on:click={createNewCategory}>Create New</button><br>

<h3>Available Questions</h3>

<input type="text" bind:value={searchQuery} placeholder="Search for questions">
<button on:click={filterQuestions}>Search</button>
<p>Click Search button with an empty field to see all questions without any filter</p>
<p>CAUTION: 
  <li>When deleting a filtered question, only click delete once.</li>
  <li>Extra clicks will delete other questions!</li>
</p>
{#if questions_not_empty == false}
    <h4>Questions Not Available</h4>
{:else}
    <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Hint 1</th>
            <th>Hint 2</th>
            <th>Hint 3</th>
            <th>Answer</th>
            <th>Difficulty</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredResults as { originalIndex, question}}
              <tr>
                  {#if editingRow === originalIndex}
                      <td><input type="text" bind:value={questions[originalIndex].title} /></td>
                      <td><input type="text" bind:value={questions[originalIndex].description} /></td>
                      <td><input type="text" bind:value={questions[originalIndex].hint} /></td>
                      <td><input type="text" bind:value={questions[originalIndex].hint2} /></td>
                      <td><input type="text" bind:value={questions[originalIndex].hint3} /></td>
                      <td><input type="text" bind:value={questions[originalIndex].answer}></td>
                      <td><input type="text" bind:value={questions[originalIndex].difficulty} /></td>
                      <td><input type="number" bind:value={questions[originalIndex].points} /></td>
                      <td>
                          <button on:click={() => saveChanges(originalIndex)}>Save</button>
                          <button on:click={() => cancelUpdates(originalIndex)}>Cancel</button>
                      </td>
                  {:else}
                      <td>{question.title}</td>
                      <td>{question.description}</td>
                      <td>{question.hint}</td>
                      {#if question.hint2 == ""}
                      <td>None</td>
                      {:else}
                      <td>{question.hint2}</td>
                      {/if}
                      {#if question.hint3 == ""}
                      <td>None</td>
                      {:else}
                      <td>{question.hint3}</td>
                      {/if}
                      <td>{question.answer}</td>
                      <td>{question.difficulty}</td>
                      <td>{question.points}</td>
                      <td>
                          <button on:click={() => startEditing(originalIndex)}>Edit</button>
                      </td>
                      <td>
                        <button on:click={() => deleteQuestion(originalIndex)}>Delete</button>
                      </td>
                  {/if}
              </tr>
          {/each}
        </tbody>
      </table>      
{/if}