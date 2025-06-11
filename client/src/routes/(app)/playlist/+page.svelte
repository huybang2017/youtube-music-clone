<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let listId: string | null = null;

	$: listId = $page.url.searchParams.get('list');

	let playlist = {
		thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
		title: `Playlist ${listId}`,
		description: 'This is a demo playlist description.',
		songs: [
			{ id: '1', title: 'Song One', artist: 'Artist A', duration: '3:45' },
			{ id: '2', title: 'Song Two', artist: 'Artist B', duration: '4:12' },
			{ id: '3', title: 'Song Three', artist: 'Artist C', duration: '2:58' }
		]
	};
</script>

<div class="flex flex-col gap-6 p-6 md:flex-row">
	<div class="items center flex justify-center md:w-1/3">
		<div class="flex flex-col items-center justify-center">
			<img
				src={playlist.thumbnail}
				alt="Playlist cover"
				class="h-64 w-64 rounded-lg object-cover shadow-lg"
			/>
			<h2 class="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
				{playlist.title}
			</h2>

			<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
				{playlist.description}
			</p>

			<div class="flex items-center gap-2">
				<!-- Nút Previous -->
				<button
					aria-label="Previous"
					type="button"
					class="inline-flex items-center justify-center rounded-full bg-neutral-100 px-3 py-1 text-lg font-bold dark:bg-neutral-900 dark:text-white"
				>
					<svg
						viewBox="0 0 24 24"
						preserveAspectRatio="xMidYMid meet"
						focusable="false"
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 fill-current text-neutral-600 dark:text-white"
					>
						<path d="M19,6L9,12l10,6V6z M7,6H5v12h2V6z" />
					</svg>
				</button>

				<!-- Nút Play (tĩnh) -->
				<button
					type="button"
					class="rounded-full bg-neutral-100 px-3 py-1 text-lg font-bold dark:bg-neutral-900 dark:text-white"
				>
					<svg
						viewBox="0 0 24 24"
						preserveAspectRatio="xMidYMid meet"
						focusable="false"
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10 fill-current text-neutral-600 dark:text-white"
					>
						<path d="M6,4l12,8L6,20V4z" />
					</svg>
				</button>

				<!-- Nút Next -->
				<button
					aria-label="Next"
					type="button"
					class="inline-flex items-center justify-center rounded-full bg-neutral-100 px-3 py-1 text-lg font-bold dark:bg-neutral-900 dark:text-white"
				>
					<svg
						viewBox="0 0 24 24"
						preserveAspectRatio="xMidYMid meet"
						focusable="false"
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 fill-current text-neutral-600 dark:text-white"
					>
						<path d="M5,18l10-6L5,6V18z M19,6h-2v12h2V6z" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Danh sách bài hát -->
	<div class="md:flex-1">
		<ul class="divide-y divide-gray-200 dark:divide-gray-700">
			{#each playlist.songs as song, idx}
				<li
					class="flex items-center justify-between rounded-lg px-2 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
				>
					<div class="flex items-center space-x-4">
						<span class="text-gray-500 dark:text-gray-400">{idx + 1}.</span>
						<div class="text-sm">
							<p class="font-medium text-gray-900 dark:text-white">{song.title}</p>
							<p class="text-gray-600 dark:text-gray-400">{song.artist}</p>
						</div>
					</div>
					<span class="text-sm text-gray-500 dark:text-gray-400">{song.duration}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>
