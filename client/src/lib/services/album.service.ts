import axiosInstance from '$lib/services/axios';
import type { RawAxiosRequestHeaders } from 'axios';

const fetchAlbums = async (headers: RawAxiosRequestHeaders = {}) => {
	try {
		const response = await axiosInstance.get('/album', {
			headers
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching albums:', error);
		throw error;
	}
};

const albumService = { fetchAlbums };
export default albumService;
