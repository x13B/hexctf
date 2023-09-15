<script lang="ts">
    import { PrismaClient } from '@prisma/client';
    import CreateUserForm from './createUserForm.svelte';
    
    const db = new PrismaClient();

    const users: any = [];

    /*
     * This is a test function to get data from the database.
     * It will print the only line of data from  the database as a dictionary.
     * It prints an error message in the browser but not the terminal.
     */
    async function getUsers() {
        try {
            const user = await db.user.findMany();
            console.log(user);
            return user;
        } catch (error) {
            console.error(error);
            throw error; // Rethrow the error if you want to handle it further up the call stack
        }
    }

    /* Call the function 
     * Prints success because function returns true.
     * If some error occurred then it would return false.
     */
    (async () => {
        try {
            const user = await getUsers();
            // console.log("success");
            users.push(user);
        } catch (error) {
            console.log("error:", error);
        }
    })();

</script>

<h1>This is the create an account page.</h1>

<!-- This will display the form used to create an account -->
<div>
    <CreateUserForm />
</div>