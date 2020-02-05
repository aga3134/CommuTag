<template lang="html">
	<div class="location-select">
		<div class="text-h6">選擇地點</div>
		<div class="map" ref="map"></div>
	</div>
</template>

<script>

export default {
	name:"location-select",
	props: {
		
	},
	components:{
		
	},
	data: function () {
		return {
			gpsStatus: "無GPS",
			curGPS: null,
			OnGPSReady: null,
		};
	},
	mounted: function(){
		this.InitMap();
		this.GetGPS();
	},
	methods: {
		InitMap: function(){
			var map = L.map(this.$refs.map).setView([23.682094, 120.7764642], 7);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
				maxZoom: 18,
			}).addTo(map);
			var marker = L.marker([23.682094, 120.7764642]);
			marker.addTo(map);
		},
		GetGPS: function(){
			this.gpsStatus = "無GPS";
			//取得gps權限
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
						this.curGPS = position.coords;
						this.gpsStatus = "ok";
						if(this.OnGPSReady) this.OnGPSReady();
					}.bind(this), function(err){
						this.gpsStatus = "讀取GPS失敗";
					}.bind(this));
			}
			else {
				this.gpsStatus = "瀏覽器不支援GPS";
			}
		},
	}
}
</script>

<style lang="scss">
.location-select{
	width: 100%;
	.map{
		width: 100%;
		height: 300px;
	}
}
</style>