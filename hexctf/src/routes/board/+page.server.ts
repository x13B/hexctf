import type { PageServerLoad } from "./$types";


export const load = (async ({ fetch }) => {
    async function fetchTeamsQuesAnsCount() {
        const response = await fetch('/api/teams/questions/answered/count', { method: 'GET' });
        const data = await response.json();

        return data.teamQuesAnsCount;
    }

	return {
        teamQuesAnsCount: fetchTeamsQuesAnsCount()
	};
}) satisfies PageServerLoad;