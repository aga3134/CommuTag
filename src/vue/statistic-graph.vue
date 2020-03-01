<template lang="html">
	<div class="statistic-graph" v-if="dataset && imageArr">
		<div class="row items-center q-col-gutter-md q-pa-md">

			<div class="col-12 col-sm-6 column">
				<div class="text-h6">標註標籤比例</div>
				<div class="graph-container bg-grey-1">
					<div class="graph" ref="tagRatio"></div>
					<div class="option-filter column" v-show="openTagFilter">
						<div class="text-subtitle2">時間篩選</div>
						<q-range v-model="tagFilter.time" :min="0" :max="50" color="white"></q-range>
						<div class="text-subtitle2">
							地點篩選
							<q-btn class="bg-grey-8 text-white q-ma-sm" label="選擇範圍" @click="OpenRangeSelect(tagFilter.location);"></q-btn>
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
					<div class="graph" ref="timeline"></div>
					<div class="option-filter column" v-show="openTimelineFilter">
						<div class="text-subtitle2">
							顯示類型
							<q-select dense dark color="white" v-model="timelineFilter.type" :options="typeOption" option-value="value" option-label="label" emit-value map-options></q-select>
						</div>

						<div class="text-subtitle2">
							地點篩選
							<q-btn class="bg-grey-8 text-white q-ma-sm" label="選擇範圍" @click="OpenRangeSelect(timelineFilter.location);"></q-btn>
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
				<div class="graph-container bg-grey-1">
					<div class="graph" ref="agreeRate"></div>
				</div>
			</div>
			<div class="col-12 col-sm-6">
				<div class="text-h6">標註排行榜</div>
				<div class="graph-container bg-grey-1">
					<div class="graph" ref="annotateRank"></div>
				</div>
			</div>
			<div class="col-12 col-sm-6">
				<div class="text-h6">驗證排行榜</div>
				<div class="graph-container bg-grey-1">
					<div class="graph" ref="verifyRank"></div>
				</div>
			</div>

			<q-dialog v-model="openRangeSelect" v-if="rangeTarget">
				<q-card class="full-width q-pa-sm">
					<div class="text-h6">選擇範圍</div>
					<q-toggle v-model="rangeTarget.enable" left-label label="啟用範圍篩選" @input="UpdateRangeSelectMap();"></q-toggle>
					<div class="text-subtitle2">
						半徑(公里)
						<q-slider label  v-model="rangeTarget.range" :min="10" :max="400" @input="UpdateRangeSelectMap();"></q-slider>
					</div>
					
					<location-select mode="selectRange" ref="locationSelect"  @change="UpdateLoc();"></location-select>
					<div v-if="$refs.locationSelect" class="text-center">{{$refs.locationSelect.status}}</div>
					<q-card-actions align="center">
						<q-btn flat label="確定" v-close-popup></q-btn>
					</q-card-actions>
				</q-card>
			</q-dialog>
		</div>
	</div>
</template>

<script>

import locationSelect from "./location-select.vue"

