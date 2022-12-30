import { defineStore } from 'pinia';
import userApi from '~/api/modules/user';
import { getRole, getUsername, setRole, setUsername } from '~/utils/user';
import { useAuthStore } from '~/store/modules/auth';

export const useUserStore = defineStore('USER', {
	state: () => ({
		username: getUsername() || '',
		role: getRole() || '',
	}),
	actions: {
		getInfo() {
			userApi
				.getInfo()
				.then((result) => {
					// analyzing
					const { payload } = result;
					// processing
					const { username, role } = payload;
					setUsername(username);
					setRole(role);
					this.username = username;
					this.role = role;
				})
				.catch(() => {
					const authStore = useAuthStore();
					authStore.handleUnauthorized();
				});
		},
	},
});
