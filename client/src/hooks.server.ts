import authService from '$lib/services/auth.service';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('accessToken');

	if (token) {
		try {
			const currentUserProfileResponse = await authService.getCurrentUser(token);
			event.locals.user = currentUserProfileResponse;
		} catch (error) {
			console.error('Lỗi xác thực token:', error);
			event.locals.user = null;
		}
	} else {
		event.locals.user = null;
	}

	const response = await resolve(event);
	return response;
};
