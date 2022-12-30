import { defineStore } from 'pinia';
import appApi from '~/api/modules/app';

export const useAppStore = defineStore('APP', {
	state: () => ({
		menuList: [],
		collapse: false,
	}),
	actions: {
		getMenuList() {
			appApi.getMenuList().then((result) => {
				// analyzing
				const { payload } = result;
				// processing
				const { menuList } = payload;
				this.menuList = menuList;
			});
		},
	},
});
