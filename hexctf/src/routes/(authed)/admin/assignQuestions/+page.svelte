<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageData } from "./$types";

    export let data: PageData;
    let category_questions = data.categoriesQuestions;

      
</script>
<main>
    <h1>Assign Questions</h1>
    <h4>Pick the questions that each team will start with</h4>
    <form method="POST" use:enhance>
    <table><tr>
    {#each category_questions as question (question.categoryId)}
    <th>
        {question.categoryName}
    </th>
    {/each}
    </tr><tr>
    {#each category_questions as question (question.categoryId)}
        <th>
            {#if question.questions.length > 0}
                <select name="{"select"}" id="{question.categoryId + ""}">
                    {#each question.questions as ques}
                        <option value="{ques.questionId}">{ques.title}</option>
                    {/each}
                </select>
            {:else}
                <p>N/A</p>
            {/if}
        </th>
    {/each}
    </tr></table>
<br/><input type="submit" value="Submit" />
</form>
</main>