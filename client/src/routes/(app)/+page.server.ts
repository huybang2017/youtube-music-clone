import songService from '$lib/services/song.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const token = event.cookies.get('accessToken');
	const songs = await songService.fetchSongs({
		Authorization: `Bearer ${token}`
	});
	// const genres = await genreService.fetchGenres({
	// 	Authorization: `Bearer ${token}`
	// });
	// const albums = await albumService.fetchAlbums({
	// 	Authorization: `Bearer ${token}`
	// });
	return { songs };
};
