import prisma from "$lib/prisma";
import { fail, redirect, error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';


async function findNextQuestion(locals: App.Locals, slug: number, difficulty: string, diffIncrease: boolean): Promise<any> {
    try{
    // increase or decrease the difficulty depending on the diffIncrease bool    
    let new_difficulty = "";
    if (diffIncrease) {
        if (difficulty === "Easy") {new_difficulty = "Medium"}
        else if (difficulty === "Medium") {new_difficulty = "Hard"}
        else {new_difficulty = difficulty}
        console.log("Finding a harder question!");
        console.log("" + difficulty + " > " + new_difficulty);
    } else {
        if (difficulty === "Medium") {new_difficulty = "Easy"}
        else if (difficulty === "Hard") {new_difficulty = "Medium"}
        else {new_difficulty = difficulty}
        console.log("Finding an easier question!");
        console.log("" + difficulty + " > " + new_difficulty);
    }
    
    // validate the session, question, and user's team
    const session = await locals.auth.validate();
    if (!session)  throw redirect(302, "/login");
    const question = await prisma.questions.findUnique({
        where: { questionId: slug },
    });
    if (question === null) throw error(404, "Question not found");
    const teamOfUser = await prisma.teamMembers.findUnique({
        where: { userId: session.user.userId }
    });
    if (teamOfUser === null) throw error(404, "User is not in a team");
    // find the team's answered questions
    const answeredQuestions = await prisma.answerQuestions.findMany({
        where: {
            teamId: teamOfUser.teamId,
        },
        select: {
            questionId: true,
        }
    });
    let ansQuesArr: number[] = [];
    for (let obj of answeredQuestions) {
        ansQuesArr.push(obj.questionId);
    }
    //console.log(ansQuesArr);
    // find a new question that is in the new difficulty and same category, but has
    // not been answered already
    const new_question = await prisma.questions.findFirst({
        where: {
            categoryId: question.categoryId,
            difficulty: new_difficulty,
            questionId: { notIn: ansQuesArr },
        },
    })
    // if this new question exists, assign it to the team
    if (new_question !== null) {
        console.log("Question found!");
        console.log("Difficulty:" + new_difficulty + "\n");
        return new_question;
        
    } else {
        // If this question does not exist, assign a question of a different difficulty
        console.log("Looking for a new difficulty!");
        if (diffIncrease && new_difficulty === "Hard") {
            console.log("No more questions!");
            console.log("" + difficulty + " > " + new_difficulty);
            return null;
        }
        else if (diffIncrease && new_difficulty !== "Hard") {
            console.log("Finding a harder question!");
            console.log("" + difficulty + " > " + new_difficulty);
            return findNextQuestion(locals, slug, new_difficulty, true);
        }
        else if (!diffIncrease && new_difficulty === "Easy") {
            console.log("Finding a harder question!");
            console.log("" + difficulty + " > " + new_difficulty);
            return findNextQuestion(locals, slug, new_difficulty, true);
        }
        else {
            console.log("Finding an easier question!");
            console.log("" + difficulty + " > " + new_difficulty);
            return findNextQuestion(locals, slug, new_difficulty, false);
        }
    }
} catch(e) {
    return null;
}
}


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
    const qAnswered = await prisma.answerQuestions.findUnique({
        where: {
            questionId_teamId: {
                questionId: Number(slug),
                teamId: teamOfUser.teamId,
            },
        },
    });
    // Prevents directory hopping to questions not assigned to team
    if (assignedQuestions === null && qAnswered === null) throw error(404, "You are not assigned to this question");
    const check = {resp: false}
    if (qAnswered !== null) {check.resp = true}
    return { question, check }
}) satisfies PageServerLoad;


export const actions = {
    answerQues: async ({locals, request, params: { slug }}) => {
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
                let nextQuestion = await findNextQuestion(locals, Number(slug), question.difficulty, true);
                if (nextQuestion === null || nextQuestion === undefined){
                    console.log("null/undefined error\nNo questions found");
                }
                else {
                    await prisma.assignedQuestions.create({
                        data: {
                            questionId: nextQuestion.questionId,
                            teamId: teamOfUser.teamId,
                        }
                    })
                }
                return {response: true}
            }
            else {
                //console.log("Answer is incorrect.")
                return {response: false}
            }
        },
    forfeit: async ({locals, params: { slug }}) => {
        //console.log("forfeit engaged");
        const session = await locals.auth.validate();
        if (!session)  throw redirect(302, "/login");
        const question = await prisma.questions.findUnique({
            where: { questionId: Number(slug) },
        });
        if (question === null) throw error(404, "Question not found");
        const teamOfUser = await prisma.teamMembers.findUnique({
            where: { userId: session.user.userId }
        });
        if (!teamOfUser) return fail(400, {
            message: "User is not apart of a team"
        });
        const removeAssigned = await prisma.assignedQuestions.delete({
            where: {
                teamId_questionId: {
                    teamId: teamOfUser.teamId,
                    questionId: Number(slug),
                }
            }
        });
        let nextQuestion = await findNextQuestion(locals, Number(slug), question.difficulty, false);
        if (nextQuestion === null || nextQuestion === undefined){
            console.log("null/undefined error\nNo questions found");
        }
        else {
            await prisma.assignedQuestions.create({
                data: {
                    questionId: nextQuestion.questionId,
                    teamId: teamOfUser.teamId,
                }
            })
        }
        throw redirect(302, "./");
    }
} satisfies Actions;