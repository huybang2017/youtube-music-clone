import axiosInstance from '$lib/services/axios';
import type { UserInfo } from '$lib/types';

const getCurrentUser = async (accessToken: string) => {
	try {
		const res = await axiosInstance.get<UserInfo>('/auth/profile', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`
			}
		});
		return res.data;
	} catch (error) {
		console.error('Error fetching current user:', error);
	}
};

const authService = {
	getCurrentUser
};

export default authService;
