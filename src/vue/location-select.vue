<template lang="html">
	<div class="location-select">
		<div class="map" ref="map"></div>
	</div>
</template>

<script>

export default {
	name:"location-select",
	props: {
		mode: String,
	},
	components:{
		
	},
	data: function () {
		return {
			loc: null,
			status:"",
			OnGPSReady: null,
			map: null,
			locMarker: null,
			rangeMarker: null,
			range: 10
		};
	},
	mounted: function(){
		this.InitMap();
	},
	methods: {
		InitMap: function(){
			this.map = L.map(this.$refs.map).setView([23.682094, 120.7764642], 7);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
				maxZoom: 18,
			}).addTo(this.map);

			switch(this.mode){
				case "selectLoc":
					this.map.on('click', function(event){
						var pos = event.latlng;
						this.SetPosition(pos.lat,pos.lng);
					}.bind(this));
					break;
				case "selectRange":
					this.map.on('click', function(event){
						var pos = event.latlng;
						this.SetRange(pos.lat,pos.lng,this.range);
					}.bind(this));
					break;
			}
			
		},
		SetPosition: function(lat,lng){
			if(!lat || !lng) return;
			this.loc = {"lat":lat,"lng":lng};
			this.status = "座標: "+lat.toFixed(5)+" "+lng.toFixed(5);
			if(this.locMarker){
				this.locMarker.setLatLng(this.loc, {
					draggable: this.mode=="selectLoc"?true:false
				}).bindPopup(this.status).update();
			}
			else{
				this.locMarker = L.marker(this.loc,{
					draggable: this.mode=="selectLoc"?true:false
				});
				this.locMarker.on('dragend', function(event) {
					var pos = this.locMarker.getLatLng();
					this.SetPosition(pos.lat,pos.lng);
				}.bind(this));

				this.locMarker.addTo(this.map);
			}
			this.$emit("change");
		},
		SetRange: function(lat,lng,range){
			if(!lat || !lng) return;
			this.range = range;

			this.loc = {"lat":lat,"lng":lng};
			this.status = "座標: "+lat.toFixed(5)+" "+lng.toFixed(5);
			if(this.rangeMarker){
				this.rangeMarker.setLatLng(this.loc);
				this.rangeMarker.setRadius(this.range*1000);
			}
			else{
				this.rangeMarker = L.circle(this.loc,{
					weight: 1,
					color: "#ff0000",
					fillColor: "#ff3333",
					fillOpacity: 0.3,
					radius: this.range*1000,
				});
				this.rangeMarker.addTo(this.map);
			}
			if(this.locMarker){
				this.locMarker.setLatLng(this.loc, {
					draggable: this.mode=="selectRange"?true:false
				}).bindPopup(this.status).update();
			}
			else{
				this.locMarker = L.marker(this.loc,{
					draggable: this.mode=="selectRange"?true:false
				});
				this.locMarker.on('drag', function(event) {
					var pos = event.target.getLatLng();
					this.rangeMarker.setLatLng(pos);
				}.bind(this));
				this.locMarker.on('dragend', function(event) {
					var pos = this.locMarker.getLatLng();
					this.rangeMarker.setLatLng(pos);
					this.loc = {"lat":pos.lat,"lng":pos.lng};
					this.$emit("change");
				}.bind(this));

				this.locMarker.addTo(this.map);
			}
			this.$emit("change");
		},
		GetGPS: function(){
			this.status = "無GPS-請點選位置";
			//取得gps權限
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function(position){
					switch(this.mode){
						case "selectLoc":
							this.SetPosition(position.coords.latitude,position.coords.longitude);
							break;
						case "selectRange":
							this.SetRange(position.coords.latitude,position.coords.longitude,this.range);
							break;
					}
					if(this.OnGPSReady) this.OnGPSReady();
				}.bind(this), function(err){
					this.status = "讀取GPS失敗-請點選位置";
				}.bind(this));
			}
			else {
				this.status = "瀏覽器不支援GPS-請點選位置";
			}
		},
		RemoveMarker: function(){
			if(this.locMarker){
				this.map.removeLayer(this.locMarker);
				this.locMarker = null;
			}
			if(this.rangeMarker){
				this.map.removeLayer(this.rangeMarker);
				this.rangeMarker = null;
			}
		}
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