import { URL_API } from '$env/static/private';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: URL_API,
	timeout: 1000
});

export default axiosInstance;
