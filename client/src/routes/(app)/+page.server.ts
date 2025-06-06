import songService from '$lib/services/song.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const songs = await songService.fetchSongs();
	return { songs };
};
