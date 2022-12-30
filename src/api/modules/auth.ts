import { http } from '../index';

export default {
	login(username: string, password: string): Promise<any> {
		return http.post('/login', { username: username, password: password });
	},
};
