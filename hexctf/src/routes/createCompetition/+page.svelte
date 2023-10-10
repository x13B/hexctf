<script lang="ts">
    let showForm = false;
    let selectedCategories: string[];
    let cat_test: string[] = ["Category 1", "Category 2", "Category 3", "Category 4"];
    let newCategory: string;
    let catName: string;
    let numQuestions: number;
    let start: Date;
    let end: Date;

    const displayForm = () => {
        showForm = true;
    }

    const createNewCategory = (cat: string) => {
        cat_test.push(cat);
        // Trigger a reactivity update by assigning a new array
        cat_test = [...cat_test];
    }

    const viewOptions = () => {
        console.log(catName, selectedCategories, numQuestions, start, end);
    }
</script>

<h1>This is the create competition page</h1>

<button on:click={displayForm}>New Competiton</button>

{#if showForm == true}
    <form action="#">
        <label for="name">Name of Competition</label>
        <input type="text" name="comp-name" placeholder="Name of competition" bind:value={catName}/><br>
        
        <label for="category">Categories:</label><br>
        {#each cat_test as category (category)}
            <label>
                <input type="checkbox" name="cat-options" bind:group={selectedCategories} value={category}/>
                {category}
            </label><br>
        {/each}
        
        <label for="add">Create New Category: </label>
        <input type="text" name="new-cat" bind:value={newCategory}/>
        <button type="button" on:click={() => createNewCategory(newCategory)}>Create New</button><br>
        
        <label for="num-questions">Number of questions:</label>
        <input type="number" bind:value={numQuestions}/><br>
        
        <label for="length">Start Date:</label>
        <input type="date" bind:value={start}/><br>
        
        <label for="length">End Date:</label>
        <input type="date" bind:value={end}/><br>
        
        <button type="submit" on:click={viewOptions}>Submit</button>
    </form>
{/if}
