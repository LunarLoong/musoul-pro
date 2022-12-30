<template>
	<div class="content-wrapper">
		<el-form :model="form">
			<el-form-item label="用户名">
				<el-input v-model="form.username" style="width: 150px" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onEdit">确认修改</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useUserStore } from '~/store/modules/user';
import userApi from '~/api/modules/user';
import { useAuthStore } from '~/store/modules/auth';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const form = reactive({
	username: '',
});

const router = useRouter();
const userStore = useUserStore();
const authStore = useAuthStore();
onMounted(() => {
	form.username = userStore.username;
});

const onEdit = () => {
	userApi
		.editUser({ params: { username: form.username, usernameBefore: userStore.username } })
		.then(() => {
			ElMessage.success('修改成功');
			setTimeout(() => {
				router.push('/');
			}, 1000);
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
};
</script>

<style scoped>
.content-wrapper {
	margin: 32px;
	padding: 32px;
	min-height: 100px;
	background: var(--ep-bg-color);
}
</style>
