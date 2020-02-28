<template lang="html">
	<div class="statistic-graph" v-if="info && imageArr">
		<div class="row items-center q-col-gutter-md q-pa-md">
			<div class="col-12 col-sm-6 column">
				<div class="text-h6">標註標籤比例</div>
				<div class="graph-container bg-grey-1">
					<div class="graph"></div>
					<div class="option-filter column" v-show="openTagFilter">
						<div class="text-subtitle2">時間篩選</div>
						<q-range v-model="tagFilter.time" :min="0" :max="50" color="white"></q-range>
						<div class="text-subtitle2">
							地點篩選
							<q-btn class="bg-grey-8 text-white q-ma-sm" label="選擇範圍"></q-btn>
						</div>

						<div class="text-subtitle2">備註篩選</div>
						<q-input class="q-ma-sm" dense dark color="white" v-model="tagFilter.keyword"></q-input>
						<q-space></q-space>
						<div class="row justify-center">
							<q-btn class="bg-grey-8" label="確定" @click="openTagFilter = false;"></q-btn>
						</div>
					</div>
				</div>
				<q-btn dense class="bg-grey-6 text-white q-my-sm" label="篩選" @click="OpenTagFilter();"></q-btn>
			</div>
			<div class="col-12 col-sm-6 column">
				<div class="text-h6">資料時間分佈</div>
				<div class="graph-container bg-grey-1">
					<div class="graph"></div>
					<div class="option-filter column" v-show="openTimelineFilter">
						<div class="text-subtitle2">
							顯示類型
							<q-select dense dark color="white" v-model="timelineFilter.type" :options="typeOption" option-value="value" option-label="label" emit-value map-options></q-select>
						</div>

						<div class="text-subtitle2">
							標籤篩選
							<q-btn class="bg-grey-8 text-white q-ma-sm" label="選擇標籤">
								<q-menu>
									<q-list class="q-px-sm">
										<q-item class="q-pa-none" v-for="tag in info.tagArr" :key="tag">
											<q-checkbox v-model="timelineFilter.tagSelect[tag]" :label="tag"></q-checkbox>
										</q-item>
									</q-list>
								</q-menu>
							</q-btn>
						</div>

						<div class="text-subtitle2">
							地點篩選
							<q-btn class="bg-grey-8 text-white q-ma-sm" label="選擇範圍"></q-btn>
						</div>

						<div class="text-subtitle2">備註篩選</div>
						<q-input class="q-ma-sm" dense dark color="white" v-model="timelineFilter.keyword"></q-input>
						<q-space></q-space>
						<div class="row justify-center">
							<q-btn class="bg-grey-8" label="確定" @click="openTimelineFilter = false;"></q-btn>
						</div>
					</div>
				</div>
				<q-btn dense class="bg-grey-6 text-white q-my-sm" label="篩選" @click="OpenTimelineFilter();"></q-btn>
			</div>
			<div class="col-12 col-sm-6">
				<div class="text-h6">驗證認同率分佈</div>
				<div class="graph-container bg-grey-1"></div>
			</div>
			<div class="col-12 col-sm-6">
				<div class="text-h6">標註排行榜</div>
				<div class="graph-container bg-grey-1"></div>
			</div>
			<div class="col-12 col-sm-6">
				<div class="text-h6">驗證排行榜</div>
				<div class="graph-container bg-grey-1"></div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name:"statistic-graph",
	props: {
		info: Object,
		imageArr: Array,
	},
	components:{
		
	},
	data: function () {
		return {
			openTagFilter: false,
			tagFilter: {
				location:{
					lat: null,
					lng: null,
					range: 10
				},
				time: {min:null,max:null},
				keyword: ""
			},
			openTimelineFilter: false,
			typeOption:[
				{label:"時間分佈",value:"time"},
				{label:"小時變化",value:"hour"},
				{label:"月份變化",value:"month"},
			],
			timelineFilter: {
				type: "time",
				tagSelect: {},
				location:{
					lat: null,
					lng: null,
					range: 10
				},
				keyword: ""
			},
		};
	},
	mounted: function(){
		
	},
	methods: {
		OpenTagFilter: function(){
			this.openTagFilter = true;
		},
		OpenTimelineFilter: function(){
			this.openTimelineFilter = true;
			//init checkbox if not in tag select
			for(var i=0;i<this.info.tagArr.length;i++){
				var tag = this.info.tagArr[i];
				if(!this.timelineFilter.tagSelect[tag]){
					this.$set(this.timelineFilter.tagSelect,tag,true);
				}
			}
		}
	}
}
</script>

<style lang="scss">
.statistic-graph{
	width: 100%;
	height: 100%;
	.graph-container{
		width: 100%;
		height: 350px;
		position: relative;
		.graph{
			width: 100%;
			height: 100%;
		}
		.option-filter{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0px;
			left: 0px;
			padding: 20px;
			background-color: rgba(50,50,50,0.5);
			color: white;
			overflow: auto;
		}
	}
}
</style>