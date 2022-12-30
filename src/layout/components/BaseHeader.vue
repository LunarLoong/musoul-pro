<template>
	<header class="header-container" :class="{ 'header-collapsed': collapse }">
		<div class="header-wrapper">
			<div class="nav-item">
				<el-icon>
					<Search />
				</el-icon>
			</div>
			<div class="nav-item">
				<svg t="1672372850243" class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="2668" width="18px" height="18px">
					<path
						d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
						p-id="2669"
					></path>
				</svg>
			</div>
			<div class="nav-item">
				<el-badge value="20" style="display: flex; align-items: center; justify-content: center">
					<el-icon>
						<Bell />
					</el-icon>
				</el-badge>
			</div>
			<div class="nav-item">
				<el-dropdown trigger="click">
					<div style="font-size: 16px">
						<el-avatar>{{ userStore.username }}</el-avatar>
						<span>{{ userStore.username }}</span>
					</div>
					<template #dropdown>
						<el-dropdown-menu style="font-size: 14px">
							<el-dropdown-item @click="router.push('/personal/setting')"> 个人设置 </el-dropdown-item>
							<el-dropdown-item @click="logout"> 退出登录 </el-dropdown-item>
						</el-dropdown-menu>
					</template>
				</el-dropdown>
			</div>
			<div class="nav-item" @click="toggleDark()">
				<el-icon>
					<Moon v-if="isDark" />
					<Sunny v-else />
				</el-icon>
			</div>
		</div>
	</header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/modules/auth';
import { useRouter } from 'vue-router';
import { isDark, toggleDark } from '~/utils/composables';
import { ElMessage } from 'element-plus';
import { useAppStore } from '~/store/modules/app';
import { storeToRefs } from 'pinia';
import { getUsername } from '~/utils/user';
import { useUserStore } from '~/store/modules/user';

const authStore = useAuthStore();
const router = useRouter();

function logout() {
	authStore.logout();
	ElMessage.success('退出登录成功');
	router.push({ name: 'Login' });
}

const appStore = useAppStore();
const { collapse } = storeToRefs(appStore);

const userStore = useUserStore();
</script>

<style lang="scss" scoped>
.header-container {
	height: var(--header-height);
	width: calc(100% - var(--sidebar-width));
	position: sticky;
	top: 0;
	left: var(--sidebar-width);
	z-index: 99;
	background: var(--ep-bg-color);
	box-shadow: var(--ep-box-shadow-lighter);
	transition: var(--ep-transition-all);
}
.header-collapsed {
	width: calc(100% - var(--sidebar-width-collapsed));
	left: var(--sidebar-width-collapsed);
}
.header-wrapper {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	height: var(--header-height);
	padding-right: 24px;
	.nav-item {
		height: 100%;
		color: var(--ep-text-color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 12px;
		background: transparent;
		transition: all (--ep-transition-duration) var(--ep-transition-function-fast-bezier);
		cursor: pointer;
	}
	.nav-item:hover {
		background: var(--ep-fill-color);
	}
	svg {
		fill: var(--ep-text-color-primary);
	}
	.ep-avatar {
		width: 24px;
		height: 24px;
		margin-right: 8px;
	}
}
</style>
