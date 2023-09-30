import prisma from '$lib';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcrypt';

// For hashing passwords
const salt = 10;

export async function POST(request: any){
    console.log("In server function", request.body)

    let data;
    try {
        data = JSON.parse(request.body);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return {
            status: 500,
            body: {
                success: false,
                message: "Error parsing JSON"
            }
        }
    }

    console.log("From server", data);

    try {
        const result = await prisma.user.create({
            data: {
                username: data.username,
                password: data.password,
            }
        })
    } catch (error) {
        console.error("Error creating user:", error);
        return {
            status: 500,
            body: {
                success: false,
                message: "Error creating user"
            }
        }
    }

    return {
        body: {
            success: true
        }
    }
}
