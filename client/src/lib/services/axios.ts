import { URL_API } from '$env/static/private';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: URL_API,
	headers: {
		'Content-Type': 'application/json'
	}
});

export default axiosInstance;
