<script lang="ts">
  import { onMount } from "svelte";
  
  let showForm = false;
    let selectedCategories: string[];
    let categories: any[];
    let newCategory: string;
    let catName: string;
    let numQuestions: number;
    let start: Date;
    let end: Date;
    let data_loaded: boolean = false;
    let showQuizForm: boolean = false;
    let questions: any[] = [];
    let question_body: string = '';
    let question_answer: string = '';
    let questionId: number = 1;
    let categorySelected: string = '';

    onMount(async () => {
      try {
        const res = await fetch('../api/getCategories');
        if (res.ok) {
          categories = await res.json();      
          console.log(categories);
          data_loaded = true;

        } else {
          console.error("Failed to get categories", res.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })

    const displayForm = () => {
        showForm = true;
    }

    // Let's you add new categories without overwriting the old ones.
    const createNewCategory = async () => {
      const newCategoryObj = {
        CategoryId: categories.length + 1,
        CategoryName: newCategory,
      };

      // Add the category to your local array
      categories.push(newCategoryObj);
      // Trigger a reactivity update by assigning a new array
      categories = [...categories];

      // Clear the input field after adding the category
      newCategory = '';

      let id: number = newCategoryObj.CategoryId;
      let name: string = newCategoryObj.CategoryName;

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

    async function submitOptions() {
      console.log(selectedCategories);
      console.log("Startime: ", start);
      console.log("End time: ", end);
      console.log(catName, selectedCategories, numQuestions, start, end);

      showQuizForm = true;
        // console.log(selectedCategories);
        // const res = await fetch('../api/addCategory', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type' : 'application/json'
        //   },
        //   body: JSON.stringify({ })
        // });

        // if (res.ok) {
        //   console.log("Succesfully added category");
        // } else {
        //   console.error("Someting happened: ", res);
        // }
    }

    const addQuestion = () => {
      questions = [
        ...questions,
        { id: questionId, body: question_body, answer: question_answer, category: categorySelected }
      ];
      questionId++; // Increment the questionId
      question_body = '';
      question_answer = '';
    }
</script>

<h1>This is the create competition page</h1>

<button on:click={displayForm}>New Competiton</button>

{#if showForm == true}
    <form action="#">
        <label for="name">Name of Competition</label>
        <input type="text" name="comp-name" placeholder="Name of competition" bind:value={catName}/><br>
        
        <label for="category">Categories:</label><br>
        {#each categories as category (category.CategoryId)}
            <label>
                <input type="checkbox" name="cat-options" bind:group={selectedCategories} value={category.CategoryId}/>
                {category.CategoryName}
            </label><br>
        {/each}
        
        <label for="add">Create New Category: </label>
        <input type="text" name="new-cat" bind:value={newCategory}/>
        <button type="button" on:click={createNewCategory}>Create New</button><br>

        <label for="num-questions">Number of Questions per Category:</label>
        <input type="number" bind:value={numQuestions}/><br>
        
        <label for="length">Start Date:</label>
        <input type="datetime-local" bind:value={start}/><br>
        
        <label for="length">End Date:</label>
        <input type="datetime-local" bind:value={end}/><br>
        
        <button type="submit" on:click={submitOptions}>Submit</button>
    </form>
{/if}

<br>

{#if showQuizForm !== false}
    <form action="#">
      <label for="New-Quiz">CREATE A NEW QUIZ</label>
      <br>
      <label for="name">ENTER QUIZ NAME: </label>
      <input type="text"/>
      <br>
      <label for="selected-questions">SELECTED QUESTIONS</label>
      <br>
      <ul>
        {#each questions as question (question.id)}
          <li>
            <div>
              <strong>Question:</strong> {question.body}
            </div>
            <div>
              <strong>Answer:</strong> {question.answer}
            </div>
            <div>
              <strong>Category:</strong> {question.category}
            </div>
          </li>
        {/each}
      </ul>
      <br>
      <label for="questions">ADD A QUESTION </label>
      <br>
      <label for="question">Question: </label>
      <input type="text" bind:value={question_body}/>
      <br>
      <label for="answer">Answer: </label>
      <input type="text" bind:value={question_answer}/>
      <br>
      <label for="category">Category: </label>
      {#each selectedCategories as cat, i}
        {categories[i].CategoryName}<input type="checkbox" bind:value={categorySelected}/>
      {/each}
      <button type="submit" on:click={addQuestion}>Add Question</button>
    </form>
{/if}
