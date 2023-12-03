<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    const questions = data.questions
    const answerQues = data.ansQuestions

</script>

<main>
    <h1>Statistics</h1>

    <table>
        <thead>
            <tr>
                <th>Question Title</th>
                <th>Number of Forfeits</th>
                <th>Min Time to Complete</th>
                <th>Avg Time to Complete</th>
                <th>Max Time to Complete</th>
            </tr>
        </thead>
        <tbody>
            {#each questions as ques}
            <tr>
                <td>{ques.title}</td>
                <td>{ques.forfeits}</td>
                <td>Min Time to Complete</td>
                <td>Avg Time to Complete</td>
                <td>Max Time to Complete</td>
            </tr>
            {/each}
        </tbody>
    </table>
</main>