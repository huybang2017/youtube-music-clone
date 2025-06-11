<script lang="ts">
	export let thumbnail: string;
	export let title: string;
	export let artist: string;
	export let album: string;
	export let views: string;
</script>

<div class="relative max-w-[350px] overflow-hidden border-0 bg-neutral-100 dark:bg-black">
	<div class="relative">
		<img
			src={thumbnail}
			alt="thumbnail-video"
			class="w-full cursor-pointer transition duration-300 ease-in-out hover:brightness-50"
		/>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="currentColor"
			class="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white"
			aria-hidden="true"
		>
			<path d="M6,4l12,8L6,20V4z" />
		</svg>
	</div>

	<div class="p-2">
		<span class="block max-w-[200px] truncate font-semibold text-black dark:text-white"
			>{title}</span
		>
		<div class="mt-1 flex flex-wrap items-center gap-1 text-xs text-black dark:text-white">
			<a href="#top" class="truncate">{artist}</a>
			<span class="h-1 w-1 rounded-full bg-black dark:bg-neutral-100"></span>
			<span>{album}</span>
			<span class="h-1 w-1 rounded-full bg-black dark:bg-neutral-100"></span>
			<span>View {views}</span>
		</div>
	</div>
</div>
