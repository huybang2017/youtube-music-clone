import axiosInstance from '$lib/services/axios';
import type { RawAxiosRequestHeaders } from 'axios';

const fetchGenres = async (headers: RawAxiosRequestHeaders = {}) => {
	try {
		const response = await axiosInstance.get('/genres', {
			headers
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching genres:', error);
		throw error;
	}
};
const genreService = { fetchGenres };
export default genreService;
