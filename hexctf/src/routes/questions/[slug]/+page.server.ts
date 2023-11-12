import prisma from "$lib/prisma";
import { fail, redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';


export const load = (async ({ locals, params: { slug } }) => {
    const session = await locals.auth.validate();
    if (!session)  throw redirect(302, "/login");
    const question = await prisma.questions.findUnique({
        where: { questionId: Number(slug) },
    });
    if (question === null) throw error(404, "Question not found");
    const teamOfUser = await prisma.teamMembers.findUnique({
        where: { userId: session.user.userId }
    });
    if (teamOfUser === null) throw error(404, "User is not assigned to a team");
    const assignedQuestions = await prisma.assignedQuestions.findUnique({
        where: { 
            teamId_questionId: {
                teamId: teamOfUser.teamId,
                questionId: Number(slug),
            }
         },
    });
    // Prevents directory hopping to questions not assigned to team
    if (assignedQuestions === null) throw error(404, "You are not assigned to this question");
    const qAnswered = await prisma.answerQuestions.findFirst({
        where: {
            questionId: Number(slug),
            teamId: teamOfUser?.teamId,
        },
    });
    const check = {resp: false}
    if (qAnswered !== null) {check.resp = true}
    return { question, check }
}) satisfies PageServerLoad;


export const actions = {
    default: async ({locals, request, params: { slug }}) => {
        const session = await locals.auth.validate();
        if (!session)  throw redirect(302, "/login");
        //const user = await auth.getUser(session.user.userId);
        const teamOfUser = await prisma.teamMembers.findUnique({
            where: { userId: session.user.userId }
        });
        //console.log(teamOfUser);
        const data = await request.formData();
        let propose = data.get("answer")

        const question = await prisma.questions.findUnique({
            where: { questionId: Number(slug) },
        });
        if (question === null) throw error(404, "Question not found");
        // This must also check that the logged in user's team has not answered the question already
        if (!teamOfUser) return fail(400, {
            message: "User is not apart of a team"
        });

        
            if (propose === question.answer) {
                //console.log("Answer is correct!")
                // Here is what should happen
                // Create an AnswerQuestion record with the question's id and team's id
                //      The team's id is taken from the user's model, the person logged in
                // Update the team's points with the point value of the question
                const ans = await prisma.answerQuestions.create({
                    data: {
                        questionId: Number(slug),
                        teamId: teamOfUser.teamId,
                    },
                })
                const updatePoints = await prisma.teams.update({
                    where: {
                        teamId: teamOfUser.teamId,
                    },
                    data: {
                        points: {
                            increment: question.points,
                        },
                    },
                })
                const removeAssigned = await prisma.assignedQuestions.delete({
                    where: {
                        teamId_questionId: {
                            teamId: teamOfUser.teamId,
                            questionId: Number(slug),
                        }
                    }
                })
                return {response: true}
            }
            else {
                //console.log("Answer is incorrect.")
                return {response: false}
        }
    }
}satisfies Actions;