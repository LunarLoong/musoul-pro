<template>
	<div class="content-wrapper">
		<el-row :gutter="20">
			<el-col :md="12" :lg="6">
				<BasicCard total-topic="总销售额" total-value="￥ 126,560" sep-topic="日销售额" sep-value="￥ 12,423">
					<template #content>
						<div class="variation">
							<div class="increase">
								<span class="vary-text">周同比<span class="vary-num">12%</span></span>
								<span class="vary-fix inc-icon">
									<el-icon>
										<CaretTop />
									</el-icon>
								</span>
							</div>
							<div class="decrease">
								<span class="vary-text">日同比<span class="vary-num">15%</span></span>
								<span class="vary-fix dec-icon">
									<el-icon>
										<CaretBottom />
									</el-icon>
								</span>
							</div>
						</div>
					</template>
				</BasicCard>
			</el-col>
			<el-col :md="12" :lg="6">
				<BasicCard total-topic="访问量" total-value="8,846" sep-topic="日访问量" sep-value="1234">
					<template #content>
						<div id="visitChart"></div>
					</template>
				</BasicCard>
			</el-col>
			<el-col :md="12" :lg="6">
				<BasicCard total-topic="支付笔数" total-value="6,560" sep-topic="转化率" sep-value="60%">
					<template #content>
						<div id="affordChart"></div>
					</template>
				</BasicCard>
			</el-col>
			<el-col :md="12" :lg="6">
				<BasicCard total-topic="运营活动效果" total-value="78%" sep-topic="周同比增长" sep-value="12%">
					<template #content>
						<div id="runningChart"></div>
					</template>
				</BasicCard>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts" setup>
import BasicCard from '~/components/basicCard/Index.vue';
import * as echarts from 'echarts';
import { onMounted } from 'vue';

const visitChartInit = () => {
	let chartDom = document.getElementById('visitChart') as HTMLElement;
	let myChart = echarts.init(chartDom);
	let option;

	option = {
		color: ['#37A2FF'],
		grid: {
			left: '0%',
			right: '0%',
			top: '0%',
			bottom: '0%',
			containLabel: true,
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				splitLine: {
					show: false,
				},
			},
		],
		yAxis: [
			{
				type: 'value',
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
				axisLabel: {
					show: false,
				},
				splitLine: {
					show: false,
				},
			},
		],
		series: [
			{
				name: 'Line 3',
				type: 'line',
				stack: 'Total',
				smooth: true,
				lineStyle: {
					width: 0,
				},
				showSymbol: false,
				areaStyle: {
					opacity: 0.8,
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgb(55, 162, 255)',
						},
						{
							offset: 1,
							color: 'rgb(116, 21, 219)',
						},
					]),
				},
				emphasis: {
					focus: 'series',
				},
				data: [320, 132, 201, 334, 190, 130, 220],
			},
		],
	};

	option && myChart.setOption(option);
};

const affordChartInit = () => {
	let chartDom = document.getElementById('affordChart') as HTMLElement;
	let myChart = echarts.init(chartDom);
	let option;

	option = {
		grid: {
			left: '0%',
			right: '0%',
			bottom: '0%',
			top: '0%',
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: false,
			},
			splitLine: {
				show: false,
			},
		},
		yAxis: {
			type: 'value',
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: false,
			},
			splitLine: {
				show: false,
			},
		},
		series: [
			{
				data: [120, 200, 150, 80, 70, 110, 130],
				type: 'bar',
			},
		],
	};

	option && myChart.setOption(option);
};

const runningChartInit = () => {
	let chartDom = document.getElementById('runningChart') as HTMLElement;
	let myChart = echarts.init(chartDom);
	let option;

	option = {
		grid: {
			left: '0%',
			right: '0%',
			bottom: '0%',
			top: '0%',
			containLabel: true,
		},
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: false,
			},
			splitLine: {
				show: false,
			},
		},
		yAxis: {
			type: 'value',
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			axisLabel: {
				show: false,
			},
			splitLine: {
				show: false,
			},
		},
		series: [
			{
				data: [120, 200, 150, 80, 70, 110, 130],
				type: 'bar',
			},
		],
	};

	option && myChart.setOption(option);
};

onMounted(() => {
	visitChartInit();
	affordChartInit();
	runningChartInit();
});
</script>

<style lang="scss" scoped>
.content-wrapper {
	padding: 24px;
}

.variation {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	.increase {
		margin-right: 16px;
		display: inline-block;
		font-size: 14px;
		line-height: 22px;
		color: var(--ep-text-color-primary);
	}
	.decrease {
		display: inline-block;
		font-size: 14px;
		line-height: 22px;
		color: var(--ep-text-color-primary);
	}
}

.vary-text {
	.vary-num {
		margin-left: 8px;
	}
}

.vary-fix {
	position: relative;
	margin-left: 4px;
	font-size: 12px;
}

.inc-icon {
	top: 1px;
	color: var(--ep-color-danger);
}
.dec-icon {
	top: -1px;
	color: var(--ep-color-success);
}

#visitChart {
	height: 100%;
	width: 100%;
}

#affordChart {
	height: 100%;
	width: 100%;
}

#runningChart {
	height: 100%;
	width: 100%;
}
</style>
