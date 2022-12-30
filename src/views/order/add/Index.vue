<template>
	<BasicPage heading-crumb="订单" sub-crumb="签单" heading-path="/order">
		<template #heading-box>
			<div class="intro-wrapper">
				<div class="main-intro">签单</div>
				<div class="sub-intro">如下表格所有项需全部填写，提交前请确认。</div>
			</div>
		</template>
		<template #content-box>
			<div class="form-wrapper">
				<el-form :model="form" label-position="top">
					<el-form-item label="会员名">
						<el-select
							v-model="form.member_name"
							multiple
							filterable
							remote
							reserve-keyword
							placeholder="输入会员名..."
							:remote-method="remoteMethod"
							:loading="loading"
						>
							<el-option v-for="item in member_name_options" :key="item" :label="item" :value="item" />
						</el-select>
					</el-form-item>
					<el-form-item label="卡号">
						<el-input v-model="form.card_number" disabled />
					</el-form-item>
					<el-form-item label="卡种">
						<el-select v-model="form.card_type" placeholder="选择卡种...">
							<el-option v-for="item in cardList" :key="item.card_name" :label="item.card_name" :value="item.card_name" />
						</el-select>
					</el-form-item>
					<el-form-item label="开卡时间">
						<el-date-picker v-model="form.card_starting_time" type="datetime" placeholder="选择开卡时间..." />
						<el-date-picker v-model="form.card_ending_time" type="datetime" prefix-icon="Remove" style="margin-left: 20px" disabled />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit">创建订单</el-button>
					</el-form-item>
				</el-form>
			</div>
		</template>
	</BasicPage>
</template>

<script lang="ts" setup>
import BasicPage from '~/components/basicPage/Index.vue';
import memberApi from '~/api/modules/member';
import orderApi from '~/api/modules/order';
import cardApi from '~/api/modules/card';
import { onMounted, reactive, ref, watch } from 'vue';
import { useAuthStore } from '~/store/modules/auth';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const form = reactive({
	member_name: '',
	card_number: '',
	card_type: '',
	card_starting_time: '',
	card_ending_time: '',
});

watch(
	() => form.card_starting_time,
	(newValue) => {
		let duration = 0;
		for (let i = 0; i < cardList.length; i++) {
			if (cardList[i].card_name === form.card_type) {
				duration = cardList[i].card_duration;
			}
		}
		let date = new Date(Date.parse(newValue));
		date.setDate(date.getDate() + Number(duration));
		form.card_ending_time = date.toString();
	}
);
watch(
	() => form.card_type,
	() => {
		form.card_starting_time = '';
		form.card_ending_time = '';
	}
);

const authStore = useAuthStore();
const router = useRouter();
function onSubmit() {
	orderApi
		.addOrder({ params: form })
		.then(() => {
			ElMessage.success('创建成功');
			router.push('/order/manage');
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
}

const member_nameList = ref<string[]>([]);
const member_name_options = ref<string[]>([]);
const loading = ref(false);
function getNameList() {
	memberApi
		.getMemberList({ params: {} })
		.then((res) => {
			const { payload } = res;
			for (let i = 0; i < payload.length; i++) {
				member_nameList.value.push(payload[i].member_name);
			}
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
}
function getCardNumber() {
	orderApi
		.getCardNumber()
		.then((res) => {
			const { max_card_number } = res.payload;
			for (let i = 1; i < 6 - max_card_number.toString().length; i++) {
				form.card_number += '0';
			}
			form.card_number += max_card_number + 1;
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
}

let cardList = reactive<any[]>([]);
function getCardList() {
	cardApi
		.getCardList()
		.then((res) => {
			const { payload } = res;
			for (let i = 0; i < payload.length; i++) {
				cardList.push(payload[i]);
			}
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
}

onMounted(() => {
	getNameList();
	getCardNumber();
	getCardList();
});
const remoteMethod = (query: string) => {
	if (query) {
		loading.value = true;
		setTimeout(() => {
			loading.value = false;
			member_name_options.value = member_nameList.value.filter((item) => {
				return item.includes(query);
			});
		}, 200);
	} else {
		member_name_options.value = [];
	}
};
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
