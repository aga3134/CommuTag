<template lang="html">
	<q-card class="image-info full-width q-pa-sm" v-if="dataset">
		<q-card-section>
			<div class="text-h6">選擇資料時間</div>
			<input class="q-pa-sm" v-model="dataTime" type="datetime-local" @change="$emit('change');"></input>
		</q-card-section>
		<q-card-section v-if="dataset.enableGPS">
			<div class="text-h6">選擇資料地點</div>
			<location-select mode="selectLoc" ref="locationSelect"></location-select>
			<div v-if="$refs.locationSelect" class="text-center">{{$refs.locationSelect.status}}</div>
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

import locationSelect from "./location-select.vue"

export default {
	name:"image-info",
	props: {
		dataset: Object,
		initDataTime: String,
		initLat: Number,
		initLng: Number,
		initRemark: String
	},
	components:{
		"location-select": locationSelect
	},
	data: function () {
		return {
			dataTime: null,
			remark: ""
		};
	},
	mounted: function(){
		var tz = spacetime().name;	//get browser time zone
		if(this.initDataTime){
			this.dataTime = spacetime(this.initDataTime).goto(tz).unixFmt("yyyy-MM-ddTHH:mm");
		}
		else{
			this.dataTime = spacetime.now().unixFmt("yyyy-MM-ddTHH:mm");
		}
		
		if(this.initLat && this.initLng){
			this.$refs.locationSelect.SetPosition(this.initLat,this.initLng);
		}
		else if(this.dataset.enableGPS){
			this.$refs.locationSelect.GetGPS();
		}

		if(this.initRemark) this.remark = this.initRemark;
	},
	methods: {
		GetImageInfo: function(){
			var info = {};
			var s = spacetime.now();
			info.dataTime = spacetime(this.dataTime,s.timezone().name).format("iso");
			info.remark = this.remark;
			if(this.$refs.locationSelect){
				info.loc = this.$refs.locationSelect.loc;
			}
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
	height: 100%;
}
</style>