<script lang="ts">
	import {
		DarkMode,
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownGroup,
		DropdownItem
	} from 'flowbite-svelte';
	import Player from '$lib/component/Player.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { isLoggedIn, userInfo } from '$lib/stores/userStore';
	import type { UserInfo } from '$lib/types';
	import { deleteCookie } from '$lib/cookies';

	/** @type {{children: import('svelte').Snippet}} */
	let { children, data } = $props() as {
		children?: any;
		data: { user: UserInfo | null; URL_API: string };
	};

	const state = $state<{
		isSidebarOpen: boolean;
	}>({
		isSidebarOpen: true
	});

	function loginWithGoogle() {
		window.location.href = data.URL_API + '/auth/google';
	}

	onMount(() => {
		if (window.location.pathname === '/google-callback') {
			const params = new URLSearchParams(window.location.search);
			const accessToken = params.get('accessToken');

			if (accessToken) {
				goto('/');
			} else {
				alert('Không có token!');
				goto('/login');
			}
		}
	});

	onMount(() => {
		userInfo.set(data.user);
		isLoggedIn.set(!!data.user);
	});

	function handleLogout() {
		deleteCookie('accessToken');
		userInfo.set(null);
		isLoggedIn.set(false);
	}
</script>

<div class="flex h-screen flex-col">
	<header
		class="flex items-center justify-between bg-gray-50 px-4 py-3 shadow-md dark:border-b dark:border-zinc-800 dark:bg-black"
	>
		<div class="flex items-center justify-center gap-4">
			<button
				onclick={() => (state.isSidebarOpen = !state.isSidebarOpen)}
				type="button"
				class="group rounded-full bg-gray-100 p-2 text-xs hover:bg-gray-200 dark:bg-black dark:hover:bg-zinc-900"
				aria-label="Mở menu"
			>
				<svg
					class="h-6 w-6 text-black group-hover:text-black dark:text-white dark:group-hover:text-white"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-width="2"
						d="M5 7h14M5 12h14M5 17h14"
					/>
				</svg>
			</button>

			<div class="flex items-center justify-center">
				<svg
					class="h-10 w-10 text-red-500"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						fill-rule="evenodd"
						d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
						clip-rule="evenodd"
					/>
				</svg>
				<h1 class="text-xl font-semibold text-gray-900 dark:text-white">Music</h1>
			</div>
		</div>

		<!-- Search input -->
		<div class="mx-6 flex max-w-xl flex-1">
			<div class="relative w-full">
				<input
					type="search"
					placeholder="Search music, artists, albums..."
					aria-label="Search music"
					class="w-full rounded-md border border-neutral-600 bg-white py-2 pl-10 pr-4 text-sm text-neutral-900 placeholder-neutral-400 shadow-sm focus:border-neutral-700 focus:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:font-bold dark:text-white dark:placeholder-neutral-500 dark:focus:border-black dark:focus:bg-black dark:focus:ring-neutral-700"
				/>
				<svg
					class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1117 9a7.5 7.5 0 01-.35 7.65z"
					/>
				</svg>
			</div>
		</div>

		<div class="flex items-center space-x-4">
			<DarkMode class="hover:bg-neutral-200! dark:hover:bg-neutral-800!"></DarkMode>
			{#if $isLoggedIn && $userInfo}
				<Avatar class="acs" src={$userInfo.avatar} />
				<Dropdown triggeredBy=".acs" class="dark:bg-neutral-800">
					<DropdownHeader class="space-y-4">
						<div class="flex items-center justify-center gap-4">
							<div>
								<Avatar class="acs" src={$userInfo.avatar} />
							</div>
							<div>
								<span class="block text-sm text-gray-900 dark:text-white">{$userInfo.name}</span>
								<span class="block truncate text-sm font-medium">{$userInfo.email}</span>
							</div>
						</div>
						<div>
							<span class="text-blue-400">Manage your Google Account</span>
						</div>
					</DropdownHeader>
					<DropdownGroup>
						<DropdownItem class="flex items-center gap-2">
							<svg
								class="h-[30px] w-[30px] text-gray-800 dark:text-white"
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
									stroke-width="1.2"
									d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
							Your channel
						</DropdownItem>
						<DropdownItem class="flex items-center gap-2">
							<svg
								class="h-[30px] w-[30px] text-gray-800 dark:text-white"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									fill-rule="evenodd"
									d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
									clip-rule="evenodd"
								/>
							</svg>

							Get Music Premium
						</DropdownItem>
						<DropdownItem class="flex items-center gap-2">
							<svg
								class="h-[30px] w-[30px] text-gray-800 dark:text-white"
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
									stroke-width="1.1"
									d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"
								/>
							</svg>

							Switch account
						</DropdownItem>
						<DropdownItem
							onclick={() => handleLogout()}
							class="cusor-pointer flex w-full flex-1 items-center gap-2"
						>
							<svg
								class="h-[30px] w-[30px] text-gray-800 dark:text-white"
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
									stroke-width="1.1"
									d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
								/>
							</svg>

							Sign out
						</DropdownItem>
					</DropdownGroup>
				</Dropdown>
			{:else}
				<button
					onclick={loginWithGoogle}
					class="text-whtie cursor-pointer rounded-full bg-neutral-800 px-4 py-2 text-sm font-bold text-neutral-100 dark:bg-white dark:text-neutral-800"
					>Sign in</button
				>
			{/if}
		</div>
	</header>
	<div class="flex flex-1 bg-gray-100 dark:bg-black">
		{#if state.isSidebarOpen}
			<aside
				class="w-64 bg-white text-gray-800 shadow-lg dark:border-r dark:border-zinc-800 dark:bg-black dark:text-white"
			>
				<nav class="space-y-2 p-4">
					<a
						href="#"
						class="flex items-center gap-3 rounded p-2 hover:bg-gray-200 dark:hover:bg-zinc-800"
					>
						<svg
							class="h-7 w-7 text-gray-800 dark:text-white"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								fill-rule="evenodd"
								d="M12,4.33l7,6.12V20H15V14H9v6H5V10.45l7-6.12M12,3,4,10V21h6V15h4v6h6V10L12,3Z"
								clip-rule="evenodd"
							/>
						</svg>
						<span>Home</span>
					</a>

					<!-- Dropdown -->
					<div>
						<button
							class="flex w-full items-center justify-between rounded p-2 hover:bg-gray-200 dark:hover:bg-zinc-800"
						>
							<span class="flex items-center gap-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									class="h-7 w-7 text-gray-800 dark:text-white"
									fill="currentColor"
								>
									<path
										d="M9.8,9.8l-3.83,8.23l8.23-3.83l3.83-8.23L9.8,9.8z M13.08,12.77c-0.21,0.29-0.51,0.48-0.86,0.54c-0.07,0.01-0.15,0.02-0.22,0.02c-0.28,0-0.54-0.08-0.77-0.25c-0.29-0.21-0.48-0.51-0.54-0.86c-0.06-0.35,0.02-0.71,0.23-0.99c0.21-0.29,0.51-0.48,0.86-0.54c0.35-0.06,0.7,0.02,0.99,0.23c0.29,0.21,0.48,0.51,0.54,0.86C13.37,12.13,13.29,12.48,13.08,12.77z M12,3c4.96,0,9,4.04,9,9s-4.04,9-9,9s-9-4.04-9-9S7.04,3,12,3 M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z"
									/>
								</svg>
								<span>Explore</span>
							</span>
						</button>
					</div>

					<!-- Other Items -->
					<a
						href="#"
						class="flex items-center gap-3 rounded p-2 hover:bg-gray-200 dark:hover:bg-zinc-800"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="h-7 w-7 text-gray-800 dark:text-white"
							fill="currentColor"
						>
							<path
								d="M16,6v2h-2v5c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2c0.37,0,0.7,0.11,1,0.28V6H16z M18,20H4V6H3v15h15V20z M21,3H6v15h15V3z M7,4h13v13H7V4z"
							/>
						</svg>
						<span>Library</span>
					</a>

					<a
						href="/"
						class="flex items-center gap-3 rounded p-2 hover:bg-gray-200 dark:hover:bg-zinc-800"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							class="h-7 w-7 text-gray-800 dark:text-white"
							fill="currentColor"
						>
							<path
								d="M10 9.35L15 12l-5 2.65zM12 7a5 5 0 105 5 5 5 0 00-5-5m0-1a6 6 0 11-6 6 6 6 0 016-6zm0-3a9 9 0 109 9 9 9 0 00-9-9m0-1A10 10 0 112 12 10 10 0 0112 2z"
							/>
						</svg>

						<span>Upgrade</span>
					</a>
				</nav>
			</aside>
		{/if}

		<main class="flex-1 p-6 text-gray-900 dark:text-white">
			{@render children()}
		</main>
	</div>
</div>
<Player />
