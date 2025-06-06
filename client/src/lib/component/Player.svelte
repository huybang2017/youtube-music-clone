<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Dropdown, DropdownItem, Indicator, Tooltip } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	let isPlaying = false;
	let isOnWatchPage = false;
	let previousPath: string = '/';
	let initialized = false;

	onMount(() => {
		const unsubscribe = page.subscribe(($page) => {
			if (!initialized) {
				previousPath = $page.url.pathname;
				initialized = true;
			}
			isOnWatchPage = $page.url.pathname === '/watch';
		});

		return () => {
			unsubscribe();
		};
	});

	function toggleRoute() {
		if (isOnWatchPage) {
			if (!previousPath || previousPath === '/watch') {
				goto('/');
			} else {
				goto(previousPath);
			}
		} else {
			previousPath = window.location.pathname;
			goto('/watch');
		}
	}
</script>

<div
	class="fixed bottom-0 left-0 z-50 flex h-20 w-full items-center border-t border-neutral-300 bg-neutral-100 px-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
>
	<div class="flex w-full items-center justify-between gap-4">
		<!-- Controls -->
		<div class="flex items-center gap-2">
			<button
				aria-label="Previous"
				type="button"
				class="inline-flex items-center justify-center rounded-full bg-neutral-100 px-3 py-1 text-lg font-bold dark:bg-neutral-900 dark:text-white"
			>
				<svg
					viewBox="0 0 24 24"
					preserveAspectRatio="xMidYMid meet"
					focusable="false"
					class="h-6 w-6 fill-current text-neutral-600 dark:text-white"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M19,6L9,12l10,6V6z M7,6H5v12h2V6z" />
				</svg>
			</button>

			<button
				type="button"
				class="rounded-full bg-neutral-100 px-3 py-1 text-lg font-bold dark:bg-neutral-900 dark:text-white"
				on:click={() => (isPlaying = !isPlaying)}
			>
				{#if isPlaying}
					<svg
						viewBox="0 0 24 24"
						preserveAspectRatio="xMidYMid meet"
						focusable="false"
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10 fill-current text-neutral-600 dark:text-white"
					>
						<g height="24" width="24" viewBox="0 0 24 24">
							<path d="M9,19H7V5H9ZM17,5H15V19h2Z" />
						</g>
					</svg>
				{:else}
					<svg
						viewBox="0 0 24 24"
						preserveAspectRatio="xMidYMid meet"
						focusable="false"
						xmlns="http://www.w3.org/2000/svg"
						class="h-10 w-10 fill-current text-neutral-600 dark:text-white"
					>
						<path d="M6,4l12,8L6,20V4z" />
					</svg>
				{/if}
			</button>

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

		<!-- Song info -->
		<div class="flex min-w-0 items-center justify-center gap-4">
			<div class="h-12 w-12 overflow-hidden rounded bg-neutral-300 dark:bg-neutral-700"></div>
			<div class="flex min-w-0 flex-col">
				<span class="truncate text-sm font-semibold dark:text-white">Song Title</span>
				<div class="flex items-center gap-1 text-neutral-500 dark:text-neutral-400">
					<a href="#top" class="truncate text-xs text-neutral-500 dark:text-neutral-400">
						Artist Name
					</a>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-neutral-500 dark:text-neutral-400">Album Name</span>
					<Indicator class="w-1! h-1! bg-black! dark:bg-neutral-100!" />
					<span class="ml-1 text-xs text-neutral-500 dark:text-neutral-400">View 120k</span>
				</div>
			</div>
			<div class="flex items-center justify-center gap-2">
				<button
					type="button"
					aria-label="Like"
					class="cursor-pointer rounded-full bg-neutral-200 p-2 dark:bg-neutral-800"
				>
					<svg
						class="h-6 w-6 text-neutral-500 dark:text-neutral-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475"
						/>
					</svg>
				</button>
				<button
					type="button"
					aria-label="Dislike"
					class="cursor-pointer rounded-full bg-neutral-200 p-2 dark:bg-neutral-800"
					><svg
						class="h-6 w-6 text-neutral-500 dark:text-neutral-400"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17 13c-.889.086-1.416.543-2.156 1.057a22.322 22.322 0 0 0-3.958 5.084 1.6 1.6 0 0 1-.582.628 1.549 1.549 0 0 1-1.466.087 1.587 1.587 0 0 1-.537-.406 1.666 1.666 0 0 1-.384-1.279l1.389-4.114M17 13h3V6.5A1.5 1.5 0 0 0 18.5 5v0A1.5 1.5 0 0 0 17 6.5V13Zm-6.5 1H5.585c-.286 0-.372-.014-.626-.15a1.797 1.797 0 0 1-.637-.572 1.873 1.873 0 0 1-.215-1.673l2.098-6.4C6.462 4.48 6.632 4 7.88 4c2.302 0 4.79.943 6.67 1.475"
						/>
					</svg>
				</button>
				<button
					id="explore-button"
					type="button"
					aria-label="explore"
					class="cursor-pointer rounded-full bg-neutral-200 p-2 dark:bg-neutral-800"
				>
					<svg
						class="h-6 w-6 text-gray-800 dark:text-white"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-width="2"
							d="M12 6h.01M12 12h.01M12 18h.01"
						/>
					</svg>
				</button>
				<Dropdown
					class="dark:border-1 top-[384px]! p-3 dark:border-neutral-800 dark:bg-neutral-900"
					placement="top"
					transition={blur}
					transitionParams={{ duration: 400 }}
					simple
				>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M10.5,14.41V9.6l4.17,2.4L10.5,14.41z M8.48,8.45L7.77,7.75C6.68,8.83,6,10.34,6,12s0.68,3.17,1.77,4.25l0.71-0.71 
       C7.57,14.64,7,13.39,7,12S7.57,9.36,8.48,8.45z 
       M16.23,7.75l-0.71,0.71C16.43,9.36,17,10.61,17,12s-0.57,2.64-1.48,3.55l0.71,0.71 
       C17.32,15.17,18,13.66,18,12S17.32,8.83,16.23,7.75z 
       M5.65,5.63L4.95,4.92C3.13,6.73,2,9.24,2,12s1.13,5.27,2.95,7.08l0.71-0.71 
       C4.02,16.74,3,14.49,3,12S4.02,7.26,5.65,5.63z 
       M19.05,4.92l-0.71,0.71C19.98,7.26,21,9.51,21,12s-1.02,4.74-2.65,6.37l0.71,0.71 
       C20.87,17.27,22,14.76,22,12S20.87,6.73,19.05,4.92z"
							/>
						</svg>
						<span>Start audio</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M22,7H2v1h20V7z M13,12H2v-1h11V12z M13,16H2v-1h11V16z M15,19v-8l7,4L15,19z"
							/>
						</svg>
						<span>Play next</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M14,8H2V7h12V8z M10,11H2v1h8V11z M10,15H2v1h8V15z M22,7h-5v7.51C16.58,14.19,16.07,14,15.5,14c-1.38,0-2.5,1.12-2.5,2.5 
							 c0,1.38,1.12,2.5,2.5,2.5c1.35,0,2.44-1.07,2.49-2.4L18,16.58V10h4V7z"
							/>
						</svg>
						<span>Add to queue</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43
							 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z
							 M19.98,13.17l-1.34,6C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5
							 c0.26,0,0.5,0.11,0.63,0.3c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23
							 c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"
							/>
						</svg>
						<span>Add to liked songs</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M22,13h-4v4h-2v-4h-4v-2h4V7h2v4h4V13z M14,7H2v1h12V7z M2,12h8v-1H2V12z M2,16h8v-1H2V16z"
							/>
						</svg>
						<span>Save to playlist</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M11,17H9V8h2V17z M15,8h-2v9h2V8z M19,4v1h-1v16H6V5H5V4h4V3h6v1H19z M17,5H7v15h10V5z"
							/>
						</svg>
						<span>Remove from queue</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M22,10h-4v2v3.51C17.58,15.19,17.07,15,16.5,15c-1.38,0-2.5,1.12-2.5,2.5
       c0,1.38,1.12,2.5,2.5,2.5c1.36,0,2.46-1.08,2.5-2.43V12h3V10z
       M3.06,19c0.38-3.11,2.61-6.1,7.94-6.1c0.62,0,1.19,0.05,1.73,0.13l0.84-0.84
       c-0.58-0.13-1.19-0.23-1.85-0.26C13.58,11.59,15,9.96,15,8c0-2.21-1.79-4-4-4
       C8.79,4,7,5.79,7,8c0,1.96,1.42,3.59,3.28,3.93C4.77,12.21,2,15.76,2,20h10.02
       L12,19H3.06z M8,8c0-1.65,1.35-3,3-3s3,1.35,3,3s-1.35,3-3,3S8,9.65,8,8z"
							/>
						</svg>
						<span>Go to artist</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09
       c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63
       M14,3v6C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z"
							/>
						</svg>
						<span>Share</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M13.18,4l0.24,1.2L13.58,6h0.82H19v7h-5.18l-0.24-1.2L13.42,11H12.6H6V4H13.18 
       M14,3H5v18h1v-9h6.6l0.4,2h7V5h-5.6L14,3L14,3z"
							/>
						</svg>
						<span>Report</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M16,11V3h1V2H7v1h1v8l-2,2v2h5v6l1,1l1-1v-6h5v-2L16,11z M17,14h-4h-1h-1H7v-0.59l1.71-1.71L9,11.41V11V3h6v8v0.41 l0.29,0.29L17,13.41V14z"
							/>
						</svg>
						<span>Pin to Listen again</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M19.41,14l2.29,2.29l-1.41,1.41L18,15.41l-2.29,2.29l-1.41-1.41L16.59,14l-2.29-2.29l1.41-1.41L18,12.59l2.29-2.29
       l1.41,1.41L19.41,14z M22,8H2V7h20V8z M13,11H2v1h11V11z M13,15H2v1h11V15z"
							/>
						</svg>
						<span>Dismiss to queue</span>
					</DropdownItem>
					<DropdownItem class="flex items-center justify-start gap-6 dark:hover:bg-neutral-800">
						<svg
							class="h-6 w-6 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M9 17H7V10H9V17ZM13 7H11V17H13V7ZM17 14H15V17H17V14ZM20 4H4V20H20V4ZM21 3V21H3V3H21Z"
							/>
						</svg>
						<span>Stats for nerds</span>
					</DropdownItem>
				</Dropdown>
			</div>
		</div>

		<!-- Right actions -->
		<div class="flex items-center justify-center gap-2">
			<button
				type="button"
				aria-label="Mute"
				class="flex items-center justify-center rounded-full bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800 dark:text-white"
			>
				<svg
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 fill-current text-neutral-600 dark:text-white"
				>
					<path
						d="M17.5,12c0,2.14-1.5,3.92-3.5,4.38v-1.04c1.44-0.43,2.5-1.76,2.5-3.34c0-1.58-1.06-2.9-2.5-3.34V7.62 
                     C16,8.08,17.5,9.86,17.5,12z M12,4.07v15.86L6.16,15H3V9h3.16L12,4.07z 
                     M11,6.22L6.52,10H4v4h2.52L11,17.78V6.22z 
                     M21,12c0,4.08-3.05,7.44-7,7.93v-1.01c3.39-0.49,6-3.4,6-6.92s-2.61-6.43-6-6.92V4.07
                     C17.95,4.56,21,7.92,21,12z"
					/>
				</svg>
			</button>
			<Tooltip class="bg-black! border-black!">Mute</Tooltip>

			<button
				type="button"
				aria-label="Repeat off"
				class="flex items-center justify-center rounded-full bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800 dark:text-white"
			>
				<svg
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 fill-current text-neutral-600 dark:text-white"
				>
					<path
						d="M21,13h1v5L3.93,18.03l2.62,2.62l-0.71,0.71L1.99,17.5l3.85-3.85l0.71,0.71l-2.67,2.67L21,17V13z 
                     M3,7l17.12-0.03l-2.67,2.67l0.71,0.71l3.85-3.85l-3.85-3.85l-0.71,0.71l2.62,2.62L2,6v5h1V7z"
					/>
				</svg>
			</button>
			<Tooltip class="bg-black! border-black!">Repeat off</Tooltip>

			<button
				type="button"
				aria-label="Shuffle"
				class="flex items-center justify-center rounded-full bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800 dark:text-white"
			>
				<svg
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 fill-current text-neutral-600 dark:text-white"
				>
					<path
						d="M18.15,13.65l3.85,3.85l-3.85,3.85l-0.71-0.71L20.09,18H19c-2.84,0-5.53-1.23-7.39-3.38l0.76-0.65
                     C14.03,15.89,16.45,17,19,17h1.09l-2.65-2.65L18.15,13.65z 
                     M19,7h1.09l-2.65,2.65l0.71,0.71l3.85-3.85l-3.85-3.85l-0.71,0.71
                     L20.09,6H19c-3.58,0-6.86,1.95-8.57,5.09l-0.73,1.34
                     C8.16,15.25,5.21,17,2,17v1c3.58,0,6.86-1.95,8.57-5.09l0.73-1.34
                     C12.84,8.75,15.79,7,19,7z 
                     M8.59,9.98l0.75-0.66C7.49,7.21,4.81,6,2,6v1C4.52,7,6.92,8.09,8.59,9.98z"
					/>
				</svg>
			</button>
			<Tooltip class="bg-black! border-black!">Shuffle</Tooltip>

			<button
				type="button"
				aria-label="page-player"
				class="flex items-center justify-center rounded-full bg-neutral-100 px-2 py-1 text-xs dark:bg-neutral-800 dark:text-white"
				on:click={toggleRoute}
			>
				<svg
					class="h-6 w-6 transform text-gray-800 transition-transform duration-300 dark:text-white"
					class:rotate-180={isOnWatchPage}
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path d="M18,9l-6,6L6,9H18z" />
				</svg>
			</button>

			<Tooltip class="bg-black! border-black!">
				{isOnWatchPage ? 'Close player page' : 'Open player page'}
			</Tooltip>
		</div>
	</div>
</div>
