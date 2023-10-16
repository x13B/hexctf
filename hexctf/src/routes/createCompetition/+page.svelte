<script lang="ts">
  import { onMount } from "svelte";
  
  let showForm = false;
  let categories: any[];
  let newCategory: string;
  let catName: string;
  let start: Date;
  let end: Date;
  let questions: any[] = [];
  let question_body: string = '';
  let question_answer: string = '';
  let questionId: number = 1;
  let categorySelected: string = '';
  const quizID: number = 1;
  let showMadeQuiz: boolean = false;
  let quizName: string = '';
  let showQuestionsAdded: boolean = true;
  let showQuizName: boolean = false;
  let competition_name: string = '';

  let showQuestions: boolean = false;
  let showCategories: boolean = false;

  onMount(async () => {
    console.log("Fetching quiz name");
    try {
      const res = await fetch('../api/getQuizName');
      if (res.ok) {
        let quizDetails: any[] = [];
        quizDetails = await res.json();

        quizName = quizDetails[0]["quizName"];  
        showQuizName = true;  
        
      } else {
        quizName = '';
        console.error("Failed to get categories", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })
  
  onMount(async () => {
    console.log("Fetching quiz questions");
    try {
      const res = await fetch('../api/getQuizQuestions');
      if (res.ok) {
        let quizQuestionDetails: any[] = [];
        quizQuestionDetails = await res.json();
        questions = quizQuestionDetails;
        showQuestions = true;
        
        console.log("Details fetched=\n", questions);
        
      } else {
        console.error("Failed to get categories", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })
  
  onMount(async () => {
    console.log("Fetching categories");
    try {
      const res = await fetch('../api/getCategories');
      if (res.ok) {
        categories = await res.json();      
        console.log("Categories: ", categories);
        showCategories = true;

      } else {
        console.error("Failed to get categories", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })
  
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
    let name = competition_name;
    let starting_date = start;
    let ending_date = end;
    
    console.log("Startime: ", starting_date);
    console.log("End time: ", ending_date);
    console.log(name, start, end);

    try {
      const res = await fetch("../api/submitCompDetails", {
        method: 'POST',
        headers: {
          'Content-Type' : 'applications/json',
        },
        body: JSON.stringify({name, starting_date, ending_date})
      });

      if (res.ok) {
          console.log('Competitions successfully created');
        } else {
          console.error('Failed to create competition:', res.statusText);
        }
    } catch (error) {
      console.error('Error adding comp details to the database:', error);
    }

    competition_name = '';
  }

  const addQuestion = async () => {
    const newQuestion = {
      questionBody: question_body,
      questionAnswer: question_answer,
      categoryName: categorySelected
    };
    
    let body: string = newQuestion.questionBody;
    let answer: string = newQuestion.questionAnswer;
    let cat: string = newQuestion.categoryName;

    try {
      const res = await fetch("../api/addQuizQuestions", {
        method: 'POST',
        headers: {
          'Content-Type' : 'applications/json',
        }, 
        body: JSON.stringify({body, answer, cat}),
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
    
    questionId++; // Increment the questionId
    question_body = '';
    question_answer = '';
    categorySelected = '';
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
    showQuizName = true;
  }
</script>

<h1>Create a Competition Page</h1>

<form action="#">
    <label for="name">Name of Competition</label>
    <input type="text" name="comp-name" placeholder="Name of competition" bind:value={competition_name}/><br>
    <label for="length">Start Date:</label>
    <input type="datetime-local" bind:value={start}/><br>
    
    <label for="length">End Date:</label>
    <input type="datetime-local" bind:value={end}/><br>
    
    <button type="submit" on:click={submitOptions}>Submit</button>
  </form>
  
  <form action="#">
    {#if showQuizName === false}
      <label for="New-Quiz">CREATE A NEW QUIZ</label>
      <br>
      <label for="name">ENTER QUIZ NAME: </label>
      <input type="text" bind:value={quizName} placeholder="Enter Quiz Name"/>
    {:else}
      <br>
      <label for="name">QUIZ NAME: <strong>{quizName.toUpperCase()}</strong></label>
      <br>
      <label for="selected-questions">SELECTED QUESTIONS</label>
      <br>
      {#if showQuestions == true}
      <ul>
        {#each questions as question}
        <li>Body: {question.questionBody}, Answer: {question.questionAnswer}</li>
        {/each}
      </ul>
      {/if}
    {/if}
    <br>
    <label for="add">Create New Category: </label>
    <input type="text" name="new-cat" bind:value={newCategory}/>
    <button type="button" on:click={createNewCategory}>Create New</button><br>
    
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
  {#if showCategories == true}
    {#each categories as cat (cat.CategoryId)}
        {cat.CategoryName}
        <input type="radio" name="{cat.CategoryName}">
    {/each}
  {/if}
  <button type="submit" on:click={addQuestion}>Add Question</button>
  <br>
  <button type="submit" on:click={submitQuiz}>Submit Quiz</button>
</form>
