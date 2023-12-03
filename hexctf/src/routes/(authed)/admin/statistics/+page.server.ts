import type { PageServerLoad } from "./$types";

export const load = (async ({fetch}) => {
    async function fetchQuestions() {
        const response = await fetch('/api/questions', { method: 'GET' });
        const data = await response.json();

        return data.questions;
    }
    async function fetchAnsQuestions() {
        const response = await fetch('/api/questions/answered', { method: 'GET' });
        const data = await response.json();

        return data.ansQuestions;
    }

    const questions = await fetchQuestions()
    const ansQuestions = await fetchAnsQuestions()

    let final = []

    for( let ques of ansQuestions) {
        const sub = new Date(ques.createdAt).getTime() - new Date(ques.assignedCreatedAt).getTime()
        final.push([ques.questionId, sub])
    }
    console.log(final)

    for (let stat of final) {

    }
    
	return {
        questions,
        ansQuestions
	};

}) satisfies PageServerLoad;