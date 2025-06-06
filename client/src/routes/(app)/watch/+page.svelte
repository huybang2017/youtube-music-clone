<script lang="ts">
	import { Video } from 'flowbite-svelte';

	let activeTab = 'Up Next';

	const upNext = [
		{
			id: 1,
			title: 'Song One',
			artist: 'Artist A',
			thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg'
		},
		{
			id: 2,
			title: 'Song Two',
			artist: 'Artist B',
			thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg'
		},
		{
			id: 3,
			title: 'Song Three',
			artist: 'Artist C',
			thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg'
		}
	];
</script>

<!-- Wrapper -->
<div
	class="flex flex-col gap-6 bg-neutral-100 px-8 py-6 text-black md:flex-row dark:bg-black dark:text-white"
>
	<!-- Video Section -->
	<div class="flex w-full items-start justify-center md:w-2/3">
		<Video
			src="/videos/flowbite.mp4"
			class="w-full rounded-xl shadow-lg"
			autoplay
			controls
			trackSrc="flowbite.mp4"
		/>
	</div>

	<!-- Tabs + Content Section -->
	<div class="w-full md:w-1/3">
		<!-- Tabs -->
		<div class="mb-4 flex items-center justify-between">
			{#each ['Up Next', 'Lyrics', 'Related'] as tab}
				<button
					on:click={() => (activeTab = tab)}
					class={`flex-1 cursor-pointer pb-2 text-sm font-bold uppercase transition-colors ${
						activeTab === tab
							? 'border-b-2 border-black text-black dark:border-white dark:text-white'
							: 'text-neutral-500 dark:text-neutral-400'
					}`}
				>
					{tab}
				</button>
			{/each}
		</div>

		<!-- Tab Content -->
		<div class="text-sm text-black dark:text-white">
			{#if activeTab === 'Up Next'}
				<div class="space-y-4">
					{#each upNext as item}
						<div
							class="dark:hover:bg-neutrall-800 hover:bg-neutral-10 flex cursor-pointer items-center space-x-4 rounded p-2 transition"
						>
							<img src={item.thumbnail} alt="thumbnail" class="h-10 w-16 rounded object-cover" />
							<div>
								<p class="font-medium">{item.title}</p>
								<p class="text-xs text-neutral-500 dark:text-neutral-400">{item.artist}</p>
							</div>
						</div>
					{/each}
				</div>
			{:else if activeTab === 'Lyrics'}
				<div class="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
					<b class="text-black dark:text-white">Lyrics:</b><br />
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at lorem ut nisi tincidunt gravida.
					<br /><br />
					Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet, consectetur adipisicing
					elit.
				</div>
			{:else if activeTab === 'Related'}
				<div class="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
					<b class="text-black dark:text-white">Related Videos:</b><br />
					Other songs you may like will appear here.
				</div>
			{/if}
		</div>
	</div>
</div>
