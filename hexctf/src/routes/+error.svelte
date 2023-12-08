<script>
	import { page } from '$app/stores';
</script>
<main>
    <div class="container">
        <h1>Error {$page.status}</h1>
        <h2>{$page.error?.message}</h2>
    </div>
</main>