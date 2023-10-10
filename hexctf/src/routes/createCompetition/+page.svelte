<script lang="ts">
    import { onMount } from "svelte";

    let showForm = false;
    let selectedCategories: string[];
    let categories: any[];
    let newCategory: string;
    let catName: string;
    let numQuestions: number;
    let start: Date;
    let end: Date;

    onMount(async () => {
    try {
      const res = await fetch('../api/getCategories');
      if (res.ok) {
        categories = await res.json();      
        console.log(categories);
      } else {
        console.error("Failed to get categories", res.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  })

    const displayForm = () => {
        showForm = true;
    }

    const createNewCategory = (cat: string) => {
        categories.push(cat);
        // Trigger a reactivity update by assigning a new array
        categories = [...categories];
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
        {#each categories as category (category.CategoryId)}
            <label>
                <input type="checkbox" name="cat-options" bind:group={selectedCategories} value={category}/>
                {category.CategoryName}
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
