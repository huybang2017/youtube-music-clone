import { URL_API } from '$env/static/private';
import albumService from '$lib/services/album.service';
import genreService from '$lib/services/genre.service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const token = event.cookies.get('accessToken');
	const genres = await genreService.fetchGenres({
		Authorization: `Bearer ${token}`
	});
	const albums = await albumService.fetchAlbums({
		Authorization: `Bearer ${token}`
	});
	return { user: event.locals.user, URL_API: URL_API, genres, albums };
};
