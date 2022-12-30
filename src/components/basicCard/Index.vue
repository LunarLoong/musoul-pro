<template>
	<el-card class="card-box" shadow="hover">
		<div class="card-wrapper">
			<div class="top-box">
				<div class="meta-wrapper">
					<div class="meta">
						<span>{{ props.totalTopic }}</span>
						<el-tooltip :content="props.totalTopic" placement="top">
							<template #default>
								<el-icon class="meta-action">
									<Warning />
								</el-icon>
							</template>
						</el-tooltip>
					</div>
					<div class="total">
						<span>{{ props.totalValue }}</span>
					</div>
				</div>
			</div>
			<div class="content-box">
				<slot name="content"></slot>
			</div>
			<div class="footer-box">
				<div class="field">
					<span class="label">{{ props.sepTopic }}</span>
					<span class="number">{{ props.sepValue }}</span>
				</div>
			</div>
		</div>
	</el-card>
</template>

<script lang="ts" setup>
interface Props {
	totalTopic: string;
	totalValue: string;
	sepTopic: string;
	sepValue: string;
}

const props = withDefaults(defineProps<Props>(), {
	totalTopic: () => 'totalTopic',
	totalValue: () => 'totalValue',
	sepTopic: () => 'sepTopic',
	sepValue: () => 'sepValue',
});
</script>

<style lang="scss" scoped>
.card-box {
	--ep-card-padding: 20px 24px 8px;
	margin-bottom: 20px;
	.card-wrapper {
		position: relative;
		.top-box {
			position: relative;
			width: 100%;
			overflow: hidden;
			.meta-wrapper {
				float: left;
				.meta {
					height: 22px;
					line-height: 22px;
					font-size: 14px;
					color: var(--ep-text-color-secondary);
				}
				.total {
					height: 38px;
					margin-top: 4px;
					margin-bottom: 0;
					overflow: hidden;
					color: var(--ep-text-color-primary);
					font-size: 30px;
					line-height: 38px;
					white-space: nowrap;
					text-overflow: ellipsis;
					word-break: break-all;
				}
			}
		}
		.content-box {
			width: 100%;
			height: 46px;
			position: relative;
		}
		.footer-box {
			margin-top: 8px;
			padding-top: 9px;
			border-top: 1px solid var(--ep-border-color-lighter);
			.field {
				margin: 0;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color: var(--ep-text-color-regular);
				span {
					font-size: 14px;
					line-height: 22px;
				}
			}
			.number {
				margin-left: 8px;
			}
		}
	}
}

.meta-action {
	position: absolute;
	top: 4px;
	right: 0;
	line-height: 1;
}
</style>
