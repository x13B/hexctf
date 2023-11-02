<script lang="ts">
    import type { PageData } from "./$types";
    export let data: PageData;
</script>

<h1>Admin Dashboard</h1>
<h2>Create a Question</h2>

<label for="question-title">Title:</label><input type="text"><br>

<label for="question-ans">Answer:</label><input type="text"><br>
<label for="question-points">Points:</label><input type="number">
<label for="question-title">Category:</label><select name="category" id="category">
    {#each data.categories as category }
        <option value="{category.categoryName}">{category.categoryName}</option>
    {/each}
    </select>
    <br>
<label for="question-desc">Description:</label><br><textarea id="question-desc" name="question-desc" rows="4" cols="50">
    Enter question description here...
</textarea>