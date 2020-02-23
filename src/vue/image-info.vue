<template lang="html">
	<q-card class="image-info full-width q-pa-sm" v-if="dataset">
		<q-card-section>
			<div class="text-h6">選擇資料時間</div>
			<input class="q-pa-sm" v-model="dataTime" type="datetime-local" @change="$emit('change');"></input>
		</q-card-section>
		<q-card-section v-if="dataset.enableGPS">
			<div class="text-h6">選擇資料地點</div>
			<div class="map" ref="map"></div>
			<div class="text-center">{{status}}</div>
		</q-card-section>
		<q-card-section>
			<div class="text-h6">資料備註說明(若無備註說明請直接按確定)</div>
			<q-input v-model="remark" filled type="textarea" @input="$emit('change');"></q-input>
		</q-card-section>
		<q-card-actions class="justify-center">
			<q-btn flat label="確定" @click="ConfirmSelect();"></q-btn>
			<q-btn flat label="取消" @click="CancelSelect();"></q-btn>
		</q-card-actions>
	</q-card>

	
</template>

<script>

export default {
	name:"image-info",
	props: {
		dataset: Object
	},
	components:{
		
	},
	data: function () {
		return {
			loc: null,
			status:"",
			OnGPSReady: null,
			map: null,
			marker: null,
			dataTime: null,
			remark: ""
		};
	},
	mounted: function(){
		this.dataTime = spacetime.now().unixFmt("yyyy-MM-ddTHH:mm");
		if(this.dataset.enableGPS){
			this.InitMap();
			this.GetGPS();
		}
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
		GetImageInfo: function(){
			var info = {};
			var s = spacetime.now();
			info.dataTime = spacetime(this.dataTime,s.timezone().name).format("iso");
			info.remark = this.remark;
			info.loc = this.loc;
			return info;
		},
		ConfirmSelect: function(){
			this.$emit("confirm");
		},
		CancelSelect: function(){
			this.$emit("cancel");
		}
	}
}
</script>

<style lang="scss">
.image-info{
	width: 100%;
	.map{
		width: 100%;
		height: 300px;
	}
}
</style>