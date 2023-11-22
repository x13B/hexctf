<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    const team = data.team;
    const members = data.teamMembers;
    const answers = data.teamAnswers;
    
</script>
<main>
    <h1>{team.teamName}</h1>
    <p>Points: {team.points}</p>
    { #if members.length !== 0}
    <p>Members:</p>
    <ul>
        {#each members as member}
        <li>{member.user.username}</li>
        {/each}
    </ul>
    {:else}
    <p>This team has no members!</p>
    {/if}
    { #if answers.length !== 0}
    <p>Questions Answered:</p>
    <ul>
        { #each answers as answer }
        <li><a href="/questions/{answer.questions.questionId}">{answer.questions.title}</a></li>
        {/each}
    </ul>
    {:else}
    <p>This team has no questions answered!</p>
    {/if}
    <a href="/board">Return</a>
</main>