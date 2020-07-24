<template lang="html">
	<div class="statistic-graph" v-if="dataset && imageArr">
		<div class="row items-center q-col-gutter-md q-pa-md">
			<div class="col-12 col-sm-6 column">
				<div class="text-h6">標註標籤比例</div>
				<div class="graph-container bg-grey-1">
					<div class="graph" ref="tagRatio"></div>
					<div class="option-panel column" v-show="tagFilter.open">
						<image-info-filter ref="tagFilter" :initFilter="tagFilter.filter" disableTag @update="UpdateTagFilterResult();"></image-info-filter>

						<q-space></q-space>
						<div class="row justify-center">
							<q-btn class="bg-grey-8" label="確定" @click="tagFilter.open = false;"></q-btn>
						</div>
					</div>
				</div>
				<q-btn dense class="bg-grey-6 text-white q-my-sm" label="篩選" @click="tagFilter.open = true;"></q-btn>
			</div>

			<div class="col-12 col-sm-6 column">
				<div class="text-h6">資料時間分佈</div>
				<div class="graph-container bg-grey-1">
					<div class="graph" ref="timeline"></div>
					<div class="option-panel column" v-show="timelineFilter.open">
						<div class="text-subtitle2">
							顯示類型
							<q-select dense dark color="white" v-model="timelineFilter.type" :options="typeOption" option-value="value" option-label="label" emit-value map-options @input="UpdateGraphTimeline();"></q-select>
						</div>

						<image-info-filter ref="timelineFilter" :initFilter="timelineFilter.filter" disableTag @update="UpdateTimelineFilterResult();"></image-info-filter>

						<q-space></q-space>
						<div class="row justify-center">
							<q-btn class="bg-grey-8" label="確定" @click="timelineFilter.open = false;"></q-btn>
						</div>
					</div>
				</div>
				<q-btn dense class="bg-grey-6 text-white q-my-sm" label="篩選" @click="timelineFilter.open = true;"></q-btn>
			</div>
			
			<div class="col-12 col-sm-6">
				<div class="text-h6">驗證認同率分佈</div>
				<div class="graph-container bg-grey-1">
					<div class="graph" ref="agreeRate"></div>
				</div>
			</div>
			<div class="col-12 col-sm-6">
				<div class="text-h6">上傳排行榜</div>
				<div class="graph-container bg-grey-1">
					<div class="graph" ref="uploadRank"></div>
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

		</div>
	</div>
</template>

<script>

import util from "../js/util.js"
import imageInfoFilter from "./image-info-filter.vue"

