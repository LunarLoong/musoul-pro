import { http } from '../index';

export default {
	getInfo(): Promise<any> {
		return http.post('/user/userInfo');
	},
	editUser(params: object): Promise<any> {
		return http.post('/user/edit', params);
	},
};
