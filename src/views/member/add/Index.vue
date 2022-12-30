<template>
	<BasicPage heading-crumb="会员" sub-crumb="新增会员" heading-path="/member">
		<template #heading-box>
			<div class="intro-wrapper">
				<div class="main-intro">新增会员</div>
				<div class="sub-intro">如下表格所有项需全部填写，提交前请确认。</div>
			</div>
		</template>
		<template #content-box>
			<div class="form-wrapper">
				<el-form :model="form" label-position="top">
					<el-form-item label="会员名">
						<el-input v-model="form.member_name" />
					</el-form-item>
					<el-form-item label="会员性别">
						<el-select v-model="form.member_gender" placeholder="选择性别...">
							<el-option label="男" value="男" />
							<el-option label="女" value="女" />
						</el-select>
					</el-form-item>
					<el-form-item label="手机号">
						<el-input v-model="form.member_phone" />
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
import memberApi from '~/api/modules/member';
import { reactive } from 'vue';
import { useAuthStore } from '~/store/modules/auth';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const form = reactive({
	member_name: '',
	member_gender: '',
	member_phone: '',
});
const authStore = useAuthStore();
const router = useRouter();
function onSubmit() {
	memberApi
		.addMember({ params: form })
		.then(() => {
			ElMessage.success('创建成功');
			router.push('/member/manage');
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
