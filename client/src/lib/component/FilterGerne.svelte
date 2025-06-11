<script lang="ts">
	export let genre: {
		id: string;
		name: string;
	};
</script>

<div class="flex items-center gap-3">
	<button
		class="transform cursor-pointer rounded-lg border-0 bg-neutral-200 p-2 text-center
			text-sm text-black
			transition-transform
			hover:bg-neutral-300 dark:bg-neutral-800
			dark:text-white
			hover:dark:bg-neutral-600"
	>
		<h3 class="whitespace-nowrap">{genre.name}</h3>
	</button>
</div>
