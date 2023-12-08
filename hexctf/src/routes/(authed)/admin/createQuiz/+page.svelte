<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;

    let questions: any[] = (data.quiz_questions.length > 1) ? data.quiz_questions : [];
    let categories: any[] = data.categories;
    let quizName: string = (data.quiz_name !== null) ? data.quiz_name.quizName : "";
    let quiz_id: number = (data.quiz_name?.quizId) ? data.quiz_name.quizId : 0;
    let quiz_name: string = "";

    let showQuestions: boolean = (questions.length > 0) ? true : false;
    let showQuizName: boolean = (questions.length > 0) ? true : false;

    let question_body: string = "";
    let question_answer: string = "";
    let showCategories: boolean = (categories.length > 0) ? true : false;
    let questionId: number = questions.length;
    let categorySelected: string = "";

    async function createQuizName() {
        let id: number = quiz_id;
        let name: string = quiz_name;

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
            quizName = name;
        } else {
            console.log("Something went wrong. Please try again");
        }
        } catch (error) {
        console.error("Error trying to create quiz: ", error);
        }
        
        showQuizName = true;
        quiz_name = "";
    }
    
    // This function will submit quiz options to the DB
    const submitQuiz = async () => {
    }

    // This function will add questions to the DB
    const addQuestion = async () => {
        // Testing, might remove
        let body: string = question_body;
        let answer: string = question_answer;
        let cat: string = categorySelected; 
        console.log(body, answer, cat);

        // Submit options to server file to upload to DB
        try {
            const res = await fetch("../api/addQuizQuestions", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                }, 
                body: JSON.stringify({ body, answer, cat }),
            });

            if (res.ok) {
                console.log('Question added successfully to the database');
                
                // Update questions array using reactive assignment
                questions = [
                    ...questions,
                    { id: questionId, body: body, answer: answer, category: cat }
                ];

                // Sort the questions by category for displaying together
                questions.sort((a, b) => a.category.localeCompare(b.category));

                // Increment the questionId
                questionId++;

                // Update showQuestions to trigger UI update
                showQuestions = true;
            } else {
                console.error('Failed to add question to the database:', res.statusText);
            }
        } catch (error) {
            console.error('Error adding question to the database:', error);
        }

        // RESET VALUES
        question_body = '';
        question_answer = '';
        categorySelected = '';
    };

    let editingRow: number | null = null;
    let original_questions: any[] = [];

    const startEditing = (index: number) => {
        editingRow = index;
        original_questions[index] = {...questions[index]};
    };

    const cancelUpdates = (index: number) => {
        questions[index] = { ...original_questions[index] };
        editingRow = null; // Exit edit mode
    };

    const deleteQuestion = (index: number) => {
        
    };
</script>

<main>
    <div class="container">
<h1>Create Quiz</h1>


<form action="#">
    <label for="name">ENTER QUIZ NAME: </label>
    <input type="text" bind:value={quiz_name} placeholder="Enter Quiz Name"/>
    <button class="btn btn-outline-primary" on:click={createQuizName}>Submit</button>
</form>
<br>
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
        <select bind:value={categorySelected}>
            {#each categories as cat (cat.categoryId)}
                <option value={cat.categoryName}>{cat.categoryName}</option>
            {/each}
        </select>
    {/if}
    <button type="submit" class="btn btn-outline-primary" on:click={addQuestion}>Add Question</button>
    <br>
    <button type="submit" class="btn btn-outline-primary" on:click={submitQuiz}>Submit Quiz</button>
</form>

{#if quizName}
<br>
<label for="name">QUIZ NAME: <strong>{quizName.toUpperCase()}</strong></label>
{/if}
{#if showQuestions == true}
<br>
<label for="selected-questions">SELECTED QUESTIONS</label>
<table class="table table-striped">
    <thead>
    <tr>
        <th>Question</th>
        <th>Answer</th>
        <th>Category</th>
    </tr>
    </thead>
    <tbody>
    {#each questions as question, index (question.quizQuestionsId)}
        {#if editingRow === index}
            <tr>
                <td><input type="text" bind:value={questions[index].questionBody}></td>
                <td><input type="text" bind:value={questions[index].questionAnswer}></td>
                <td>
                    <button class="btn btn-outline-primary" on:click={() => cancelUpdates(index)}>Cancel</button>
                </td>
            </tr>
        {:else}
            <tr>
                <td>{question.questionBody}</td>
                <td>{question.questionAnswer}</td>
                <td>{question.category}</td>
                <td>
                    <button class="btn btn-outline-primary" on:click={() => startEditing(index)}>Edit</button>
                </td>
                <td>
                    <button class="btn btn-outline-danger" on:click={() => deleteQuestion(index)}>Delete</button>
                </td>
            </tr>
        {/if}
    {/each}
    </tbody>
</table>
{/if}
</div>
</main>