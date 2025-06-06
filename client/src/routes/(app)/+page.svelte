<script lang="ts">
	import { Card, Indicator } from 'flowbite-svelte';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	console.log(data.songs);
</script>

<div>
	<div class="flex items-center justify-center gap-5">
		<Card class="relative max-w-[350px] border-0 bg-neutral-100 dark:bg-black">
			<div class="relative">
				<img
					src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
					alt="thumbail-video"
					class="cursor-pointer transition duration-300 ease-in-out hover:brightness-50"
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
				<span class="font-semibold">Hold On</span>
				<div class="flex items-center gap-1 text-black dark:text-white">
					<a href="#top" class="truncate text-xs text-black dark:text-white"> Artist Name </a>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-black dark:text-white">Album Name</span>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-black dark:text-white">View 120k</span>
				</div>
			</div>
		</Card>
		<Card class="max-w-[350px] cursor-pointer border-0 bg-neutral-100 dark:bg-black">
			<div class="relative">
				<img
					src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
					alt="thumbail-video"
					class="cursor-pointer transition duration-300 ease-in-out hover:brightness-50"
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
				<span class="font-semibold">Hold On</span>
				<div class="flex items-center gap-1 text-black dark:text-white">
					<a href="#top" class="truncate text-xs text-black dark:text-white"> Artist Name </a>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-black dark:text-white">Album Name</span>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-black dark:text-white">View 120k</span>
				</div>
			</div>
		</Card>
		<Card class="relative max-w-[350px] cursor-pointer border-0 bg-neutral-100 dark:bg-black">
			<div class="relative">
				<img
					src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
					alt="thumbail-video"
					class="cursor-pointer transition duration-300 ease-in-out hover:brightness-50"
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
				<span class="font-semibold">Hold On</span>
				<div class="flex items-center gap-1 text-black dark:text-white">
					<a href="#top" class="truncate text-xs text-black dark:text-white"> Artist Name </a>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-black dark:text-white">Album Name</span>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-black dark:text-white">View 120k</span>
				</div>
			</div>
		</Card>
		<Card class="relative max-w-[350px] cursor-pointer border-0 bg-neutral-100 dark:bg-black">
			<div class="relative">
				<img
					src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
					alt="thumbail-video"
					class="cursor-pointer transition duration-300 ease-in-out hover:brightness-50"
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
				<span class="font-semibold">Hold On</span>
				<div class="flex items-center gap-1 text-black dark:text-white">
					<a href="#top" class="truncate text-xs text-black dark:text-white"> Artist Name </a>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-black dark:text-white">Album Name</span>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-black dark:text-white">View 120k</span>
				</div>
			</div>
		</Card>
	</div>
</div>
