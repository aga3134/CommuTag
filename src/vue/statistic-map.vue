<template lang="html">
	<div class="statistic-map">
		<div class="map" ref="map"></div>
		<q-page-sticky class="z-top" position="bottom-left" :offset="[18, 18]">
			<q-btn flat round class="bg-primary text-white" size="md" icon="insert_chart" :disable="dataset == null || imageArr.length==0" @click="OpenFilterPanel();">
				<q-tooltip content-class="bg-primary">資料篩選</q-tooltip>
			</q-btn>
		</q-page-sticky>

		<q-dialog v-model="openFilterPanel">
			 <q-card class="full-width q-px-md">
        		<q-card-section class="column">
        			<image-info-filter ref="imageInfoFilter" :initFilter="curFilter" @update="UpdateFilterResult();"></image-info-filter>
				</q-card-section>

				<q-card-actions align="center">
					<q-btn flat label="確定" @click="openFilterPanel = false;"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import imageInfoFilter from "./image-info-filter.vue"

export default {
	name:"statistic-map",
	props: {
		
	},
	components:{
		"image-info-filter": imageInfoFilter
	},
	data: function () {
		return {
			map: null,
			openFilterPanel: false,
			markerGroup: null,
			dataset: null,
			imageArr: [],
			filterArr: [],
			curFilter:null,
			rangeMarker: null
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
		SetGraphData: function(dataset,imageArr){
			this.dataset = dataset;
			this.imageArr = imageArr;
			this.filterArr = imageArr;
			Vue.nextTick(function(){
				this.UpdateMap();
			}.bind(this));
		},
		OpenFilterPanel: function(){
			this.openFilterPanel = true;
			Vue.nextTick(function(){
				this.$refs.imageInfoFilter.SetData(this.dataset,this.imageArr);
			}.bind(this));
		},
		UpdateFilterResult: function(){
			var filter = this.$refs.imageInfoFilter;
			this.curFilter = filter.filter;
			this.filterArr = filter.filterArr;
			this.UpdateMap();
		},
		UpdateMap: function(){
			this.ClearMarker();
			var filterArr = this.filterArr;
			for(var i=0;i<filterArr.length;i++){
				var d = filterArr[i];
				if(!d.lat || !d.lng) continue;
				var tagInfo = "<div class='tag'>";
				if(!d.annotation){
					tagInfo += "未標註";
				}
				else{
					switch(this.dataset.annotationType){
						case "image":
							var tagArr = d.annotation.annotation;
							for(var j=0;j<tagArr.length;j++){
								var tag = tagArr[j];
								if(tag.value == "true"){
									tagInfo += "#"+tag.name+" ";
								}
							}
							break;
						case "bbox":
							var bboxArr = d.annotation.annotation;
							var info = {};
							for(var j=0;j<bboxArr.length;j++){
								var tag = bboxArr[j].tag;
								if(!info[tag]) info[tag] = 1;
								else info[tag]++;
							}
							tagInfo += Object.keys(info).map(function(key){
								return key+":"+info[key];
							}).join("<br>");
							break;
					}
				}
				tagInfo += "</div>";
				if(d.remark) tagInfo +="<div class='remark'>"+d.remark+"</div>"
				
				var content = "";
				content += "<a href='/image?dataset="+this.dataset._id+"&image="+d._id+"' target='_blank'>";
				content += "<img src='"+d.url+"' class='popup-image' />";
				content += "</a>";
				content += "<div class='popup-info'>"+tagInfo+"</div>";

				var link = "/image?dataset="+this.dataset._id+"&image="+d._id;
				content += "<div class='popup-bt' onclick=\"window.open('"+link+"','_blank');\">前往影像</div>";

				var tz = spacetime().name;
				var t = spacetime(d.dataTime).goto(tz);
				t = t.subtract(t.minute()%10, "minute");
				switch(this.dataset.externalLink){
					case "riverlog":
						var link="https://riverlog.lass-net.org/";
						link += "#year="+t.year();
						link += "&date="+t.unixFmt("MM-dd");
						link += "&time="+t.unixFmt("HH:mm");
						link += "&lat="+d.lat;
						link += "&lng="+d.lng;
						link += "&zoom=12";
						content += "<div class='popup-bt' onclick=\"window.open('"+link+"','_blank');\">前往山河事件簿</div>";
						break;
					case "purbao":
						var link="https://purbao.lass-net.org/";
						link += "?year="+t.year();
						link += "&date="+t.unixFmt("M/d");
						link += "&lat="+d.lat;
						link += "&lng="+d.lng;
						link += "&zoom=12";
						content += "<div class='popup-bt'  onclick=\"window.open('"+link+"','_blank');\">前往紫豹在哪裡</div>";
						break;
				}

				var marker = L.marker({lat:d.lat,lng:d.lng}).bindPopup(content);
				this.markerGroup.addLayer(marker);
			}

			//draw range marker if has range limit
			if(this.curFilter){
				var loc = this.curFilter.loc;
				if(loc.enable && loc.lat && loc.lng && loc.range){
					this.rangeMarker = L.circle(loc,{
						weight: 1,
						fillOpacity: 0,
						color: "#ff0000",
						dashArray: "10, 10",
						radius: loc.range*1000,
					});
					this.rangeMarker.addTo(this.map);
				}
			}
		},
		ClearMarker: function(){
			this.markerGroup.clearLayers();
			if(this.rangeMarker){
				this.map.removeLayer(this.rangeMarker);
				this.rangeMarker = null;
			}
		},
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
	.popup-image{
		display: block;
		width: 150px;
		object-fit: contain;
		border-radius: 3px;
	}
	.popup-info{
		margin: 5px 0px;
		.tag{
			font-size: 1.1em;
			padding: 5px 0px;
		}
		.remark{
			white-space:pre-line;
			word-wrap: break-word;
		}
	}
	.popup-bt{
		display: inline-block;
		margin: 5px;
		padding: 5px 10px;
		background-color: #555555;
		color: #ffffff;
		border-radius: 3px;
		cursor: pointer;
	}
}
</style>