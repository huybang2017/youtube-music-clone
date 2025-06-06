import type { UserInfo } from '$lib/types';
import { writable } from 'svelte/store';

export const userInfo = writable<UserInfo | null>(null);

export const isLoggedIn = writable<boolean>(false);
