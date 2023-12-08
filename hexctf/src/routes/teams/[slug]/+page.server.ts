import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ fetch, params: { slug }}) => {
    async function fetchTeam() {
        const response = await fetch('/api/teams/' + slug + '');
        const data = await response.json();
        if (data.team === null) throw error(404, "Team does not exist");
        return data.team;
    }

    async function fetchTeamMembers() {
        const response = await fetch('/api/teams/' + slug + '/members');
        const data = await response.json();

        return data.teamMembers;
    }

    async function fetchTeamAnswers() {
        const response = await fetch('/api/teams/' + slug + '/questions/answered');
        const data = await response.json();

        return data.questionsAnswered;
    }

    return {
        team: fetchTeam(),
        teamMembers: fetchTeamMembers(),
        teamAnswers: fetchTeamAnswers()
    };
}) satisfies PageServerLoad;