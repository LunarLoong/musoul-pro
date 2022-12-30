<template>
	<div class="app-layout">
		<BaseAside></BaseAside>
		<BaseHeader></BaseHeader>
		<el-main class="content-container" :class="{ 'content-collapsed': collapse }">
			<router-view></router-view>
		</el-main>
	</div>
</template>

<script lang="ts" setup>
import BaseHeader from './components/BaseHeader.vue';
import BaseAside from './components/BaseAside.vue';
import { useUserStore } from '~/store/modules/user';
import { onMounted } from 'vue';
import { useAppStore } from '~/store/modules/app';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
onMounted(() => {
	userStore.getInfo();
});

const appStore = useAppStore();
const { collapse } = storeToRefs(appStore);
</script>

<style lang="scss" scoped>
.content-container {
	padding-top: 0;
	padding-left: var(--sidebar-width);
	padding-right: 0;
	transition: padding-left var(--ep-transition-duration);
}
.content-collapsed {
	padding-left: var(--sidebar-width-collapsed);
}
</style>
