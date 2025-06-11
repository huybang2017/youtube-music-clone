import axiosInstance from '$lib/services/axios';
import type { RawAxiosRequestHeaders } from 'axios';

const fetchSongs = async (headers: RawAxiosRequestHeaders = {}) => {
	try {
		const response = await axiosInstance.get('/song', {
			headers
		});
		return response.data;
	} catch (error) {
		console.error('Error fetching songs:', error);
		throw error;
	}
};

const songService = { fetchSongs };
export default songService;