export default {
	name:"statistic-graph",
	props: {
		
	},
	components:{
		"image-info-filter": imageInfoFilter
	},
	data: function () {
		return {
			dataset: null,
			imageArr: [],
			tagFilter:{
				arr: [],
				open: false,
				filter: null
			},
			timelineFilter:{
				type: "time",
				arr: [],
				open: false,
				filter: null
			},
			typeOption:[
				{label:"時間分佈",value:"time"},
				{label:"小時變化",value:"hour"},
				{label:"月份變化",value:"month"},
			],
		};
	},
	mounted: function(){
		
	},
	methods: {
		SetGraphData: function(dataset,imageArr){
			this.dataset = dataset;
			this.imageArr = imageArr;
			this.tagFilter.arr = imageArr;
			this.timelineFilter.arr = imageArr;
			Vue.nextTick(function(){
				this.UpdateGraph();
			}.bind(this));
		},
		UpdateTagFilterResult: function(){
			var ref = this.$refs.tagFilter;
			this.tagFilter.filter = ref.filter;
			this.tagFilter.arr = ref.filterArr;
			this.UpdateGraphTag();
		},
		UpdateTimelineFilterResult: function(){
			var ref = this.$refs.timelineFilter;
			this.timelineFilter.filter = Object.assign({"type":this.timelineFilter.type}, ref.filter);
			this.timelineFilter.arr = ref.filterArr;
			this.UpdateGraphTimeline();
		},
		UpdateGraph: function(){
			this.UpdateGraphTag();
			this.UpdateGraphTimeline();
			this.UpdateGraphUploadRank();
			this.UpdateGraphAgreeRate();
			this.UpdateGraphAnnotateRank();
			this.UpdateGraphVerifyRank();
		},
		UpdateGraphTag: function(){
			var filterArr = this.tagFilter.arr;
			var data = {};
			switch(this.dataset.annotationType){
				case "image":
					for(var i=0;i<filterArr.length;i++){
						var d = filterArr[i];
						var tagArr = [];
						if(!d.annotation) tagArr = ["未標註"];
						else{
							for(var j=0;j<d.annotation.annotation.length;j++){
								 var tag = d.annotation.annotation[j];
								 if(tag.value == "true") tagArr.push(tag.name);
							}
						}
						for(var j=0;j<tagArr.length;j++){
							var tag = tagArr[j];
							if(!data[tag]){
								data[tag] = {
									name: tag,
									value: 1
								}
							}
							else{
								data[tag].value++;
							}
						}
					}
					break;
				case "bbox":
					for(var i=0;i<filterArr.length;i++){
						var d = filterArr[i];
						var bboxArr = [];
						if(!d.annotation) bboxArr = [{tag:"未標註"}];
						else bboxArr = d.annotation.annotation;
						for(var j=0;j<bboxArr.length;j++){
							var tag = bboxArr[j].tag;
							if(!data[tag]){
								data[tag] = {
									name: tag,
									value: 1
								}
							}
							else{
								data[tag].value++;
							}
						}
					}
					break;
			}

			var tagArr = Object.keys(data).sort(function(a,b){
				return data[a].value-data[b].value;
			});
			if(tagArr.length == 0){
				return Plotly.purge(this.$refs.tagRatio);
			}

			var trace = {
				values: tagArr.map(function(d){
					return data[d].value;
				}),
				labels: tagArr,
				type: "pie"
			};

			var layout = {
				paper_bgcolor: 'rgba(250,250,250,1)',
				plot_bgcolor: 'rgba(250,250,250,1)',
				margin: {l:40, r:40, b:40, t:40},
			};

			Plotly.newPlot(this.$refs.tagRatio,[trace],layout,{displayModeBar: false});
		},
		UpdateGraphTimeline: function(){
			var filter = this.timelineFilter;
			var filterArr = this.timelineFilter.arr;
			var tz = spacetime().name;
			var data = {};
			var format = "";
			var axisX = {
				fixedrange: true,
			};
			switch(filter.type){
				case "time":
					format = "yyyy-MM-dd";
					axisX.tickformat = "%Y-%m-%d";
					break;
				case "hour":
					format = "HH";
					axisX.title = "小時變化";
					axisX.tickformat = ".0f";
					break;
				case "month":
					format = "MM";
					axisX.title = "月份變化";
					axisX.tickformat = ".0f";
					break;
			}
			switch(this.dataset.annotationType){
				case "image":
					for(var i=0;i<filterArr.length;i++){
						var d = filterArr[i];
						var tagArr = [];
						if(!d.annotation) tagArr = ["未標註"];
						else{
							for(var j=0;j<d.annotation.annotation.length;j++){
								 var tag = d.annotation.annotation[j];
								 if(tag.value == "true") tagArr.push(tag.name);
							}
						} 
						var t = spacetime(d.dataTime).goto(tz);
						var tStr = t.unixFmt(format);
						for(var j=0;j<tagArr.length;j++){
							var tag = tagArr[j];
							if(!data[tag]) data[tag] = {};
							if(!data[tag][tStr]){
								data[tag][tStr] = {
									key: tStr,
									value:1
								}
							}
							else{
								data[tag][tStr].value++;
							}
						}
					}
					break;
				case "bbox":
					for(var i=0;i<filterArr.length;i++){
						var d = filterArr[i];
						var bboxArr = [];
						if(!d.annotation) bboxArr = [{tag:"未標註"}];
						else bboxArr = d.annotation.annotation;
						var t = spacetime(d.dataTime).goto(tz);
						var tStr = t.unixFmt(format);
							
						for(var j=0;j<bboxArr.length;j++){
							var tag = bboxArr[j].tag;
							if(!data[tag]) data[tag] = {};
							if(!data[tag][tStr]){
								data[tag][tStr] = {
									key: tStr,
									value:1
								}
							}
							else{
								data[tag][tStr].value++;
							}
						}
					}
					break;
			}

			//fill zero to timestamp with no data
			var s = spacetime.now();
			var tMin,tMax;
			for(var i=0;i<filterArr.length;i++){
				var t = spacetime(filterArr[i].dataTime,s.timezone().name);
				if(!tMin || tMin.isAfter(t)){
					tMin = t.clone().last("day");
				}
				if(!tMax || tMax.isBefore(t)){
					tMax = t.clone().next("day");
				}
			}
			
			for(var tag in data){
				switch(filter.type){
					case "time":
						var day = tMin;
						while(day.isBefore(tMax)){
							var key = day.unixFmt(format);
							if(!data[tag][key]){
								data[tag][key] = {key:key,value:0};
							}
							day = day.add(1,"day");
						}
						break;
					case "hour":
						for(var i=0;i<24;i++){
							var key = util.PadLeft(i,2);
							if(!data[tag][key]){
								data[tag][key] = {key:key,value:0};
							}
						}
						break;
					case "month":
						for(var i=1;i<=12;i++){
							var key = util.PadLeft(i,2);
							if(!data[tag][key]){
								data[tag][key] = {key:key,value:0};
							}
						}
						break;
				}
			}

			var tagArr = Object.keys(data);
			if(tagArr.length == 0){
				return Plotly.purge(this.$refs.timeline);
			}

			var traceArr = [];
			for(var i=0;i<tagArr.length;i++){
				var tagData = data[tagArr[i]];
				var time = Object.keys(tagData).sort(function(a,b){
					if(a<b) return -1;
					else if(a>b) return 1;
					else return 0;
				});
				var trace = {
					x: time,
					y: time.map(function(t){
						return tagData[t].value;
					}),
					name: tagArr[i],
					type: "scatter",
				};
				traceArr.push(trace);
			}
			var layout = {
				hovermode:"closest",
				xaxis: axisX,
				yaxis:{
					fixedrange: true,
					title:"標籤數",
				},
				paper_bgcolor: 'rgba(250,250,250,1)',
				plot_bgcolor: 'rgba(250,250,250,1)',
				margin: {l:60, r:40, b:60, t:40},
			};

			Plotly.newPlot(this.$refs.timeline,traceArr,layout,{displayModeBar: false});
		},
		UpdateGraphAgreeRate: function(){
			var data = [];
			for(var i=0;i<=1;i+=0.1){
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
					tickformat: '%',
					fixedrange: true,
					title:"認同率"
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
		UpdateGraphUploadRank: function(){
			var data = {};
			for(var i=0;i<this.imageArr.length;i++){
				var image = this.imageArr[i];
				if(!image.uploader || image.uploadFrom != "user") continue;
				if(!data[image.uploader]){
					data[image.uploader] = {
						value: 1
					}
				}
				else{
					data[image.uploader].value++;
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
				Plotly.newPlot(this.$refs.uploadRank,[trace],layout,{displayModeBar: false});
			}.bind(this));
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
		.option-panel{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0px;
			left: 0px;
			padding: 20px;
			background-color: rgba(100,100,100,0.8);
			color: white;
			overflow: auto;
		}
	}
}
</style>