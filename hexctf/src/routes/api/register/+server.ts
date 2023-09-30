import prisma from '$lib';
import * as bcrypt from 'bcrypt';

// For hashing passwords
const salt = 10;

export async function POST(request: any){
    let data;

      try {
        console.log("before parsing body");
        console.log(request['request']);
        data = JSON.parse(request.body);
        console.log("data", data);

        console.log("before creating user");
        const result = await prisma.user.create({
            data: {
                username: data.username,
                password: data.password,
            }
        });
        
        console.log("Before returning");
        return {
            status: 200,
            body: {
              success: true,
              message: "Registration successful",
            },
          };

      } catch (error) {
        console.log("Entered catch block");
        console.error("Error: ", error);

        return {
            status: 400,
            body: {
                success: false,
                message: "An error occurred trying to create a new user",
            },
        };

      }
}