<template>
	<BasicPage heading-crumb="入场卡" sub-crumb="卡片管理" heading-path="/card">
		<template #content-box>
			<div class="content-wrapper">
				<el-row v-for="i in Math.ceil(cardList.length / 3)" :key="i" :gutter="20" style="margin-bottom: 24px">
					<el-col v-for="j in getArray(i)" :key="j" :span="8">
						<el-card class="box-card">
							<template #header>
								<div class="card-header">
									<span>{{ cardList[j].card_name }}</span>
									<div>
										<el-button size="small" type="primary" text @click="handleEdit(cardList[j].card_name, cardList[j].card_duration)">编辑</el-button>
										<el-button size="small" type="warning" text @click="handleDelete(cardList[j].card_name)">删除</el-button>
									</div>
								</div>
							</template>
							<div>持续时间： {{ cardList[j].card_duration }}天</div>
						</el-card>
					</el-col>
				</el-row>
				<el-dialog v-model="dialogVisible" title="编辑卡信息">
					<template #default>
						<el-form :model="form">
							<el-form-item label="卡名">
								<el-input v-model="form.card_name" />
							</el-form-item>
							<el-form-item label="持续时间">
								<el-input v-model="form.card_duration" />
							</el-form-item>
						</el-form>
					</template>
					<template #footer>
						<el-button type="primary" @click="onEdit">确认修改</el-button>
					</template>
				</el-dialog>
			</div>
		</template>
	</BasicPage>
</template>

<script lang="ts" setup>
import BasicPage from '~/components/basicPage/Index.vue';
import cardApi from '~/api/modules/card';
import { onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '~/store/modules/auth';
import { ElMessage, ElMessageBox } from 'element-plus';

const getArray = (i: number) => {
	let arr = [];
	for (let o = (i - 1) * 3; o < (i - 1) * 3 + 3 && o < cardList.length; o++) {
		arr.push(o);
	}
	return arr;
};
let card_name_before = '';

const handleEdit = (card_name: string, card_duration: string) => {
	dialogVisible.value = true;
	console.log(card_duration);
	card_name_before = card_name;
	form.card_name = card_name;
	form.card_duration = card_duration;
};
const handleDelete = (card_name: string) => {
	ElMessageBox.confirm(`确认删除卡片：${card_name}?`, 'Warning', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			cardApi
				.deleteCard({ params: { card_name: card_name } })
				.then(() => {
					ElMessage.success('删除成功');
					setTimeout(() => {
						location.reload();
					}, 1000);
				})
				.catch(() => {
					authStore.handleUnauthorized();
				});
		})
		.catch(() => {
			ElMessage.info('取消删除');
		});
};

let dialogVisible = ref(false);
const form = reactive({
	card_name: '',
	card_duration: '',
});

const onEdit = () => {
	cardApi
		.editCard({ params: form, card_name_before: card_name_before })
		.then(() => {
			ElMessage.success('修改成功');
			dialogVisible.value = false;
			setTimeout(() => {
				location.reload();
			}, 1000);
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
};

let cardList = reactive<any[]>([]);
const authStore = useAuthStore();
const getCardList = () => {
	cardApi
		.getCardList()
		.then((res) => {
			const { payload } = res;
			for (let i = 0; i < payload.length; i++) {
				cardList.push(payload[i]);
			}
			console.log(cardList);
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
};

onMounted(() => {
	getCardList();
});
</script>

<style lang="scss" scoped>
.content-wrapper {
	padding: 32px 64px;
	.box-card {
		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
}
</style>
