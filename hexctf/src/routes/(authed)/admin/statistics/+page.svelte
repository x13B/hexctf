<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    const questions = data.questions
    //const answerQues = data.final

</script>

<main>
    <h1>Statistics</h1>

    <table>
        <thead>
            <tr>
                <th colspan="2"></th>
                <th colspan="3">Time in Minutes to Solve</th>
            </tr>
            <tr>
                <th>Question Title</th>
                <th>Forfeits</th>
                <th>Minimum</th>
                <th>Average</th>
                <th>Maximum</th>
            </tr>
        </thead>
        <tbody>
            {#each questions as ques}
            <tr>
                <td>{ques.title}</td>
                <td>{ques.forfeits}</td>
                <td>{Math.round(ques.min * 0.00001667)}</td>
                <td>{Math.round(ques.avg * 0.00001667)}</td>
                <td>{Math.round(ques.max * 0.00001667)}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</main>