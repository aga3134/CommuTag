<template lang="html">
	<div class="image-info-filter q-pa-sm">
		<div v-if="!disableTag">
			<div class="text-h6">標籤篩選</div>
			<div class="row items-center">
				<q-checkbox class="text-bold" v-model="filter.selectAll" label="全選" @input="ToggleTagSelectAll();"></q-checkbox>
				<q-checkbox v-for="tag in filter.tag" v-model="tag.value" :label="tag.name" :key="tag.name" @input="UpdateFilterResult();"></q-checkbox>
			</div>
			<q-separator class="q-my-sm"></q-separator>
		</div>
		<div v-if="!disableTime">
			<div class="text-h6 q-mb-lg">時間篩選</div>
			<div class="q-px-md">
				<q-range v-model="filter.time" :min="filter.timeLimit.rangeMin" :max="filter.timeLimit.rangeMax" :step="1" :left-label-value="minTimeLabel" :right-label-value="maxTimeLabel" left-label-color="grey-8" right-label-color="grey-8" label-always @change="UpdateFilterResult();"></q-range>
			</div>
			<q-separator class="q-my-sm"></q-separator>
		</div>
		<div v-if="!disableLocation">
			<div class="text-h6">地點篩選</div>
			<q-toggle v-model="filter.loc.enable" left-label label="啟用範圍篩選" @input="UpdateRangeSelectMap();"></q-toggle>
			<div class="text-subtitle2">
				半徑(公里)
				<q-slider label  v-model="filter.loc.range" :min="10" :max="400" @change="UpdateRangeSelectMap();"></q-slider>
			</div>
			
			<location-select mode="selectRange" ref="locationSelect"  @change="UpdateLoc();"></location-select>
			<div v-if="$refs.locationSelect" class="text-center">{{$refs.locationSelect.status}}</div>
			<q-separator class="q-my-sm"></q-separator>
		</div>

		<div v-if="!disableRemark">
			<div class="text-h6">備註篩選</div>
			<q-input class="q-ma-sm" dense v-model="filter.remark" @input="UpdateFilterResult();"></q-input>
			<q-separator class="q-my-sm"></q-separator>
		</div>

	</div>
</template>

<script>
import locationSelect from "./location-select.vue"

