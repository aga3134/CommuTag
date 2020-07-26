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
			<div class="row items-center">
				<div class="text-h6">地點篩選</div>
				<q-btn class="bg-grey-8 text-white q-ma-sm" label="選擇範圍" @click="OpenRangeSelect();"></q-btn>
			</div>
			<div class="row text-subtitle2 q-gutter-xs">
				<div>{{filter.loc.enable?"已啟用":"未啟用"}}</div>
				<div v-if="filter.loc.enable && filter.loc.lat && filter.loc.lng">中心點: ({{filter.loc.lat.toFixed(5)+" "+filter.loc.lng.toFixed(5)}})</div>
				<div v-if="filter.loc.enable && filter.loc.range">範圍:{{filter.loc.range+"公里"}}</div>
			</div>
			<q-separator class="q-my-sm"></q-separator>
		</div>

		<div v-if="!disableForm && dataset && dataset.form">
			<div class="text-h6">表單篩選</div>
			<div v-if="dataset.form">
				<div v-for="(item,i) in dataset.form.itemArr">
					<div class="text-subtitle2">
						<q-checkbox v-model="filter.form[item.id].use" :label="i+1+'.'+item.quest" :key="item.quest" @input="UpdateFilterResult();"></q-checkbox>
					</div>
					<div v-if="filter.form[item.id].use" class="q-mx-md">
						<div v-if="item.type == 'text' ">
							<q-input dense v-model="filter.form[item.id].value" :ref="item.id" placeholder="請輸入篩選文字" @blur="UpdateFilterResult();"></q-input>
						</div>
						<div v-if="item.type == 'radio' ">
							<q-radio v-for="(op,j) in item.option" v-model="filter.form[item.id].value" :label="op" :key="op" :val="op" @input="UpdateFilterResult();"></q-radio>
						</div>
						<div v-if="item.type == 'checkbox' ">
							<q-checkbox v-for="(op,j) in item.option" v-model="filter.form[item.id].value" :label="op" :key="op" :val="op" @input="UpdateFilterResult();"></q-checkbox>
						</div>
						<div v-if="item.type == 'number' ">
							<div class="q-mt-lg q-mx-md">
								<q-range v-model="filter.form[item.id].value" :min="filter.form[item.id].minValue" :max="filter.form[item.id].maxValue" :step="1" label-always @change="UpdateFilterResult();"></q-range>
							</div>
						</div>
					</div>
				</div>
			</div>
			<q-separator class="q-my-sm"></q-separator>
		</div>

		<div v-if="!disableRemark">
			<div class="text-h6">備註篩選</div>
			<q-input class="q-ma-sm" dense v-model="filter.remark" @blur="UpdateFilterResult();"></q-input>
			<q-separator class="q-my-sm"></q-separator>
		</div>

		<div v-if="imageArr && filterArr" class="row justify-center q-gutter-sm text-red">
			<div>原始資料 {{imageArr.length}} 筆</div>
			<div>篩選後 {{filterArr.length}} 筆</div>
		</div>

		<q-dialog v-model="openRangeSelect">
			<q-card class="full-width q-pa-sm">
				<div class="text-h6">選擇範圍</div>
				<q-toggle v-model="filter.loc.enable" left-label label="啟用範圍篩選" @input="UpdateRangeSelectMap();"></q-toggle>
				<div class="text-subtitle2">
					半徑(公里)
					<q-slider label  v-model="filter.loc.range" :min="10" :max="400" @change="UpdateRangeSelectMap();"></q-slider>
				</div>
				
				<location-select mode="selectRange" ref="locationSelect"  @change="UpdateLoc();"></location-select>
				<div v-if="$refs.locationSelect" class="text-center">{{$refs.locationSelect.status}}</div>
				<q-card-actions align="center">
					<q-btn flat label="確定" @click="openRangeSelect=false;UpdateFilterResult();"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

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
				form:{}
			},
			openRangeSelect: false,
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
				this.InitFormSelect();
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
		InitFormSelect: function(){
			if(!this.dataset.form) return;
			var initForm = {};
			for(var i=0;i<this.dataset.form.itemArr.length;i++){
				var item = this.dataset.form.itemArr[i];
				var select = {"id":item.id,"use":false};
				if(item.type == "checkbox"){
					select.value = [];
				}
				if(item.type == "number"){
					var minValue = Number.MAX_VALUE;
					var maxValue = Number.MIN_VALUE;
					for(var j=0;j<this.imageArr.length;j++){
						if(!this.imageArr[j].formReply) continue;
						var reply = this.imageArr[j].formReply[item.id];
						if(!reply) continue;
						var value = parseFloat(reply.value);
						if(value > maxValue) maxValue = value;
						if(value < minValue) minValue = value;
					}
					select.minValue = minValue;
					select.maxValue = maxValue;
				}
				initForm[item.id] = select;
			}
			this.filter.form = initForm;
		},
		ToggleTagSelectAll: function(){
			if(this.disableTag) return;
			for(var i=0;i<this.filter.tag.length;i++){
				var tagSelect = this.filter.tag[i];
				tagSelect.value = this.filter.selectAll;
			}
			this.UpdateFilterResult();
		},
		OpenRangeSelect: function(){
			this.openRangeSelect = true;
			Vue.nextTick(function(){
				this.$refs.locationSelect.range = this.filter.loc.range;
				this.UpdateRangeSelectMap();
			}.bind(this));
		},
		UpdateRangeSelectMap: function(){
			if(this.disableLocation) return;
			var locationSelect = this.$refs.locationSelect;
			if(!locationSelect) return;
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

			//filter by form reply
			if(!this.disableForm){
				filterArr = filterArr.filter(function(d){
					if(!this.dataset.form) return true;
					for(var i=0;i<this.dataset.form.itemArr.length;i++){
						var item = this.dataset.form.itemArr[i];
						var cond = this.filter.form[item.id];
						//此項目無篩選條件，繼續看下個項目
						if(!cond.use) continue;
						//若篩選條件有值但是沒回覆就篩掉
						if(!d.formReply || !d.formReply[item.id]) return false;
						var r = d.formReply[item.id].value;
						switch(item.type){
							case "text":
								if(!cond.value) continue;
								if(cond.value.indexOf(r) == -1) return false;
								break;
							case "radio":
								if(cond.value != r) return false;
								break;
							case "checkbox":
								var hasValue = false;
								for(var j=0;j<cond.value.length;j++){
									if(r.includes(cond.value[j])){
										hasValue = true;
										break;
									}
								}
								if(!hasValue) return false;
								break;
							case "number":
								if(!cond.value) continue;
								if(cond.value.min > r) return false;
								if(cond.value.max < r) return false;
								break;
						}
					}
					return true;
				}.bind(this));
			}

			//filter by remark
			if(!this.disableRemark){
				filterArr = filterArr.filter(function(d){
					if(this.filter.remark == "") return true;
					else if(!d.remark) return false;
					else return d.remark.indexOf(this.filter.remark) != -1;
				}.bind(this));
			}
			//console.log(filterArr);
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