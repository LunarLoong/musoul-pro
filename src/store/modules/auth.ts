import { defineStore } from 'pinia';
import authApi from '~/api/modules/auth';
import { getToken, removeToken, setToken } from '~/utils/auth';
import { removeRole, removeUsername } from '~/utils/user';
import { useUserStore } from '~/store/modules/user';
import { ElMessage } from 'element-plus';

export const useAuthStore = defineStore('AUTH', {
	state: () => ({
		token: getToken() || '',
	}),
	actions: {
		login(username: string, password: string) {
			return new Promise((resolve, reject) => {
				authApi.login(username, password).then((result) => {
					// analyzing
					const { payload, message } = result;
					const { token } = payload;
					// processing
					if (token) {
						setToken(token);
						this.token = token;
						resolve(message);
					} else {
						reject(message);
					}
				});
			});
		},
		logout() {
			removeToken();
			removeUsername();
			removeRole();
			const userStore = useUserStore();
			userStore.$reset();
			this.$reset();
		},
		handleUnauthorized() {
			this.logout();
			ElMessage.error('登录失效，请重新登录');
		},
	},
});
