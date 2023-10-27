import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params: { slug }}) => {
    const teamInfo = await prisma.teams.findUnique({
        where: { teamId: Number(slug) },
    });
    const teamMembers = await prisma.teamMembers.findMany({
        where: { teamId: Number(slug) },
    });
    let membersList = []
    for (let member of teamMembers) {
        const user = await prisma.user.findUnique({
            where: {id: member.userId}
        })
        membersList.push(user);
    }
    //console.log(membersList)
    const teamAnswered = await prisma.answerQuestions.findMany({
        where: { teamId: Number(slug) }
    });
    let answersList = []
    for (let answer of teamAnswered) {
        const ans = await prisma.questions.findUnique({
            where: {questionId: answer.questionId}
        })
        answersList.push(ans);
    }
    //console.log(answersList)
    return { teamInfo, membersList, answersList }
}) satisfies PageServerLoad;