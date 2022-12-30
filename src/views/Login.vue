<template>
	<div class="page-container">
		<div class="page-wrapper">
			<div class="intro-box">
				<div class="intro-wrapper">
					<span class="logo">
						<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15.9898 7.70295L32 16.9219V9.22919L15.9795 0L0 9.23944V16.9424L15.9898 7.70295Z" fill="url(#paint0_linear_40_2)" />
							<path
								d="M29.4392 26.192L32 24.6863V19.9641L15.9795 10.7247L0 19.9641V24.7068L2.56082 26.192L15.9795 18.4276L29.4392 26.192Z"
								fill="url(#paint1_linear_40_2)"
							/>
							<path
								d="M15.9901 29.3471L20.0567 31.6928L26.7353 27.8515L15.9798 21.6441L5.26538 27.8515L11.944 31.6928L15.9901 29.3471Z"
								fill="url(#paint2_linear_40_2)"
							/>
							<defs>
								<linearGradient id="paint0_linear_40_2" x1="16" y1="0" x2="16" y2="16.9424" gradientUnits="userSpaceOnUse">
									<stop stop-color="#2B32B2" />
									<stop offset="1" stop-color="#294DBB" />
								</linearGradient>
								<linearGradient id="paint1_linear_40_2" x1="16" y1="10.7247" x2="16" y2="26.192" gradientUnits="userSpaceOnUse">
									<stop stop-color="#294DBB" />
									<stop offset="1" stop-color="#2B77C8" />
								</linearGradient>
								<linearGradient id="paint2_linear_40_2" x1="16.0003" y1="21.6441" x2="16.0003" y2="31.6928" gradientUnits="userSpaceOnUse">
									<stop stop-color="#2B77C8" />
									<stop offset="1" stop-color="#1488CC" />
								</linearGradient>
							</defs>
						</svg>
						<span>MUSOUL PRO</span>
					</span>
					<span class="app-intro">
						<h1>MANAGEMENT</h1>
						<h1>SYSTEM</h1>
					</span>
				</div>
			</div>
			<div class="form-box">
				<div class="form-wrapper">
					<div class="title">
						<span>健身房后台管理系统</span>
					</div>
					<div class="form">
						<el-form :model="loginForm">
							<el-form-item style="margin-top: 48px">
								<el-input v-model="loginForm.username" prefix-icon="User" />
							</el-form-item>
							<el-form-item style="margin-top: 32px">
								<el-input v-model="loginForm.password" prefix-icon="Lock" />
							</el-form-item>
							<el-form-item @click="login" style="margin-top: 48px">
								<el-button type="primary" style="width: 100%; font-weight: 600">登录</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useAuthStore } from '~/store/modules/auth';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const authStore = useAuthStore();
const router = useRouter();

const loginForm = reactive({
	username: '',
	password: '',
});

async function login() {
	await authStore
		.login(loginForm.username, loginForm.password)
		.then((message: any) => {
			ElMessage.success(message);
			router.push({ name: 'Layout' });
		})
		.catch((message) => {
			ElMessage.error(message);
		});
}
</script>

<style lang="scss" scoped>
.page-container {
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	height: 100vh;
	.page-wrapper {
		width: 56%;
		height: 68%;
		display: flex;
		flex-flow: row nowrap;
		background: transparent;
		border-radius: 0 50px;
		box-shadow: var(--ep-box-shadow-lighter);
		.intro-box {
			width: 50%;
			height: 100%;
			background: var(--ep-overlay-color);
			border-bottom-left-radius: 50px;
			.intro-wrapper {
				padding: 32px 42px;
				.logo {
					display: flex;
					align-items: center;
					span {
						color: rgba(255, 255, 255, 0.95);
						font-size: 28px;
						font-weight: 700;
						margin-left: 10px;
					}
				}
				.app-intro {
					display: inline-block;
					margin-top: 65px;
					h1 {
						color: rgba(255, 255, 255, 0.95);
						font-size: 50px;
						margin: 0 !important;
					}
				}
			}
		}
		.form-box {
			width: 50%;
			height: 100%;
			background: #fff;
			border-top-right-radius: 50px;
			.form-wrapper {
				display: flex;
				height: inherit;
				flex-flow: column nowrap;
				padding: 32px 64px;
				.title {
					width: 100%;
					height: 20%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 22px;
					font-weight: 600;
					color: var(--ep-text-color-primary);
				}
				.form {
					width: 100%;
					height: 80%;
				}
			}
		}
	}
}
</style>
