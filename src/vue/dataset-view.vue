<template lang="html">
	<q-layout view="lHh lpr lFf" container class="dataset-view bg-grey-1 shadow-2">
		<q-header>
			<topbar :user="user"></topbar>
		</q-header>

		<q-page-container>
			<div class="q-pa-md">
				<div class="text-h4">
					{{info.name}}
					<q-badge class="q-ma-xs" v-for="badge in badgeArr" outline color="primary" :label="badge" :key="badge"></q-badge>
				</div>
			</div>

			<div class="row q-px-md q-gutter-sm">
				<q-select dense class="col-1" v-model="filterKey" :options="filterOption" option-value="value" option-label="label" emit-value map-options label="篩選" @input="FilterData();"></q-select>
				<q-btn icon="add_photo_alternate" label="新增照片" flat></q-btn>
				<q-btn icon="cloud_download" label="整包下載" flat></q-btn>
				<q-btn icon="star_border" label="追蹤" flat></q-btn>
			</div>

			
			<q-infinite-scroll @load="LoadMoreImage">
				<div class="row q-pa-md q-col-gutter-md">
					<div class="col-12 col-sm-6 col-md-3 q-pa-sm" v-for="(data,i) in filterArr" :key="i" transition="scale">
						<q-card>
							<q-card class="bg-grey-7 text-white">
								<q-img :src="data.image || '/static/image/logo-16-9.png' " :ratio="16/9"></q-img>
								
								<q-separator dark></q-separator>
								
								<q-card-section>
									<q-breadcrumbs separator=" " class="text-white" active-color="white">
										<q-breadcrumbs-el :label="data.time" icon="access_time"></q-breadcrumbs-el>
										<q-breadcrumbs-el :label="data.lat+' '+data.lng " icon="room"></q-breadcrumbs-el>
									</q-breadcrumbs>
								</q-card-section>
							</q-card>
						</q-card>
					</div>

				</div>
				<template v-slot:loading>
					<div class="row justify-center q-my-md">
						<q-spinner-dots color="primary" size="40px" />
					</div>
				</template>
			</q-infinite-scroll>

			<q-page-sticky position="bottom-left" :offset="[18, 18]">
				<q-btn round class="bg-teal text-white" icon="add_photo_alternate">
					<q-tooltip content-class="bg-grey-8">拍照上傳</q-tooltip>
				</q-btn>
			</q-page-sticky>
		</q-page-container>

		<q-footer>
			<q-btn class="full-width bg-grey-8" icon="home" label="回首頁" @click="GoHome();"></q-btn>
		</q-footer>

	</q-layout>
</template>

<script>
import util from "../js/util.js"
import "../scss/main.scss"
import topbar from "./topbar.vue"

export default {
	name:"dataset-view",
	components:{
		"topbar":topbar,
	},
	data: function () {
		return {
			tab: "",
			user: {},
			filterKey: "all",
			filterOption: [
				{label: "全部",value:"all"},
				{label: "已標註",value:"withTag"},
				{label: "未標註",value:"withoutTag"},
			],
			info: {},
			badgeArr: [],
			dataArr: [],
			filterArr: []
		};
	},
	created: function(){
		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));

		var param = util.GetUrlParameter();
		$.get("/dataset/view-dataset?id="+param.id, function(result){
			if(result.status != "ok") return;
			this.info = result.data;
			this.badgeArr = [];
			if(this.info.enableGPS) this.badgeArr.push("GPS");
			switch(this.info.annotationType){
				case "bbox":
					this.badgeArr.push("框選標註");
					break;
				case "image":
					this.badgeArr.push("整張標註");
					break;
			}
			console.log(this.info);
		}.bind(this));
	},
	methods: {
		GoHome: function(){
			window.location.href="/";
		},
		LoadMoreImage: function(index,done){
			if(index > 3) return done();
			for(var i=0;i<30;i++){
				this.dataArr.push({image:"/static/image/logo-16-9.png",tag:true,time:"2020/01/27 08:00:00",lat:23.5,lng:121.5});
			}
			this.FilterData();
			done();
		},
		FilterData: function(){
			this.filterArr = [];
			switch(this.filterKey){
				case "all":
					this.filterArr = this.dataArr;
					break;
				case "withTag":
					for(var i=0;i<this.dataArr.length;i++){
						if(this.dataArr[i].tag){
							this.filterArr.push(this.dataArr[i]);
						}
					}
					break;
				case "withoutTag":
					for(var i=0;i<this.dataArr.length;i++){
						if(!this.dataArr[i].tag){
							this.filterArr.push(this.dataArr[i]);
						}
					}
					break;
			}
			
		}
	}
}
</script>

<style lang="scss">

.dataset-view{
	width: 100%;
	height: 100%;
}
</style>