export default {
	name:"statistic-graph",
	props: {
		
	},
	components:{
		"location-select": locationSelect
	},
	data: function () {
		return {
			dataset: null,
			imageArr: [],
			openTagFilter: false,
			tagFilter: {
				location:{
					enable: false,
					lat: null,
					lng: null,
					range: 50
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
				location:{
					enable: false,
					lat: null,
					lng: null,
					range: 50
				},
				keyword: ""
			},
			openRangeSelect: false,
			rangeTarget: null
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
		},
		OpenRangeSelect: function(target){
			this.openRangeSelect = true;
			Vue.set(this,"rangeTarget",target);
			Vue.nextTick(function(){
				this.$refs.locationSelect.range = this.rangeTarget.range;
				this.UpdateRangeSelectMap();
			}.bind(this));
		},
		UpdateRangeSelectMap: function(){
			if(!this.rangeTarget) return;
			var locationSelect = this.$refs.locationSelect;
			if(this.rangeTarget.enable){
				locationSelect.range = this.rangeTarget.range;
				if(!this.rangeTarget.lat || !this.rangeTarget.lng){
					locationSelect.GetGPS();
				}
				locationSelect.SetRange(this.rangeTarget.lat,this.rangeTarget.lng,this.rangeTarget.range);
			}
			else{
				locationSelect.RemoveMarker();
			}
		},
		UpdateLoc(){
			if(!this.rangeTarget) return;
			this.rangeTarget.enable = true;
			var loc = this.$refs.locationSelect.loc;
			this.rangeTarget.lat = loc.lat;
			this.rangeTarget.lng = loc.lng;
		},
		SetGraphData: function(dataset,imageArr){
			this.dataset = dataset;
			this.imageArr = imageArr;
			Vue.nextTick(function(){
				this.UpdateGraph();
			}.bind(this));
		},
		UpdateGraph: function(){
			this.UpdateGraphTag();
			this.UpdateGraphTimeline();
			this.UpdateGraphAgreeRate();
			this.UpdateGraphAnnotateRank();
			this.UpdateGraphVerifyRank();
		},
		UpdateGraphTag: function(){

		},
		UpdateGraphTimeline: function(){

		},
		UpdateGraphAgreeRate: function(){
			var data = [];
			for(var i=0;i<=100;i+=10){
				data.push({x:i,y:0});
			}
			for(var i=0;i<this.imageArr.length;i++){
				var image = this.imageArr[i];
				if(image.verification.length > 0){
					var rate = 0.0;
					for(var j=0;j<image.verification.length;j++){
						if(image.verification[j].agree == "1"){
							rate+=1;
						}
					}
					rate = rate/image.verification.length;
					var bin = parseInt(rate*10);
					data[bin].y++;
				}
			}
			var trace = {
				type: "bar",
				x: data.map(function(d){
					return d.x;
				}),
				y: data.map(function(d){
					return d.y;
				}),
			}
			var layout = {
				xaxis:{
					fixedrange: true,
					title:"認同率(%)"
				},
				yaxis:{
					fixedrange: true,
					title:"影像數"
				},
				paper_bgcolor: 'rgba(250,250,250,1)',
				plot_bgcolor: 'rgba(250,250,250,1)',
				margin: {l:80, r:40, b:80, t:40},
			};
			Plotly.newPlot(this.$refs.agreeRate,[trace],layout,{displayModeBar: false});
		},
		UpdateGraphAnnotateRank: function(){
			var data = {};
			for(var i=0;i<this.imageArr.length;i++){
				var image = this.imageArr[i];
				if(image.annotation){
					var id = image.annotation.user;
					if(!data[id]){
						data[id] = {
							value: 1
						}
					}
					else{
						data[id].value++;
					}
					
				}
			}
			var idArr = Object.keys(data).sort(function(a,b){
				return data[a].value - data[b].value;
			}).slice(0,10);
			$.get("/user/list-name?id="+idArr.join(","), function(result){
				if(result.status != "ok") return;
				for(var i=0;i<result.data.length;i++){
					var d = result.data[i];
					data[d._id].name = d.name;
				}
				var trace = {
					type: "bar",
					x: idArr.map(function(key){
						return data[key].value;
					}),
					y: idArr.map(function(key){
						return data[key].name;
					}),
					orientation: "h"
				}
				var layout = {
					xaxis:{
						fixedrange: true,
						title:"影像數"
					},
					yaxis:{
						fixedrange: true,
						title:""
					},
					paper_bgcolor: 'rgba(250,250,250,1)',
					plot_bgcolor: 'rgba(250,250,250,1)',
					margin: {l:80, r:40, b:80, t:40},
				};
				Plotly.newPlot(this.$refs.annotateRank,[trace],layout,{displayModeBar: false});
			}.bind(this));
		},
		UpdateGraphVerifyRank: function(){
			var data = {};
			for(var i=0;i<this.imageArr.length;i++){
				var image = this.imageArr[i];
				if(image.verification.length > 0){
					for(var j=0;j<image.verification.length;j++){
						var id = image.verification[j].user;
						if(!data[id]){
							data[id] = {
								value: 1
							}
						}
						else{
							data[id].value++;
						}
					}
				}
			}
			var idArr = Object.keys(data).sort(function(a,b){
				return data[a].value - data[b].value;
			}).slice(0,10);
			$.get("/user/list-name?id="+idArr.join(","), function(result){
				if(result.status != "ok") return;
				for(var i=0;i<result.data.length;i++){
					var d = result.data[i];
					data[d._id].name = d.name;
				}
				var trace = {
					type: "bar",
					x: idArr.map(function(key){
						return data[key].value;
					}),
					y: idArr.map(function(key){
						return data[key].name;
					}),
					orientation: "h"
				}
				var layout = {
					xaxis:{
						fixedrange: true,
						title:"影像數"
					},
					yaxis:{
						fixedrange: true,
						title:""
					},
					paper_bgcolor: 'rgba(250,250,250,1)',
					plot_bgcolor: 'rgba(250,250,250,1)',
					margin: {l:80, r:40, b:80, t:40},
				};
				Plotly.newPlot(this.$refs.verifyRank,[trace],layout,{displayModeBar: false});
			}.bind(this));
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