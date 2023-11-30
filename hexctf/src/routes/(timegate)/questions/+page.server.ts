import { error, redirect } from "@sveltejs/kit";
import prisma from "$lib/prisma";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch }) => {
	async function fetchSession() {
		const response = await fetch('/api/users/id', { method: 'GET' });
        const data = await response.json();
		if (data.status === "failure") throw error(404, "You must be logged in to see questions");

        return data.session;
	}

	async function fetchTeam() {
		const session = await fetchSession();
		const userId = session.userId;
		
		const response = await fetch('/api/users/' + userId + '/team', { method: 'GET' });
        const data = await response.json();
		if (data.status === "failure") throw error(404, "You must be in a team to see questions");


        return data.team;
	}

	async function fetchAssignedQuestions() {
		const team = await fetchTeam()
		const teamId = team.teamId;
		const response = await fetch('/api/teams/' + teamId + '/questions', { method: 'GET' });
        const data = await response.json();

        return data.assignedCategoriesQuestions;
	}
	return {
        assignedQuestions: fetchAssignedQuestions()
	};
};

