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
    let data_loaded: boolean = false;

    onMount(async () => {
      try {
        const res = await fetch('../api/getCategories');
        if (res.ok) {
          categories = await res.json();      
          console.log(categories);
          data_loaded = true;

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

    // Let's you add new categories without overwriting the old ones.
    const createNewCategory = () => {
      const newCategoryObj = {
        CategoryId: categories.length + 1,
        CategoryName: newCategory,
      };

      categories.push(newCategoryObj);
      // Trigger a reactivity update by assigning a new array
      categories = [...categories];

      // Clear the input field after adding the category
      newCategory = '';

      console.log(categories);
    };

    async function submitOptions() {
        console.log(catName, selectedCategories, numQuestions, start, end);

        // const res = await fetch('../api/addCategory', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type' : 'application/json'
        //   },
        //   body: JSON.stringify({ selectedCategories.length, catName })
        // });

        // if (res.ok) {
        //   console.log("Succesfully added category");
        // } else {
        //   console.error("Someting happened: ", res);
        // }
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
                <input type="checkbox" name="cat-options" bind:group={selectedCategories} value={category.CategoryId}/>
                {category.CategoryName}
            </label><br>
        {/each}
        
        <label for="add">Create New Category: </label>
        <input type="text" name="new-cat" bind:value={newCategory}/>
        <button type="button" on:click={createNewCategory}>Create New</button><br>

        <label for="num-questions">Number of Questions per Category:</label>
        <input type="number" bind:value={numQuestions}/><br>
        
        <label for="length">Start Date:</label>
        <input type="date" bind:value={start}/><br>
        
        <label for="length">End Date:</label>
        <input type="date" bind:value={end}/><br>
        
        <button type="submit" on:click={submitOptions}>Submit</button>
    </form>
{/if}
