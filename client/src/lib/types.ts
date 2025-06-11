export enum UserRole {
	USER = 'USER',
	ADMIN = 'ADMIN'
}

export interface UserInfo {
	id: string;
	name: string;
	email: string;
	avatar: string;
	provider: string;
	providerId: string;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
}

export interface AxiosRequestConfig {
	url?: string;
	method?: string;
	headers?: Record<string, string>;
	[key: string]: unknown;
}

export interface AxiosResponse<T = unknown> {
	data: T;
	status: number;
	statusText: string;
	headers: Record<string, string>;
	config: AxiosRequestConfig;
	request?: unknown;
}

export interface Genre {
	id: string;
	name: string;
}
