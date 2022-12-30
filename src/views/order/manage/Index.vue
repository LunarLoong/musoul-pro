<template>
	<BasicPage heading-crumb="订单" sub-crumb="卡单管理" heading-path="/order">
		<template #heading-box>
			<el-form class="search-form" :model="options" :label-position="'right'">
				<el-form-item label="卡号">
					<el-input v-model="options.card_number" />
				</el-form-item>
				<el-form-item label="卡状态">
					<el-select v-model="options.card_available" placeholder="选择类别...">
						<el-option label="可用" value="1" />
						<el-option label="不可用" value="0" />
						<el-option label="全部" value="" />
					</el-select>
				</el-form-item>
				<el-form-item label="卡别">
					<el-select v-model="options.card_type" placeholder="选择类别...">
						<el-option v-for="item in cardList" :key="item.card_name" :label="item.card_name" :value="item.card_name"></el-option>
						<el-option label="全部卡种" value="" />
					</el-select>
				</el-form-item>
				<el-form-item label="卡时间">
					<el-date-picker
						v-model="options.card_during_time"
						type="datetimerange"
						format="YYYY-MM-DD HH:mm:ss"
						value-format="YYYY-MM-DD HH:mm:ss"
						range-separator="到"
						start-placeholder="开始时间"
						end-placeholder="结束时间"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit">查询</el-button>
				</el-form-item>
			</el-form>
		</template>
		<template #content-box>
			<el-table :key="isUpdated" :data="orderList" stripe style="width: 100%">
				<el-table-column prop="card_number" label="卡号" />
				<el-table-column prop="card_type" label="类别" />
				<el-table-column prop="card_available" label="状态" />
				<el-table-column prop="card_starting_time" label="开始时间" />
				<el-table-column prop="card_ending_time" label="结束时间" />
				<el-table-column prop="card_remain_time" label="剩余时间" />
				<el-table-column label="操作">
					<template #default="scope">
						<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-dialog v-model="dialogVisible" title="编辑会员信息">
				<template #default>
					<el-form :model="editForm">
						<el-form-item label="卡号">
							<el-input v-model="editForm.card_number" disabled />
						</el-form-item>
						<el-form-item label="类别">
							<el-select v-model="editForm.card_type" disabled></el-select>
						</el-form-item>
						<el-form-item label="状态">
							<el-select v-model="editForm.card_available" placeholder="选择类别...">
								<el-option label="可用" value="可用" />
								<el-option label="不可用" value="不可用" />
							</el-select>
						</el-form-item>
					</el-form>
				</template>
				<template #footer>
					<el-button type="primary" @click="onEdit">确认修改</el-button>
				</template>
			</el-dialog>
		</template>
	</BasicPage>
</template>

<script lang="ts" setup>
import BasicPage from '~/components/basicPage/Index.vue';
import orderApi from '~/api/modules/order';
import { onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '~/store/modules/auth';
import { ElMessage, ElMessageBox } from 'element-plus';
import cardApi from '~/api/modules/card';

let orderList = reactive([]);
let isUpdated = ref(false);
const options: any = reactive({
	card_number: '',
	card_type: '',
	card_during_time: '',
	card_available: '',
});

const authStore = useAuthStore();
function onSubmit() {
	Object.keys(options).map((item) => {
		if (options[item] == '' || options[item] == null) {
			delete options[item];
		}
	});
	orderApi
		.getOrderList({ params: options })
		.then((res) => {
			orderList = res.payload;
			isUpdated.value = !isUpdated.value;
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
}
let cardList = reactive([]);
function getCardList() {
	cardApi
		.getCardList()
		.then((res) => {
			cardList = res.payload;
			console.log(cardList);
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
}
onMounted(() => {
	orderApi
		.getOrderList({ params: {} })
		.then((res) => {
			orderList = res.payload;
			isUpdated.value = !isUpdated.value;
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
	getCardList();
});

let dialogVisible = ref(false);
const editForm: any = reactive({
	card_number: '',
	card_type: '',
	card_available: '',
});
let editId = ref('');
function onEdit() {
	Object.keys(editForm).map((item) => {
		if (editForm[item] == '' || editForm[item] == null) {
			delete editForm[item];
		}
	});
	orderApi
		.editOrder({ params: editForm, order_id: editId.value })
		.then(() => {
			ElMessage.success('修改成功');
			dialogVisible.value = false;
			isUpdated.value = !isUpdated.value;
			setTimeout(() => {
				location.reload();
			}, 1000);
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
}
function handleEdit(index: any, row: any) {
	dialogVisible.value = true;
	editId.value = row.order_id;
	editForm.card_number = row.card_number;
	editForm.card_type = row.card_type;
	editForm.card_available = row.card_available;
}
function handleDelete(index: any, row: any) {
	ElMessageBox.confirm(`确认删除订单：${row.card_number}?`, 'Warning', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	}).then(() => {
		orderApi.deleteOrder({ params: { order_id: row.order_id } }).then(() => {
			ElMessage.success('删除成功');
			isUpdated.value = !isUpdated.value;
			setTimeout(() => {
				location.reload();
			}, 1000);
		});
	});
}
</script>

<style lang="scss">
.search-form {
	margin-top: 24px;
	.ep-form-item {
		.ep-input {
			width: 200px;
		}
	}
}
</style>
