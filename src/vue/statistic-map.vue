<template lang="html">
	<div class="statistic-map">
		<div class="map" ref="map"></div>
		<q-page-sticky class="z-top" position="bottom-left" :offset="[18, 18]">
			<q-btn flat round class="bg-primary text-white" size="md" icon="insert_chart" @click="openFilterPanel = true;">
				<q-tooltip content-class="bg-primary">資料篩選</q-tooltip>
			</q-btn>
		</q-page-sticky>

		<q-dialog v-model="openFilterPanel" v-if="dataset && imageArr">
			 <q-card class="full-width q-px-md">
        		<q-card-section class="column">
        			<div class="text-h6 text-center">資料篩選</div>
        			<div class="row items-center">
						<div class="col-shrink text-subtitle2 q-ma-md">標籤</div>
						<q-checkbox v-model="selectAll" label="全選" @input="ToggleTagSelectAll();"></q-checkbox>
						<q-checkbox v-for="tag in locFilter.tagSelect" v-model="tag.value" :label="tag.name" :key="tag.name" @input="UpdateMap();"></q-checkbox>
					</div>
        			
        			<div class="row items-center q-mt-lg">
						<div class="col-shrink text-subtitle2 q-mx-md">時間</div>
						<q-range class="col" v-model="locFilter.time" :min="dataTime.rangeMin" :max="dataTime.rangeMax" :step="1" :left-label-value="minTimeLabel" :right-label-value="maxTimeLabel" label-always @change="UpdateMap();"></q-range>
					</div>

					<div class="row items-center">
						<div class="col-shrink text-subtitle2 q-ma-md">備註</div>
						<q-input class="col q-ma-sm" dense v-model="locFilter.keyword" @input="UpdateMap();"></q-input>
					</div>
				</q-card-section>

				<q-card-actions align="center">
					<q-btn flat label="確定" @click="openFilterPanel = false;"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>

export default {
	name:"statistic-map",
	props: {
		
	},
	components:{
		
	},
	data: function () {
		return {
			dataset: null,
			imageArr: [],
			openFilterPanel: false,
			markerGroup: null,
			selectAll: true,
			dataTime:{
				min:null,
				max:null,
				rangeMin:0,
				rangeMax:0
			},
			locFilter:{
				tagSelect:[],
				time: {min:null,max:null},
				keyword: ""
			}
		};
	},
	created: function(){
		Vue.nextTick(function(){
			this.InitMap();
		}.bind(this));
	},
	methods: {
		InitMap: function(){
			this.map = L.map(this.$refs.map).setView([23.682094, 120.7764642], 7);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
				maxZoom: 18,
			}).addTo(this.map);

			this.markerGroup = L.markerClusterGroup();
			this.map.addLayer(this.markerGroup);
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
			if(this.dataTime.min && this.dataTime.max){
				this.dataTime.rangeMin = 0;
				this.dataTime.rangeMax = this.dataTime.min.diff(this.dataTime.max, "day")+1;
				this.locFilter.time.min = this.dataTime.rangeMin;
				this.locFilter.time.max = this.dataTime.rangeMax;
			}
		},
		InitTagSelect: function(){
			this.locFilter.tagSelect = [];
			for(var i=0;i<this.dataset.tagArr.length;i++){
				var tag = this.dataset.tagArr[i];
				this.locFilter.tagSelect.push({
					name: tag,
					value: true
				});
			}
		},
		ToggleTagSelectAll: function(){
			for(var i=0;i<this.locFilter.tagSelect.length;i++){
				var tagSelect = this.locFilter.tagSelect[i];
				tagSelect.value = this.selectAll;
			}
			this.UpdateMap();
		},
		SetGraphData: function(dataset,imageArr){
			this.dataset = dataset;
			this.imageArr = imageArr;
			this.InitTimeSelect();
			this.InitTagSelect();
			Vue.nextTick(function(){
				this.UpdateMap();
			}.bind(this));
		},
		UpdateMap: function(){
			this.ClearMarker();

			var filterArr = this.imageArr;

			//filter by tag
			var tagHash = {};
			for(var i=0;i<this.locFilter.tagSelect.length;i++){
				var tag = this.locFilter.tagSelect[i];
				tagHash[tag.name] = tag.value;
			}
			filterArr = filterArr.filter(function(d){
				if(!d.annotation) return false;
				switch(this.dataset.annotationType){
					case "image":
						var tag = d.annotation.annotation;
						if(tagHash[tag]) return true;
						break;
					case "bbox":
						var bboxArr = d.annotation.annotation;
						for(var i=0;i<bboxArr.length;i++){
							var tag = bboxArr[i].tag;
							if(tagHash[tag]) return true;
						}
						break;
				}
				return false;
			}.bind(this));

			//filter by time range
			var s = spacetime.now();
			filterArr = filterArr.filter(function(d){
				var t = spacetime(d.dataTime,s.timezone().name);
				var min = this.dataTime.min.add(this.locFilter.time.min,"day");
				var max = this.dataTime.min.add(this.locFilter.time.max,"day");
				return t.isAfter(min) && t.isBefore(max);
			}.bind(this));

			//filter by keyword
			filterArr = filterArr.filter(function(d){
				if(this.locFilter.keyword == "") return true;
				else if(!d.remark) return false;
				else return d.remark.indexOf(this.locFilter.keyword) != -1;
			}.bind(this));

			for(var i=0;i<filterArr.length;i++){
				var d = filterArr[i];
				if(!d.lat || !d.lng) continue;
				var tagInfo = "";
				switch(this.dataset.annotationType){
					case "image":
						var tag = d.annotation.annotation;
						tagInfo = tag;
						break;
					case "bbox":
						var bboxArr = d.annotation.annotation;
						var info = {};
						for(var j=0;j<bboxArr.length;j++){
							var tag = bboxArr[j].tag;
							if(!info[tag]) info[tag] = 1;
							else info[tag]++;
						}
						tagInfo = Object.keys(info).map(function(key){
							return key+":"+info[key];
						}).join("<br>");
						break;
				}
				var content = "<img src='"+d.url+"' class='popup-image' />";
				content += "<div>"+tagInfo+"</div>";
				var marker = L.marker({lat:d.lat,lng:d.lng}).bindPopup(content);
				this.markerGroup.addLayer(marker);
			}
		},
		ClearMarker: function(){
			this.markerGroup.clearLayers();
		}
	},
	computed:{
		minTimeLabel: function(){
			var day = this.dataTime.min.add(this.locFilter.time.min,"day");
			return day.unixFmt("yyyy-MM-dd");
		},
		maxTimeLabel: function(){
			var day = this.dataTime.min.add(this.locFilter.time.max,"day");
			return day.unixFmt("yyyy-MM-dd");
		}
	}
}
</script>

<style lang="scss">
.statistic-map{
	width: 100%;
	height: 100%;
	position: relative;
	.map{
		width: 100%;
		height: 100%;
	}
	.option-panel{
		width: 100%;
		padding: 20px;
		background-color: rgba(100,100,100,0.8);
		color: white;
		overflow: auto;
	}
	.popup-image{
		width: 150px;
		object-fit: contain;
	}
}
</style>