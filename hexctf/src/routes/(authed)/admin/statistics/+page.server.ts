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
        //console.log(ques.questionId)
        var min = 0;
        var max = 0;
        var avg = 0;
        var count = 0;
        for (let ans of ques.answers) {
            //console.log(ans);
            count++;
            var time = new Date(ans.createdAt).getTime() - new Date(ans.assignedCreatedAt).getTime()
            //console.log(time)
            avg += time;
            if (min == 0) {min = time}
            if (time > max) {max = time}
            if (time < min) {min = time}
        }
        var avg_final = avg / count;
        //if (Number.isNaN(avg_final)) {avg_final = 0}
        //console.log(min, avg_final, max)
        //final.push({"qid": ques.questionId, "min": min, "avg": avg_final, "max": max})
        questions[ques.questionId - 1]["min"] = min
        questions[ques.questionId - 1]["avg"] = avg_final
        questions[ques.questionId - 1]["max"] = max
    }
    //console.log(final)

    
	return {
        questions,
	};

}) satisfies PageServerLoad;