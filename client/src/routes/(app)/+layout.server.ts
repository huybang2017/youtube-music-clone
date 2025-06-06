import { URL_API } from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	return { user: event.locals.user, URL_API: URL_API };
};
