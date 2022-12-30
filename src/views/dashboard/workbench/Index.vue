<template>
	<BasicPage heading-crumb="仪表盘" heading-path="/dashboard" sub-crumb="工作台">
		<template #heading-box>
			<div class="intro-wrapper">
				<div class="intro">{{ getTime() }}，{{ userStore.username }}。</div>
				<div class="search-box">
					<el-select
						v-model="searchValue"
						multiple
						filterable
						remote
						reserve-keyword
						placeholder="请输入会员用户名或手机号进行查找..."
						:remote-method="remoteMethod"
						:loading="loading"
						style="width: 500px"
					>
						<el-option v-for="item in options" :key="item" :label="item" :value="item" />
					</el-select>
				</div>
				<div style="display: flex; justify-content: center; align-items: center; margin-top: 24px">
					<el-button type="primary" @click="handlePresent" round>入场</el-button>
				</div>
			</div>
		</template>
		<template #content-box>
			<div v-if="presentedList.length === 0" class="content-wrapper no-data">无入场纪录...</div>
			<div v-else class="content-wrapper">
				<el-row v-for="i in Math.ceil(presentedList.length / 6)" :key="i" :gutter="20" style="padding: 32px 24px">
					<el-col v-for="j in getArray(i)" :key="j" :span="4" style="display: flex; justify-content: center; align-items: center">
						<div class="present-item">
							<el-avatar class="item-avatar" shape="circle">{{ presentedList[j] }}</el-avatar>
							<el-button class="item-btn" round @click="getOut(j)">离场</el-button>
						</div>
					</el-col>
				</el-row>
			</div>
		</template>
	</BasicPage>
</template>

<script lang="ts" setup>
import BasicPage from '~/components/basicPage/Index.vue';
import memberApi from '~/api/modules/member';
import { reactive, ref } from 'vue';
import { useAuthStore } from '~/store/modules/auth';
import { useUserStore } from '~/store/modules/user';

const getArray = (i: number) => {
	let arr = [];
	for (let o = (i - 1) * 6; o < (i - 1) * 6 + 6 && o < presentedList.length; o++) {
		arr.push(o);
	}
	return arr;
};

const getOut = (j: any) => {
	presentedList.splice(j, 1);
	console.log(presentedList.length);
};

const userStore = useUserStore();
const getTime = () => {
	const hours: number = new Date().getHours();
	if (hours >= 0 && hours <= 6) {
		return '早点休息';
	} else if (hours > 6 && hours <= 11) {
		return '早上好';
	} else if (hours > 11 && hours <= 14) {
		return '中午好';
	} else if (hours > 14 && hours <= 18) {
		return '下午好';
	} else if (hours > 18 && hours < 24) {
		return '晚上好';
	}
};

const authStore = useAuthStore();
const presentedList = reactive<any[]>([]);
const searchValue = ref('');
const loading = ref(false);
const options = ref<any[]>([]);
const remoteMethod = (query: string) => {
	if (query) {
		loading.value = true;
		setTimeout(() => {
			loading.value = false;
			memberApi
				.searchMember({ params: query })
				.then((res) => {
					const { payload } = res;
					options.value = payload;
				})
				.catch(() => {
					authStore.handleUnauthorized();
				});
		}, 200);
	} else {
		options.value = [];
	}
};

const handlePresent = () => {
	presentedList.push(searchValue.value[0]);
	searchValue.value = '';
};
</script>

<style lang="scss" scoped>
.intro-wrapper {
	margin-top: 24px;
	.intro {
		font-size: 20px;
		font-weight: 600;
		margin-bottom: 24px;
	}
	.search-box {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 64px;
		.ep-input {
			--ep-input-border-radius: 20px;
		}
	}
}
.content-wrapper {
	min-height: 200px;
}
.no-data {
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--ep-text-color-placeholder);
}

.present-item {
	display: flex;
	flex-flow: column nowrap;
	align-items: center;
	justify-content: center;
	.item-avatar {
		width: 60px;
		height: 60px;
		margin-bottom: 20px;
		font-weight: 600;
		box-shadow: var(--ep-box-shadow-lighter);
		transition: var(--ep-transition-all);
	}
	.item-avatar:hover {
		box-shadow: var(--ep-box-shadow);
	}
	.item-btn {
		padding: 8px 20px !important;
	}
}
</style>
