<template>
	<BasicPage heading-crumb="会员" sub-crumb="会籍管理" heading-path="/member">
		<template #heading-box>
			<el-form class="search-form" :model="options" :label-position="'right'">
				<el-form-item label="姓名">
					<el-input v-model="options.member_name" />
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="options.member_gender">
						<el-radio label="男">男</el-radio>
						<el-radio label="女">女</el-radio>
						<el-radio label="">全部</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="options.member_phone" />
				</el-form-item>
				<el-form-item label="会员类别">
					<el-select v-model="options.membership" placeholder="选择类别...">
						<el-option label="活跃会员" value="活跃会员" />
						<el-option label="潜在会员" value="潜在会员" />
						<el-option label="全部会员" value="" />
					</el-select>
				</el-form-item>
				<el-form-item label="卡号">
					<el-input v-model="options.card_number" />
				</el-form-item>
				<el-form-item label="卡类别">
					<el-select v-model="options.card_type" placeholder="选择卡种...">
						<el-option v-for="item in cardList" :key="item.card_name" :label="item.card_name" :value="item.card_name"></el-option>
						<el-option label="全部卡种" value="" />
					</el-select>
				</el-form-item>
				<el-form-item label="创建时间">
					<el-date-picker
						v-model="options.create_time"
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
			<el-table :key="isUpdated" :data="memberList" stripe style="width: 100%">
				<el-table-column prop="member_name" label="姓名" />
				<el-table-column prop="member_gender" label="性别" />
				<el-table-column prop="member_phone" label="手机号" />
				<el-table-column prop="membership" label="会员类别" />
				<el-table-column prop="card_number" label="已绑卡号" />
				<el-table-column prop="card_type" label="卡种" />
				<el-table-column prop="create_time" label="入会时间" />
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
						<el-form-item label="姓名">
							<el-input v-model="editForm.member_name" />
						</el-form-item>
						<el-form-item label="性别">
							<el-radio-group v-model="editForm.member_gender">
								<el-radio label="男">男</el-radio>
								<el-radio label="女">女</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="手机号">
							<el-input v-model="editForm.member_phone" />
						</el-form-item>
						<el-form-item label="会员类别">
							<el-select v-model="editForm.membership" placeholder="选择类别...">
								<el-option label="活跃会员" value="活跃会员" />
								<el-option label="潜在会员" value="潜在会员" />
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
import memberApi from '~/api/modules/member';
import cardApi from '~/api/modules/card';
import { onMounted, reactive, ref } from 'vue';
import { useAuthStore } from '~/store/modules/auth';
import { ElMessage, ElMessageBox } from 'element-plus';

let memberList = reactive([]);
let isUpdated = ref(false);
const options: any = reactive({
	member_name: '',
	member_gender: '',
	member_phone: '',
	membership: '',
	card_number: '',
	card_type: '',
	create_time: '',
});

const authStore = useAuthStore();
function onSubmit() {
	Object.keys(options).map((item) => {
		if (options[item] == '' || options[item] == null) {
			delete options[item];
		}
	});
	memberApi
		.getMemberList({ params: options })
		.then((res) => {
			memberList = res.payload;
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
	memberApi
		.getMemberList({ params: {} })
		.then((res) => {
			memberList = res.payload;
			isUpdated.value = !isUpdated.value;
		})
		.catch(() => {
			authStore.handleUnauthorized();
		});
	getCardList();
});

let dialogVisible = ref(false);
const editForm: any = reactive({
	member_name: '',
	member_gender: '',
	member_phone: '',
	membership: '',
	card_number: '',
	card_type: '',
});
let editId = ref('');
function onEdit() {
	Object.keys(editForm).map((item) => {
		if (editForm[item] == '' || editForm[item] == null) {
			delete editForm[item];
		}
	});
	memberApi
		.editMember({ params: editForm, member_id: editId.value })
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
	editId.value = row.member_id;
	editForm.member_name = row.member_name;
	editForm.member_gender = row.member_gender;
	editForm.member_phone = row.member_phone;
	editForm.membership = row.membership;
	editForm.card_number = row.card_number;
	editForm.card_type = row.card_type;
}
function handleDelete(index: any, row: any) {
	ElMessageBox.confirm(`确认删除会员：${row.member_name}?`, 'Warning', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			memberApi
				.deleteMember({ params: { member_id: row.member_id } })
				.then(() => {
					ElMessage.success('删除成功');
					isUpdated.value = !isUpdated.value;
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
