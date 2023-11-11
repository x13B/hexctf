<script lang="ts">
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    export let data: PageData;

    let questions: any[] = data.quiz_questions;
    let categories: any[] = data.categories;
    let quizName: string = "";
    
    let showQuestions: boolean = (questions.length > 0) ? true : false;
    let showQuizName: boolean = (questions.length > 0) ? true : false;

    let question_body: string = "";
    let question_answer: string = "";
    let showCategories: boolean = (categories.length > 0) ? true : false;



    onMount(async () => {
        console.log("Fetching quiz name");
        try {
        const res = await fetch('../api/getQuizName');
        if (res.ok) {
            let quizDetails: any[] = [];
            quizDetails = await res.json();

            quizName = quizDetails[0]["quizName"];  

            // Set to true to prevent loading errors
            showQuizName = true;  
            
        } else {
            quizName = '';
            console.error("Failed to get categories", res.status);
        }
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    })

    async function createQuizName() {
        let id: number = 1;
        let name: string = quizName;

        try {
        const res = await fetch("../api/createQuiz", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name })
        });
        
        if (res.ok) {
            console.log("Able to create quiz");
        } else {
            console.log("Something went wrong. Please try again");
        }
        } catch (error) {
        console.error("Error trying to create quiz: ", error);
        }
        
        showQuizName = true;
    }
    
    // This function will submit quiz options to the DB
    const submitQuiz = async () => {
    }

    // This function will add questions to the DB
    const addQuestion = async () => {

        // // Create a new object to prevent undefined values
        // const newQuestion = {
        //     questionBody: question_body,
        //     questionAnswer: question_answer,
        //     categoryName: categorySelected
        // };

        // // Testing, might remove
        // let body: string = newQuestion.questionBody;
        // let answer: string = newQuestion.questionAnswer;
        // let cat: string = newQuestion.categoryName;

        // // Submit options to server file to upload to DB
        // try {
        // const res = await fetch("../api/addQuizQuestions", {
        //     method: 'POST',
        //     headers: {
        //     'Content-Type' : 'applications/json',
        //     }, 
        //     body: JSON.stringify({body, answer, cat}),
        // })
        // if (res.ok) {
        //     console.log('Question added successfully to the database');
        // } else {
        //     console.error('Failed to add question to the database:', res.statusText);
        // }
        // } catch (error) {
        // console.error('Error adding question to the database:', error);
        // }

        // // Append to local questions Array
        // questions = [
        //     ...questions,
        //     { id: questionId, body: question_body, answer: question_answer, category: categorySelected }
        // ];

        // // Sort the questions by category for displaying together
        // questions.sort((a, b) => a.category.localeCompare(b.category));

        // // Increment the questionId
        // questionId++;

        // // RESET VALUES
        // question_body = '';
        // question_answer = '';
        // categorySelected = '';
    }



</script>

<h1>CREATE A QUIZ PAGE</h1>
<form action="#">
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
    {#each categories as cat (cat.categoryId)}
        {cat.categoryName}
        <input type="radio" name="{cat.categoryName}">
    {/each}
  {/if}
  <button type="submit" on:click={addQuestion}>Add Question</button>
  <br>
  <button type="submit" on:click={submitQuiz}>Submit Quiz</button>
</form>

{#if showQuizName === false}
    <label for="New-Quiz">CREATE A NEW QUIZ</label>
    <br>
    <label for="name">ENTER QUIZ NAME: </label>
    <input type="text" bind:value={quizName} placeholder="Enter Quiz Name"/>
    <button on:click={createQuizName}>Submit</button>
{:else}
    <br>
    <label for="name">QUIZ NAME: <strong>{quizName.toUpperCase()}</strong></label>
    <br>
    <label for="selected-questions">SELECTED QUESTIONS</label>
    <br>
    {#if showQuestions == true}
    <table>
        <thead>
        <tr>
            <th>Question</th>
            <th>Answer</th>
        </tr>
        </thead>
        <tbody>
        {#each questions as question (question.quizQuestionsId)}
            <tr>
            <td>{question.questionBody}</td>
            <td>{question.questionAnswer}</td>
            <td>Edit</td>
            </tr>
        {/each}
        </tbody>
    </table>
    {/if}
{/if}