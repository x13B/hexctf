import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// For hashing passwords
const salt = 10;

export async function POST(request: any){

    const { email, password, username } = JSON.parse(request.body);

    bcrypt.hash(password, salt, (err:any) => {
        if (err) {
            console.error("Error hashing password", err);
        }
    });

    try {
        const user = await prisma.user.create({
            data: {
            username,
            password,
            email,
            },
        });

        return {
            status: 200,
            body: JSON.stringify({ message: "Data inserted successfully"}),
        };
    } catch (error: any) {
        console.error('Error registering user:', error);
        return {
          status: 500,
          body: JSON.stringify({ error: 'User registration failed', details: error.message }),
        };
      }
      
}
