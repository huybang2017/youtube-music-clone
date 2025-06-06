<script lang="ts">
	import '../app.css';
	/** @type {{children: import('svelte').Snippet}} */
	let { children } = $props();
</script>

<main id="content">
	{@render children()}
</main>
