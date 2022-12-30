<template>
	<BasicPage heading-crumb="入场卡" sub-crumb="新增卡片" heading-path="/card">
		<template #heading-box>
			<div class="intro-wrapper">
				<div class="main-intro">新增卡别</div>
				<div class="sub-intro">如下表格所有项需全部填写，提交前请确认。</div>
			</div>
		</template>
		<template #content-box>
			<div class="form-wrapper">
				<el-form :model="form" label-position="top">
					<el-form-item label="卡名">
						<el-input v-model="form.card_name" />
					</el-form-item>
					<el-form-item label="持续时间">
						<el-input v-model="form.card_duration" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">创建</el-button>
					</el-form-item>
				</el-form>
			</div>
		</template>
	</BasicPage>
</template>

<script lang="ts" setup>
import BasicPage from '~/components/basicPage/Index.vue';
import cardApi from '~/api/modules/card';
import { reactive } from 'vue';
import { useAuthStore } from '~/store/modules/auth';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const form = reactive({
	card_name: '',
	card_duration: '',
});
const authStore = useAuthStore();
const router = useRouter();
function onSubmit() {
	cardApi
		.addCard({ params: form })
		.then(() => {
			ElMessage.success('创建成功');
			router.push('/card/manage');
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
}
</script>

<style lang="scss" scoped>
.intro-wrapper {
	margin-top: 24px;
	.main-intro {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 24px;
	}
	.sub-intro {
		font-size: 14px;
	}
}

.form-wrapper {
	padding: 32px 64px;
	.ep-form-item {
		.ep-input {
			width: 150px;
		}
	}
}
</style>
