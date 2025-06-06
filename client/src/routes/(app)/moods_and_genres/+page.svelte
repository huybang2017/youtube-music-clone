<script lang="ts">
	const genres = ['Blues', 'Jazz', 'Rock', 'Pop', 'Hip-Hop'];

	const borderColors = [
		'border-red-300',
		'border-red-400',
		'border-orange-300',
		'border-orange-400',
		'border-amber-300',
		'border-amber-400',
		'border-yellow-300',
		'border-yellow-400',
		'border-lime-300',
		'border-lime-400',
		'border-green-300',
		'border-green-400',
		'border-emerald-300',
		'border-emerald-400',
		'border-teal-300',
		'border-teal-400',
		'border-cyan-300',
		'border-cyan-400',
		'border-sky-300',
		'border-sky-400',
		'border-blue-300',
		'border-blue-400',
		'border-indigo-300',
		'border-indigo-400',
		'border-violet-300',
		'border-violet-400',
		'border-purple-300',
		'border-purple-400',
		'border-fuchsia-300',
		'border-fuchsia-400',
		'border-pink-300',
		'border-pink-400',
		'border-rose-300',
		'border-rose-400',
		'border-yellow-500',
		'border-lime-500',
		'border-sky-500',
		'border-emerald-500',
		'border-teal-500',
		'border-cyan-500'
	];

	// Shuffle function (Fisher-Yates)
	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	// Shuffle màu rồi gán lần lượt cho genres (đảm bảo không trùng màu)
	const shuffledColors = shuffleArray([...borderColors]);

	const genreButtons = genres.map((genre, index) => {
		return {
			name: genre,
			borderClass: shuffledColors[index % shuffledColors.length]
		};
	});
</script>

<div class="container mx-auto p-6">
	<h1 class="mb-12 text-4xl font-bold">Moods & Genres</h1>
	<h2 class="mb-6 text-2xl font-bold">Genres</h2>
	<div class="grid grid-cols-5 gap-4">
		{#each genreButtons as button}
			<button
				aria-label="button-genres"
				class={`border-l-6 duration-400 flex cursor-pointer items-center justify-start rounded-md bg-neutral-200 px-3 py-3 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-800 ${button.borderClass}`}
			>
				{button.name}
			</button>
		{/each}
	</div>
</div>
