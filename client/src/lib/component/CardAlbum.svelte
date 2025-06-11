<script>
	export let albumCover = '';
	export let albumTitle = '';
	export let artistName = '';
</script>

<a
	href="/playlist?list=12345"
	class="relative max-w-[300px] overflow-hidden rounded-xl border-0 bg-neutral-100 dark:bg-black"
>
	<div class="group relative">
		<img
			class="h-56 w-56 cursor-pointer rounded-xl object-cover transition duration-300 ease-in-out"
			src={albumCover}
			alt={albumTitle}
		/>

		<!-- Overlay chỉ hiện khi hover -->
		<div
			class="pointer-events-none absolute bottom-0 left-0 right-0 top-0 hidden rounded-xl bg-gradient-to-b from-black/60 to-transparent group-hover:block"
		></div>

		<!-- Play Icon (bottom-right) -->
		<button
			aria-label="Play Album"
			class="absolute bottom-2 right-2 hidden cursor-pointer items-center justify-center rounded-full bg-black/50 p-2 hover:scale-110 hover:bg-black group-hover:flex"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="h-6 w-6 text-white"
				aria-hidden="true"
			>
				<path d="M6,4l12,8L6,20V4z" />
			</svg>
		</button>
	</div>

	<div class="p-2">
		<span class="block max-w-[200px] truncate font-semibold text-black dark:text-white">
			{albumTitle}
		</span>
		<div class="mt-1 flex flex-wrap items-center gap-1 text-xs text-black dark:text-white">
			<span>Album</span>
			<span class="h-1 w-1 rounded-full bg-black dark:bg-neutral-100"></span>
			<span>{artistName}</span>
		</div>
	</div>
</a>
