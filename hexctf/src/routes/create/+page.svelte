<script lang="ts">
    import { PrismaClient } from '@prisma/client';
    
    const db = new PrismaClient();

    /*
     * This is a test function to get data from the database.
     * It will print the only line of data from  the database as a dictionary.
     * It prints an error message in the browser but not the terminal.
     */
    async function getUsers() {
        const user = await db.user.findMany();
        console.log(user);
        return true;
    }

    /* Call the function 
     * Prints success because function returns true.
     * If some error occurred then it would return false.
     */
    getUsers()
    .then(async () =>{
        console.log("success");})
    .catch(async () => {
        console.log("error");});

</script>

<h1>This is the create an account page.</h1>
