import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from '~/utils/auth';
import { useUserStore } from '~/store/modules/user';
import { useAuthStore } from '~/store/modules/auth';
import { ElMessage } from 'element-plus';

const service = (config?: AxiosRequestConfig): AxiosInstance => {
	// axios instance
	const instance = axios.create({
		baseURL: '/api',
		timeout: 5000, // milliseconds
		withCredentials: true,
		...config,
	});

	// interceptor for request
	instance.interceptors.request.use(
		function (config: any) {
			// before requested
			config.headers.Authorization = getToken();
			return config;
		},
		function (error) {
			// handle error
			return Promise.reject(error);
		}
	);

	// interceptor for response
	instance.interceptors.response.use(
		function (response: any) {
			// before respond
			// 2xx
			return response.data;
		},
		function (error) {
			// handle error
			// not 2xx
			return Promise.reject(error);
		}
	);
	return instance;
};

export const http = service();
