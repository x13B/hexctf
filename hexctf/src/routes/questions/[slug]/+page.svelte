<script lang="ts">
    import type { PageData } from "./$types";
  
    export let data: PageData;
    const { question } = data;
  </script>

<div class="page">
    <main>
      <h2>{question?.Description}</h2>
      <p>{question?.points} Points</p>
      <label for="answer">Answer</label>
      <input name="answer" id="answer" /><br />
        <a href="/questions">Return</a>
    </main>
  </div>