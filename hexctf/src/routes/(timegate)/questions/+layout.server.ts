import { error, redirect } from '@sveltejs/kit';

export async function load({fetch}) {
    async function fetchCompetition() {
		const response = await fetch('/api/competition', { method: 'GET' });
		const data = await response.json();
		if (data.status === "failure") { return {"competition": {"competitionName": "HexCTF"}}}

		return data.competition;
	}

    const competition = await fetchCompetition()
    if (!competition) throw error(404);
    const startTime = new Date(competition.startDate).getTime();
    const endTime = new Date(competition.endDate).getTime();
    const now = new Date().getTime();
    const timeDifferenceBefore = startTime - now;
    const timeDifferenceAfter = now - endTime;
    
    if (timeDifferenceBefore > 0) {
        throw error(403, "Competition has not begun");
    } else if(timeDifferenceAfter > 0) {
        throw error(403, "Competition is over!");
    }


}