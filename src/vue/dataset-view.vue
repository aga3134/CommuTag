<template lang="html">
	<q-layout view="lHh lpr lFf" container class="dataset-view bg-grey-1 shadow-2">
		<q-header>
			<topbar :user="user"></topbar>
		</q-header>

		<q-page-container>
			<div class="q-pa-md" v-if="info">
				<div class="text-h4">
					{{info.name}}
					<q-badge class="q-ma-xs" v-for="badge in badgeArr" outline color="primary" :label="badge" :key="badge"></q-badge>
				</div>
			</div>

			<div class="row q-px-md q-gutter-sm">
				<q-select dense class="col-1" v-model="filterKey" :options="filterOption" option-value="value" option-label="label" emit-value map-options label="篩選" @input="FilterData();"></q-select>
				<q-btn icon="add_photo_alternate" label="新增照片" flat @click="openUploader = true;"></q-btn>
				<q-btn icon="cloud_download" label="整包下載" flat></q-btn>
				<q-btn icon="star_border" label="追蹤" flat></q-btn>
			</div>

			
			<q-infinite-scroll @load="LoadMoreImage" ref="imageScroll">
				<div class="row q-pa-md q-col-gutter-md">
					<div class="col-12 col-sm-6 col-md-3 q-pa-sm" v-for="(image,i) in filterArr" :key="i" transition="scale">
						<q-card class="bg-grey-7 text-white" @click="ViewImage(image);">
							<q-img :src="image.url" :ratio="16/9"></q-img>
						</q-card>
					</div>

				</div>
				<template v-slot:loading>
					<div class="row justify-center q-my-md">
						<q-spinner-dots color="primary" size="40px" />
					</div>
				</template>
			</q-infinite-scroll>

			<q-dialog v-model="openViewImage" v-if="targetImage">
				<q-card class="full-width">
					<q-card-section>
						<q-img :src="targetImage.url"></q-img>
					</q-card-section>
					<q-card-section>
						<q-breadcrumbs separator=" " class="text-black" active-color="black">
							<q-breadcrumbs-el :label="targetImage.time" icon="access_time"></q-breadcrumbs-el>
							<q-breadcrumbs-el :label="targetImage.lat+' '+targetImage.lng " icon="room"></q-breadcrumbs-el>
						</q-breadcrumbs>
					</q-card-section>
					<q-card-actions>
						<q-btn label="刪除影像" @click="DeleteImage();"></q-btn>
					</q-card-actions>
				</q-card>
			</q-dialog>

			<q-page-sticky position="bottom-left" :offset="[18, 18]">
				<q-btn round class="bg-teal text-white" icon="add_photo_alternate">
					<q-tooltip content-class="bg-grey-8" @click="openUploader = true">拍照上傳</q-tooltip>
				</q-btn>
			</q-page-sticky>

			<q-dialog maximized v-model="openUploader">
				<uploader :dataset="info" @uploaded="ReloadImage();"></uploader>
				<div>
					<q-btn round class="bg-teal text-white q-ma-md absolute-top-right" icon="close" v-close-popup></q-btn>
				</div>
			</q-dialog>
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
import uploader from "./uploader.vue"

export default {
	name:"dataset-view",
	components:{
		"topbar":topbar,
		"uploader":uploader
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
			datasetID: null,
			info: null,
			badgeArr: [],
			imageArr: [],
			filterArr: [],
			targetImage: null,
			openViewImage: false,
			hasMore: true,
			openUploader: false
		};
	},
	created: function(){
		var param = util.GetUrlParameter();
		this.datasetID = param.id;

		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));

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
		}.bind(this));
	},
	methods: {
		GoHome: function(){
			window.location.href="/";
		},
		ReloadImage: function(){
			this.imageArr = [];
			this.$refs.imageScroll.reset();
			this.$refs.imageScroll.resume();
			this.targetImage = null;
			this.openUploader = false;
			this.openViewImage = false;
		},
		LoadMoreImage: function(index,done){
			var url = "/dataset/list-image";
			url += "?dataset="+this.datasetID;
			url += "&page="+(index-1);
			$.get(url,function(result){
				if(result.status != "ok") return;
				this.hasMore = result.data.hasMore;
				if(!this.hasMore){
					this.$refs.imageScroll.stop();
				}
				var tz = spacetime().name;	//get browser time zone
				for(var i=0;i<result.data.images.length;i++){
					var image = result.data.images[i];
					var t = spacetime(image.createdAt).goto(tz);
					image.time = t.unixFmt("yyyy-MM-dd HH:mm:ss");
					image.url = "/static/upload/dataset/"+this.datasetID+"/image/"+image._id+".jpg";
					this.imageArr.push(image);
				}
				this.FilterData();
				done();
			}.bind(this));
		},
		FilterData: function(){
			this.filterArr = [];
			switch(this.filterKey){
				case "all":
					this.filterArr = this.imageArr;
					break;
				case "withTag":
					for(var i=0;i<this.imageArr.length;i++){
						if(this.imageArr[i].tag){
							this.filterArr.push(this.imageArr[i]);
						}
					}
					break;
				case "withoutTag":
					for(var i=0;i<this.imageArr.length;i++){
						if(!this.imageArr[i].tag){
							this.filterArr.push(this.imageArr[i]);
						}
					}
					break;
			}
			
		},
		ViewImage: function(image){
			this.targetImage = image;
			this.openViewImage = true;
		},
		DeleteImage: function(){
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.dataset = this.datasetID;
			data.image = this.targetImage._id;
			$.post("/dataset/delete-image", {data: data, _csrf: csrfToken}, function(result){
				if(result.status != "ok") return alert("刪除失敗");
				this.ReloadImage();
				this.$q.notify("刪除成功");
			}.bind(this));
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