<template>
	<aside class="sidebar-container" :class="{ 'sidebar-collapsed': collapse }">
		<div class="sidebar-wrapper">
			<div class="logo-box">
				<a>
					<img src="src/assets/musoul.svg" />
					<h1>Musoul Pro</h1>
				</a>
			</div>
			<div class="menu-box">
				<el-menu router :default-active="activePath" class="menu" :collapse="collapse" @open="handleOpen" @close="handleClose">
					<template v-for="item in menuList">
						<el-sub-menu v-if="item.children.length" :key="item.id" popper-append-to-body :index="item.path">
							<template #title>
								<el-icon>
									<component :is="item.icon"></component>
								</el-icon>
								<span>{{ item.label }}</span>
							</template>
							<el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">
								<template #title>
									<span>{{ subItem.label }}</span>
								</template>
							</el-menu-item>
						</el-sub-menu>
						<el-menu-item v-else :key="item.id" :index="item.path">
							<el-icon>
								<component :is="item.icon"></component>
							</el-icon>
							<template #title>
								<span>{{ item.label }}</span>
							</template>
						</el-menu-item>
					</template>
				</el-menu>
			</div>
			<div class="ctrl-box" @click="collapse = !collapse">
				<span class="ctrl-button">
					<el-icon>
						<Expand v-if="collapse" />
						<Fold v-else />
					</el-icon>
				</span>
			</div>
		</div>
	</aside>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAppStore } from '~/store/modules/app';
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate, useRouter } from 'vue-router';

const appStore = useAppStore();
const { menuList } = storeToRefs(appStore);
onMounted(() => {
	appStore.getMenuList();
});

const { collapse } = storeToRefs(appStore);

const router = useRouter();
const current = router.currentRoute.value.fullPath.split('/');
const activePath = ref<string>(current.length <= 2 ? '/' + current[1] : '/' + current[1] + '/' + current[2]);
onBeforeRouteUpdate((to) => {
	activePath.value = to.path;
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
function handleOpen() {}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function handleClose() {}
</script>

<style lang="scss" scoped>
.sidebar-container {
	width: var(--sidebar-width);
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: 10;
	background: var(--ep-bg-color);
	box-shadow: var(--ep-box-shadow-lighter);
	transition: width var(--ep-transition-duration);
}
.sidebar-collapsed {
	width: var(--sidebar-width-collapsed);
	.logo-box {
		h1 {
			display: none;
		}
	}
}

.sidebar-wrapper {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.logo-box {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px 0 16px 0;
	cursor: pointer;
	a {
		min-height: 32px;
		display: flex;
		align-items: center;
		justify-self: center;
		background: transparent;
	}

	img {
		display: inline-block;
		height: 32px;
		width: 32px;
		vertical-align: middle;
		border-style: none;
	}

	h1 {
		display: inline-block;
		height: 32px;
		line-height: 32px;
		margin: 0 0 0 12px;
		color: #1488cc;
		font-weight: 600;
		font-size: 20px;
		vertical-align: middle;
	}
}

.menu-box {
	flex: 1 1 0;
	.menu {
		width: var(--sidebar-width-collapsed);
		min-height: 100%;
		border-right: none;
	}
	.menu:not(.ep-menu--collapse) {
		width: var(--sidebar-width);
	}
}

.ctrl-box {
	display: flex;
	border-top: 1px solid var(--ep-border-color-light);
	cursor: pointer;

	.ctrl-button {
		height: 40px;
		padding-left: 20px;
		display: flex;
		align-items: center;
		font-size: 20px;
		color: var(--ep-text-color-primary);
	}
}
</style>
