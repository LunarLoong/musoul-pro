import { createRouter, createWebHashHistory } from 'vue-router';
import { getToken } from '~/utils/auth';
import { ElMessage } from 'element-plus';
import { close, start } from '~/utils/nprogress';

const routes: any = [
	{
		path: '/',
		name: 'Layout',
		redirect: '/member/manage',
		component: () => import('~/layout/Index.vue'),
		children: [
			{
				path: '/dashboard',
				redirect: '/dashboard/analysis',
			},
			{
				path: '/dashboard/analysis',
				component: () => import('~/views/dashboard/analysis/Index.vue'),
			},
			{
				path: '/dashboard/workbench',
				component: () => import('~/views/dashboard/workbench/Index.vue'),
			},
			{
				path: '/member',
				redirect: '/member/manage',
			},
			{
				path: '/member/manage',
				component: () => import('~/views/member/manage/Index.vue'),
			},
			{
				path: '/member/add',
				component: () => import('~/views/member/add/Index.vue'),
			},
			{
				path: '/order',
				redirect: '/order/manage',
			},
			{
				path: '/order/manage',
				component: () => import('~/views/order/manage/Index.vue'),
			},
			{
				path: '/order/add',
				component: () => import('~/views/order/add/Index.vue'),
			},
			{
				path: '/card',
				redirect: '/card/manage',
			},
			{
				path: '/card/manage',
				component: () => import('~/views/card/manage/Index.vue'),
			},
			{
				path: '/card/add',
				component: () => import('~/views/card/add/Index.vue'),
			},
			{
				path: '/personal/setting',
				component: () => import('~/views/personal/setting/Index.vue'),
			},
		],
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('~/views/Login.vue'),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

router.beforeEach(async (to, from, next) => {
	start();
	if (to.path === '/login') {
		if (getToken()) {
			next(from.path);
			return;
		}
		next();
		return;
	}
	if (getToken() && to.path !== '/login') {
		next();
	} else {
		ElMessage.error('登陆失效');
		next('/login');
	}
});

router.afterEach(() => {
	close();
});

export default router;
