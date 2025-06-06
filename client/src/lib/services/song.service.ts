import axiosInstance from '$lib/services/axios';

const fetchSongs = async () => {
	try {
		const response = await axiosInstance.get('/song');
		return response.data;
	} catch (error) {
		console.error('Error fetching songs:', error);
		throw error;
	}
};
const songService = { fetchSongs };
export default songService;
