<script lang="ts">
    let username: String;
    let password: String;
    let email: String;
    
    // This is a test arrow function to print input out to the console. 
    // It grabs the correct user input. 
    // TODO: Make a create user function that inserts to database 
    const submitForm = () => {
        console.log(username, password, email);
    }
</script>

<!-- Generic form to submit user data -->
<form on:submit|preventDefault={submitForm} >
    Email:
    <input type="text" placeholder="Enter a username" bind:value={username}><br>
    Password:
    <input type="password" placeholder="Enter a password" bind:value={password}><br>
    Email:
    <input type="text" placeholder="Enter an email" bind:value={email}><br>
    <button>Create Account</button>
</form>