<template lang="html">
	<div class="location-select">
		<div class="text-h6">選擇地點</div>
		<div class="map" ref="map"></div>
		<div class="text-center">{{status}}</div>
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
			loc: null,
			status:"",
			OnGPSReady: null,
			map: null,
			marker: null
		};
	},
	mounted: function(){
		this.InitMap();
		this.GetGPS();
	},
	methods: {
		InitMap: function(){
			this.map = L.map(this.$refs.map).setView([23.682094, 120.7764642], 7);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
				maxZoom: 18,
			}).addTo(this.map);

			this.map.on('click', function(event){
				var pos = event.latlng;
				this.SetPosition(pos.lat,pos.lng);
			}.bind(this));
			
		},
		SetPosition: function(lat,lng){
			this.loc = {"lat":lat,"lng":lng};
			this.status = lat.toFixed(5)+" "+lng.toFixed(5);
			if(this.marker){
				this.marker.setLatLng(this.loc, {
					draggable: 'true'
				}).bindPopup(this.status).update();
			}
			else{
				this.marker = L.marker(this.loc,{
					draggable: 'true'
				});
				this.marker.on('dragend', function(event) {
					var pos = this.marker.getLatLng();
					this.SetPosition(pos.lat,pos.lng);
				}.bind(this));

				this.marker.addTo(this.map);
			}
			this.$emit("change");
		},
		GetGPS: function(){
			this.status = "無GPS-請點選位置";
			//取得gps權限
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
						this.SetPosition(position.coords.latitude,position.coords.longitude);
						if(this.OnGPSReady) this.OnGPSReady();
					}.bind(this), function(err){
						this.status = "讀取GPS失敗-請點選位置";
					}.bind(this));
			}
			else {
				this.status = "瀏覽器不支援GPS-請點選位置";
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