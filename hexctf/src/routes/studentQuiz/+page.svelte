<script lang="ts">
    import type { PageData } from "../studentQuiz/$types";
    export let data: PageData;

    let quiz_taken: boolean = (data.quiz_results == null) ? false : true;

    let quiz_questions: any[] = (data.quizQuestions) ? data.quizQuestions : [];
    let student_answers: any[] = [];

    // Used to check answered and score the quiz
    async function scoreQuiz() {
        // Remove the first element because 0 isn't the first id in the quiz
        console.log("The student answered:", student_answers);
        
        // lowercase all answers to properly compare
        for (let i = 1; i < student_answers.length; i++) {
        student_answers[i] = student_answers[i].toLowerCase();
        }
        console.log("The student answered (lowercased):", student_answers);

        // Holds the student score for the quiz
        let student_score: number = 0;

        // Checks answers to give score
        for (let i = 1; i < student_answers.length; i++) {
            //console.log(student_answers[i] + " === " + quiz_questions[i-1].questionAnswer)
        if (student_answers[i] === quiz_questions[i-1].questionAnswer.toLowerCase()) {
            student_score++;
        }
        }

        console.log("The student scored: ", student_score);
        let quizId: number = quiz_questions[0].quizQuestionsId;

        // This does not grab the users ID so we have to adjust this value
        let id: string = data.userId;
        let score: number = student_score;
        
        try {
        const res = await fetch("../api/submitQuizScore", {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ quizId, id, score }),
        });

        if (res.ok) {
            console.log("User score added to DB");
        } else {
            console.log("Something went wrong");
        }
        } catch (error) {
        console.log("An error occured");
        }
        
        // Set quiz taken to true so the student cannot submit a second one
        quiz_taken = true;

        // This function should redirect student to Questions page for Competition
    }
</script>
<main>
    <div class="container">
<h1>Student Quiz Page</h1>
{#if quiz_taken === false}
    <h2>YOU HAVE NOT TAKEN THE QUIZ YET!</h2>
    <div>
    <form on:submit|preventDefault class="student-quiz-form">
        {#each quiz_questions as question (question.quizQuestionsId)}
        <p>Question: {question.questionBody}</p>
        <input class="form-control" type="text" bind:value={student_answers[question.quizQuestionsId]}>
        {/each}
        <br>
        <button on:click={scoreQuiz} class="submit-quiz-button btn btn-outline-secondary">Submit Quiz</button>
    </form>
    </div>
{:else}
    <div>
    <h2>Quiz Taken!</h2>
    </div>
{/if}
</div>
</main>