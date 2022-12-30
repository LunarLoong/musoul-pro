<template>
	<div class="nav-container">
		<div class="nav-wrapper">
			<el-breadcrumb class="breadcrumb" :separator-icon="ArrowRight">
				<el-breadcrumb-item :to="{ path: headingPath }">{{ headingCrumb }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ subCrumb }}</el-breadcrumb-item>
			</el-breadcrumb>
			<slot name="heading-box"></slot>
		</div>
	</div>
	<div class="content-container">
		<div class="content-wrapper">
			<slot name="content-box"></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue';

interface Props {
	headingCrumb: string;
	headingPath: string;
	subCrumb: string;
}

const props = withDefaults(defineProps<Props>(), {
	headingCrumb: () => 'headingCrumb',
	headingPath: () => '/member',
	subCrumb: () => 'subCrumb',
});
</script>

<style lang="scss" scoped>
.nav-container {
	background: var(--ep-bg-color);
	border-bottom: 1px solid var(--ep-border-color-light);

	.nav-wrapper {
		padding: 16px 24px;

		.breadcrumb {
			font-size: 14px;
		}
	}
}

.el-input {
	width: 150px;
}

.content-container {
	background: var(--ep-bg-color);
	border-top: 1px solid var(--ep-border-color-light);
	margin: 32px 24px;

	.content-wrapper {
	}
}
</style>
