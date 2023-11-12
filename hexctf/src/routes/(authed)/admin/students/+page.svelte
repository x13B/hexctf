<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;

    let students: any[] = (data.users) ? data.users : [];
    let results: any[] = (data.quizRes) ? data.quizRes : [];
    let show_students: boolean = (students.length > 0) ? true : false;

    function hasTakenQuiz(student: any): boolean {
        return results.some(result => result.userId === student.id);
    }

    const nonAdminStudents = students.filter(student => !student.isAdmin);

    function getStudentScore(student: any): number | string {
        const result = results.find(res => res.userId === student.id);
        return result ? result.score : 'N/A';
    }
</script>

<h3>Student Roster Page</h3>

{#if show_students}
    <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Quiz Taken?</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
            {#each nonAdminStudents as student (student.id)}
                <tr>
                    <td>
                        {student.username}
                    </td>
                    <td>
                        {#if hasTakenQuiz(student)}
                            Taken
                        {:else}
                            Not Taken
                        {/if}
                    </td>
                    <td>
                        {getStudentScore(student)}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
{/if}





