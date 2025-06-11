<script lang="ts">
	import type { PageProps } from './$types';
	import CardSong from '$lib/component/CardSong.svelte';
	import FilterGerne from '$lib/component/FilterGerne.svelte';
	import Pagination from '$lib/component/Pagination.svelte';
	import CardAlbum from '$lib/component/CardAlbum.svelte';
	let { data }: PageProps = $props();
	console.log(data);
</script>

<div>
	<div class="flex items-center justify-between gap-3 pb-[70px]">
		<div class="flex items-center justify-start gap-3">
			{#each data.genres.slice(0, 8) as genre}
				<FilterGerne {genre} />
			{/each}
		</div>
		<div>
			<a
				href="/moods_and_genres"
				class="transform cursor-pointer rounded-lg border-0 bg-neutral-200 p-2 text-center text-sm text-black transition-transform hover:bg-neutral-300 dark:bg-neutral-800 dark:text-white hover:dark:bg-neutral-600"
			>
				<span class="whitespace-nowrap">Xem tất cả</span>
			</a>
		</div>
	</div>
	<div class="pb-[70px]">
		<div class="flex items-center justify-between">
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#" class="text-4xl font-bold dark:hover:border-b-neutral-50">Nghe lại</a>
			<div>
				<Pagination />
			</div>
		</div>
		<div class="flex items-center justify-start gap-5 pt-10">
			{#each data.songs.slice(0, 6) as song}
				<CardSong
					thumbnail={song.cover}
					title={song.title}
					artist={song?.artist?.name || 'Unknown Artist'}
					album={song?.album || 'Songs'}
					views={song?.views || '0'}
				/>
			{/each}
		</div>
	</div>
	<div class="pb-[70px]">
		<a href="#" class="text-4xl font-bold dark:hover:border-b-neutral-50"
			>Danh sách phát mọi người tạo</a
		>
		<div class="flex items-center justify-start gap-5 pt-10">
			<CardSong
				thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
				title="Hold On"
				artist="Artist Name"
				album="Album Name"
				views="120k"
			/>
		</div>
	</div>
	<div class="pb-[70px]">
		<a href="#" class="text-4xl font-bold dark:hover:border-b-neutral-50"
			>Danh sách phát nổi bật dành cho bạn</a
		>
		<div class="flex items-center justify-start gap-5 pt-10">
			<CardSong
				thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
				title="Hold On"
				artist="Artist Name"
				album="Album Name"
				views="120k"
			/>
		</div>
	</div>
	<div class="pb-[70px]">
		<a href="#" class="text-4xl font-bold dark:hover:border-b-neutral-50">Đĩa nhạc cho bạn</a>
		<div class="flex items-center justify-start gap-5 pt-10">
			{#each data.albums.slice(0, 6) as album}
				<CardAlbum
					albumCover={album.cover}
					albumTitle={album.title}
					artistName={album?.artist?.name || 'Unknown Artist'}
				/>
			{/each}
		</div>
	</div>
	<div class="pb-[70px]">
		<a href="#" class="text-4xl font-bold dark:hover:border-b-neutral-50">Nghệ Sĩ</a>
		<div class="flex items-center justify-start gap-5 pt-10">
			<CardSong
				thumbnail="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
				title="Hold On"
				artist="Artist Name"
				album="Album Name"
				views="120k"
			/>
		</div>
	</div>
</div>
