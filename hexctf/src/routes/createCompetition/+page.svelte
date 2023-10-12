<script lang="ts">
  import { onMount } from "svelte";
  
  let showForm = false;
  let categories: any[];
  let newCategory: string;
  let catName: string;
  let start: Date;
  let end: Date;
  let data_loaded: boolean = false;
  let showQuizForm: boolean = false;
  let questions: any[] = [];
  let question_body: string = '';
  let question_answer: string = '';
  let questionId: number = 1;
  let categorySelected: string = '';
  const quizID: number = 1;
  let showMadeQuiz: boolean = false;
  let quizName: string = '';
  let showQuestionsAdded: boolean = true;

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
    console.log("Startime: ", start);
    console.log("End time: ", end);
    console.log(catName, start, end);

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

  const addQuestion = async () => {
    const newQuestion = {
      quizId: questionId,
      questionBody: question_body,
      questionAnswer: question_answer,
      categoryName: categorySelected
    };

    let id: number = newQuestion.quizId;
    let body: string = newQuestion.questionBody;
    let answer: string = newQuestion.questionAnswer;
    let cat: string = newQuestion.categoryName;

    try {
      const res = await fetch("../api/addQuizQuestions", {
        method: 'POST',
        headers: {
          'Content-Type' : 'applications/json',
        }, 
        body: JSON.stringify({id, body, answer, cat}),
      })
      if (res.ok) {
        console.log('Question added successfully to the database');
      } else {
        console.error('Failed to add question to the database:', res.statusText);
      }
    } catch (error) {
      console.error('Error adding question to the database:', error);
    }

    questions = [
      ...questions,
      { id: questionId, body: question_body, answer: question_answer, category: categorySelected }
    ];

    questions.sort((a, b) => a.category.localeCompare(b.category));
    
    console.log(questions);

    questionId++; // Increment the questionId
    question_body = '';
    question_answer = '';
  }

  const submitQuiz = async () => {
    console.log("Quiz ID: ", quizID);
    console.log("Quiz Name: ", quizName);
    for (let i = 0; i < questions.length; i++) {
      console.log("\nQuestion: ", questions[i].body);
      console.log("Answer: ", questions[i].answer);
      console.log("Catgory: ", questions[i].category);
    }
    showMadeQuiz = true;
    showQuestionsAdded = false;
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
                {category.CategoryName}
            <br>
        {/each}
        
        <label for="add">Create New Category: </label>
        <input type="text" name="new-cat" bind:value={newCategory}/>
        <button type="button" on:click={createNewCategory}>Create New</button><br>
        
        <label for="length">Start Date:</label>
        <input type="datetime-local" bind:value={start}/><br>
        
        <label for="length">End Date:</label>
        <input type="datetime-local" bind:value={end}/><br>
        
        <button type="submit" on:click={submitOptions}>Submit</button>
    </form>
{/if}

<br>

{#if showMadeQuiz !== false}
   <h1>{quizName}</h1>
   {#each questions as q (q.id)}
    <strong>Question: {q.body}</strong>
    <strong>Answer:   {q.answer}</strong>
    <strong>Category: {q.category}</strong>
    <br>
   {/each}
{/if}

{#if showQuizForm !== false}
    <form action="#">
      <label for="New-Quiz">CREATE A NEW QUIZ</label>
      <br>
      <label for="name">ENTER QUIZ NAME: </label>
      <input type="text" bind:value={quizName}/>
      <br>
      <label for="selected-questions">SELECTED QUESTIONS</label>
      <br>
      {#if showQuestionsAdded === true}
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
      {/if}
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
      {#each categories as cat, i}
        <label>
          {cat.CategoryName}
          <input type="radio" bind:group={categorySelected} value={cat.CategoryName} />
        </label>
      {/each}
      <button type="submit" on:click={addQuestion}>Add Question</button>
      <br>
      <button type="submit" on:click={submitQuiz}>Submit Quiz</button>
    </form>
{/if}