<template lang="html">
	<div class="statistic-graph" v-if="dataset && imageArr">
		<div class="row items-center q-col-gutter-md q-pa-md">
			<div class="col-12 col-sm-6 column">
				<div class="text-h6">標註標籤比例</div>
				<div class="graph-container bg-grey-1">
					<div class="graph" ref="tagRatio"></div>
					<div class="option-panel column" v-show="openTagFilter">
						<div class="text-subtitle2 q-mb-lg">時間篩選</div>
						<q-range v-model="tagFilter.time" :min="dataTime.rangeMin" :max="dataTime.rangeMax" :step="1" :left-label-value="minTimeLabel" :right-label-value="maxTimeLabel" left-label-color="grey-8" right-label-color="grey-8" color="white" label-always @change="UpdateGraphTag();"></q-range>
						<div class="text-subtitle2">
							地點篩選
							<q-btn class="bg-grey-8 text-white q-ma-sm" label="選擇範圍" @click="OpenRangeSelect(tagFilter.location);"></q-btn>
						</div>

						<div class="text-subtitle2">備註篩選</div>
						<q-input class="q-ma-sm" dense dark color="white" v-model="tagFilter.keyword" @input="UpdateGraphTag();"></q-input>
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
					<div class="option-panel column" v-show="openTimelineFilter">
						<div class="text-subtitle2">
							顯示類型
							<q-select dense dark color="white" v-model="timelineFilter.type" :options="typeOption" option-value="value" option-label="label" emit-value map-options @input="UpdateGraphTimeline();"></q-select>
						</div>

						<div class="text-subtitle2">
							地點篩選
							<q-btn class="bg-grey-8 text-white q-ma-sm" label="選擇範圍" @click="OpenRangeSelect(timelineFilter.location);"></q-btn>
						</div>

						<div class="text-subtitle2">備註篩選</div>
						<q-input class="q-ma-sm" dense dark color="white" v-model="timelineFilter.keyword" @input="UpdateGraphTimeline();"></q-input>
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

			<q-dialog v-model="openRangeSelect" v-if="rangeTarget">
				<q-card class="full-width q-pa-sm">
					<div class="text-h6">選擇範圍</div>
					<q-toggle v-model="rangeTarget.enable" left-label label="啟用範圍篩選" @input="UpdateRangeSelectMap();"></q-toggle>
					<div class="text-subtitle2">
						半徑(公里)
						<q-slider label  v-model="rangeTarget.range" :min="10" :max="400" @change="UpdateRangeSelectMap();"></q-slider>
					</div>
					
					<location-select mode="selectRange" ref="locationSelect"  @change="UpdateLoc();"></location-select>
					<div v-if="$refs.locationSelect" class="text-center">{{$refs.locationSelect.status}}</div>
					<q-card-actions align="center">
						<q-btn flat label="確定" @click="openRangeSelect=false;UpdateGraph();"></q-btn>
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
			dataTime:{
				min:null,
				max:null,
				rangeMin:0,
				rangeMax:0
			},
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
			locationSelect.range = this.rangeTarget.range;
			if(this.rangeTarget.enable){
				if(!this.rangeTarget.lat || !this.rangeTarget.lng){
					locationSelect.GetGPS();
				}
				locationSelect.SetRange(this.rangeTarget.lat,this.rangeTarget.lng,this.rangeTarget.range);
			}
			else{
				locationSelect.RemoveMarker();
			}
			this.UpdateGraph();
		},
		UpdateLoc(){
			if(!this.rangeTarget) return;
			this.rangeTarget.enable = true;
			var loc = this.$refs.locationSelect.loc;
			this.rangeTarget.lat = loc.lat;
			this.rangeTarget.lng = loc.lng;
			this.UpdateGraph();
		},
		InitTimeSelect: function(){
			var s = spacetime.now();
			for(var i=0;i<this.imageArr.length;i++){
				var t = spacetime(this.imageArr[i].dataTime,s.timezone().name);
				if(!this.dataTime.min || this.dataTime.min.isAfter(t)){
					this.dataTime.min = t.clone().last("day");
				}
				if(!this.dataTime.max || this.dataTime.max.isBefore(t)){
					this.dataTime.max = t.clone().next("day");
				}
			}
			this.dataTime.rangeMin = 0;
			this.dataTime.rangeMax = this.dataTime.min.diff(this.dataTime.max, "day")+1;
			this.tagFilter.time.min = this.dataTime.rangeMin;
			this.tagFilter.time.max = this.dataTime.rangeMax;
		},
		SetGraphData: function(dataset,imageArr){
			this.dataset = dataset;
			this.imageArr = imageArr;
			this.InitTimeSelect();
			Vue.nextTick(function(){
				this.UpdateGraph();
			}.bind(this));
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
			var filterArr = this.imageArr;
			//filter by location range
			if(this.tagFilter.location.enable){
				filterArr = filterArr.filter(function(d){
					var loc = this.tagFilter.location;
					var range = loc.range/111;
					var latDiff = d.lat-loc.lat;
					var lngDiff = d.lng-loc.lng;
					return latDiff*latDiff+lngDiff*lngDiff<=range*range;
				}.bind(this));
			}
			
			//filter by time range
			var s = spacetime.now();
			filterArr = filterArr.filter(function(d){
				var t = spacetime(d.dataTime,s.timezone().name);
				var min = this.dataTime.min.add(this.tagFilter.time.min,"day");
				var max = this.dataTime.min.add(this.tagFilter.time.max,"day");
				return t.isAfter(min) && t.isBefore(max);
			}.bind(this));

			//filter by keyword
			filterArr = filterArr.filter(function(d){
				if(this.tagFilter.keyword == "") return true;
				else if(!d.remark) return false;
				else return d.remark.indexOf(this.tagFilter.keyword) != -1;
			}.bind(this));

			var data = {};
			switch(this.dataset.annotationType){
				case "image":
					for(var i=0;i<filterArr.length;i++){
						var d = filterArr[i];
						if(!d.annotation) continue;
						var tag = d.annotation.annotation;
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
					break;
				case "bbox":
					for(var i=0;i<filterArr.length;i++){
						var d = filterArr[i];
						if(!d.annotation) continue;
						var bboxArr = d.annotation.annotation;
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
				return a.value-b.value;
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
			var filterArr = this.imageArr;
			//filter by location range
			if(this.timelineFilter.location.enable){
				filterArr = filterArr.filter(function(d){
					var loc = this.timelineFilter.location;
					var range = loc.range/111;
					var latDiff = d.lat-loc.lat;
					var lngDiff = d.lng-loc.lng;
					return latDiff*latDiff+lngDiff*lngDiff<=range*range;
				}.bind(this));
			}

			//filter by keyword
			filterArr = filterArr.filter(function(d){
				if(this.timelineFilter.keyword == "") return true;
				else if(!d.remark) return false;
				else return d.remark.indexOf(this.timelineFilter.keyword) != -1;
			}.bind(this));

			var s = spacetime.now();
			var data = {};
			var format = "";
			var axisX = {
				fixedrange: true,
			};
			switch(this.timelineFilter.type){
				case "time":
					format = "yyyy-MM-dd";
					axisX.tickformat = "%Y-%m-%d";
					break;
				case "hour":
					format = "HH";
					axisX.title = "小時變化";
					axisX.tickformat = ".0f";
					axisX.range = [0,24];
					break;
				case "month":
					format = "MM";
					axisX.title = "月份變化";
					axisX.tickformat = ".0f";
					axisX.range = [0,12];
					break;
			}
			switch(this.dataset.annotationType){
				case "image":
					for(var i=0;i<filterArr.length;i++){
						var d = filterArr[i];
						if(!d.annotation) continue;
						var tag = d.annotation.annotation;
						var t = spacetime(d.dataTime,s.timezone().name);
						var tStr = "";
						var tStr = t.unixFmt(format);
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
					break;
				case "bbox":
					for(var i=0;i<filterArr.length;i++){
						var d = filterArr[i];
						if(!d.annotation) continue;
						var bboxArr = d.annotation.annotation;
						var t = spacetime(d.dataTime,s.timezone().name);
						var tStr = "";
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

			var tagArr = Object.keys(data);
			if(tagArr.length == 0){
				return Plotly.purge(this.$refs.timeline);
			}

			var traceArr = [];
			for(var i=0;i<tagArr.length;i++){
				var tagData = data[tagArr[i]];
				var time = Object.keys(tagData);
				var trace = {
					x: time,
					y: time.map(function(t){
						return tagData[t].value;
					}),
					name: tagArr[i],
					type: "scatter",
					mode: "lines",
				};
				traceArr.push(trace);
			}
			var layout = {
				xaxis: axisX,
				yaxis:{
					fixedrange: true,
					title:"標籤數",
					tickformat: ".0f"
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
	},
	computed:{
		minTimeLabel: function(){
			var day = this.dataTime.min.add(this.tagFilter.time.min,"day");
			return day.unixFmt("yyyy-MM-dd");
		},
		maxTimeLabel: function(){
			var day = this.dataTime.min.add(this.tagFilter.time.max,"day");
			return day.unixFmt("yyyy-MM-dd");
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