export default {
	name:"image-info-filter",
	props: {
		disableTag: Boolean,
		disableTime: Boolean,
		disableLocation: Boolean,
		disableRemark: Boolean,
		disableForm: Boolean,
		initFilter: Object
	},
	components:{
		"location-select": locationSelect
	},
	data: function () {
		return {
			dataset: null,
			imageArr: null,
			filter: {
				selectAll: true,
				tag:[],
				time:{min:null,max:null},
				loc:{
					enable: false,
					lat: null,
					lng: null,
					range: 50
				},
				remark:"",
				timeLimit:{
					min:null,
					max:null,
					rangeMin:0,
					rangeMax:0
				},
			},
			rangeTarget: null,
			filterArr: []
		};
	},
	mounted: function(){
		if(this.initFilter){
			this.filter = Object.assign({}, this.initFilter);
		}
		Vue.nextTick(function(){
			this.UpdateRangeSelectMap();
		}.bind(this));
	},
	methods: {
		SetData: function(dataset,imageArr){
			this.dataset = dataset;
			this.imageArr = imageArr;
			if(!this.initFilter){
				this.InitTimeSelect();
				this.InitTagSelect();
			}
			Vue.nextTick(function(){
				this.UpdateFilterResult();
			}.bind(this));
		},
		InitTimeSelect: function(){
			if(this.disableTime) return;
			var s = spacetime.now();
			for(var i=0;i<this.imageArr.length;i++){
				var t = spacetime(this.imageArr[i].dataTime,s.timezone().name);
				if(!this.filter.timeLimit.min || this.filter.timeLimit.min.isAfter(t)){
					this.filter.timeLimit.min = t.clone().last("day");
				}
				if(!this.filter.timeLimit.max || this.filter.timeLimit.max.isBefore(t)){
					this.filter.timeLimit.max = t.clone().next("day");
				}
			}
			if(this.filter.timeLimit.min && this.filter.timeLimit.max){
				this.filter.timeLimit.rangeMin = 0;
				this.filter.timeLimit.rangeMax = this.filter.timeLimit.min.diff(this.filter.timeLimit.max, "day")+1;
				this.filter.time.min = this.filter.timeLimit.rangeMin;
				this.filter.time.max = this.filter.timeLimit.rangeMax;
			}
		},
		InitTagSelect: function(){
			if(this.disableTag) return;
			if(!this.dataset) return;
			this.filter.tag = [];
			this.filter.tag.push({
				name: "未標註",
				value: true
			});
			for(var i=0;i<this.dataset.tagArr.length;i++){
				var tag = this.dataset.tagArr[i];
				this.filter.tag.push({
					name: tag,
					value: true
				});
			}
		},
		ToggleTagSelectAll: function(){
			if(this.disableTag) return;
			for(var i=0;i<this.filter.tag.length;i++){
				var tagSelect = this.filter.tag[i];
				tagSelect.value = this.filter.selectAll;
			}
			this.UpdateFilterResult();
		},
		UpdateRangeSelectMap: function(){
			if(this.disableLocation) return;
			var locationSelect = this.$refs.locationSelect;
			locationSelect.range = this.filter.loc.range;
			if(this.filter.loc.enable){
				if(!this.filter.loc.lat || !this.filter.loc.lng){
					locationSelect.GetGPS();
				}
				locationSelect.SetRange(this.filter.loc.lat,this.filter.loc.lng,this.filter.loc.range);
			}
			else{
				locationSelect.RemoveMarker();
			}
			this.UpdateFilterResult();
		},
		UpdateLoc(){
			if(this.disableLocation) return;
			this.filter.loc.enable = true;
			var loc = this.$refs.locationSelect.loc;
			this.filter.loc.lat = loc.lat;
			this.filter.loc.lng = loc.lng;
			this.UpdateFilterResult();
		},
		UpdateFilterResult: function(){
			if(!this.imageArr) return;
			var filterArr = this.imageArr;

			//filter by tag
			if(!this.disableTag){
				var tagHash = {};
				for(var i=0;i<this.filter.tag.length;i++){
					var tag = this.filter.tag[i];
					tagHash[tag.name] = tag.value;
				}
				filterArr = filterArr.filter(function(d){
					if(!d.annotation){
						return tagHash["未標註"];
					}
					switch(this.dataset.annotationType){
						case "image":
							var tagArr = d.annotation.annotation;
							for(var i=0;i<tagArr.length;i++){
								var tag = tagArr[i];
								if(tagHash[tag.name] && tag.value == "true") return true;
							}
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
			}
			
			//filter by time range
			if(!this.disableTime){
				var s = spacetime.now();
				filterArr = filterArr.filter(function(d){
					var t = spacetime(d.dataTime,s.timezone().name);
					var min = this.filter.timeLimit.min.add(this.filter.time.min,"day");
					var max = this.filter.timeLimit.min.add(this.filter.time.max,"day");
					return t.isAfter(min) && t.isBefore(max);
				}.bind(this));
			}

			//filter by location range
			if(!this.disableLocation){
				if(this.filter.loc.enable){
					filterArr = filterArr.filter(function(d){
						var loc = this.filter.loc;
						var range = loc.range/111;
						var latDiff = d.lat-loc.lat;
						var lngDiff = d.lng-loc.lng;
						return latDiff*latDiff+lngDiff*lngDiff<=range*range;
					}.bind(this));
				}
			}

			//filter by remark
			if(!this.disableRemark){
				filterArr = filterArr.filter(function(d){
					if(this.filter.remark == "") return true;
					else if(!d.remark) return false;
					else return d.remark.indexOf(this.filter.remark) != -1;
				}.bind(this));
			}
			this.filterArr = filterArr;
			this.$emit("update");
		}
	},
	computed:{
		minTimeLabel: function(){
			if(this.disableTime) return "";
			if(!this.filter.timeLimit.min) return "";
			var day = this.filter.timeLimit.min.add(this.filter.time.min,"day");
			return day.unixFmt("yyyy-MM-dd");
		},
		maxTimeLabel: function(){
			if(this.disableTime) return "";
			if(!this.filter.timeLimit.min) return "";
			var day = this.filter.timeLimit.min.add(this.filter.time.max,"day");
			return day.unixFmt("yyyy-MM-dd");
		}
	}
}
</script>

<style lang="scss">
.image-info-filter{
	width: 100%;
}
</style>