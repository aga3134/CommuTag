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
				<q-btn v-if="info && info.enableUpload" icon="add_photo_alternate" label="新增照片" flat @click="openUploader = true;"></q-btn>
				<q-btn v-if="info && info.enableDownload" icon="cloud_download" label="整包下載" flat></q-btn>
				<q-btn v-if="favorite" icon="star" label="取消收藏" flat @click="RemoveFavorite()"></q-btn>
				<q-btn v-else icon="star_border" label="收藏" flat @click="AddFavorite()"></q-btn>
				<q-btn icon="bar_chart" label="資料統計" flat @click="GoToStatistic();"></q-btn>
				<q-btn v-if="user && user.authType =='admin' " icon="edit" label="修改" flat @click="ModifyDataset();"></q-btn>
			</div>

			
			<q-infinite-scroll @load="LoadMoreImage" ref="imageScroll">
				<div class="row q-pa-md q-col-gutter-md">
					<div class="col-12 col-sm-6 col-md-3 q-pa-sm cursor-pointer" v-for="(image,i) in filterArr" :key="i" transition="scale">
						<q-card class="bg-grey-7 text-white" @click="ViewImage(image);">
							<q-img :src="image.url" :ratio="16/9">
								<div v-if="image.annotation" class="absolute-bottom">
									已標註
								</div>
							</q-img>
						</q-card>
					</div>

				</div>
				<template v-slot:loading>
					<div class="row justify-center q-my-md">
						<q-spinner-dots color="primary" size="40px" />
					</div>
				</template>
			</q-infinite-scroll>

			<div class="row justify-center q-ma-xl" v-if="filterArr.length == 0">
				<div class="text-h5">無資料</div>
			</div>

			<q-dialog v-model="openViewImage" v-if="targetImage">
				<q-card class="full-width">
					<div style="height: 400px;">
						<annotator-view :dataset="info" :image="targetImage"></annotator-view>
					</div>
					<q-card-section>
						<q-chip class="transparent" dense v-if="targetImage.time" icon="access_time">{{targetImage.time}}</q-chip>
						<q-chip class="transparent" dense clickable v-if="targetImage.lat && targetImage.lng" icon="room" @click="ViewLocation();">觀看地點</q-chip>
						<q-chip class="transparent" dense v-if="targetImage.annotation">{{'認同數 / 驗證數 : '+AgreeVerifyRatio}}</q-chip>
						<pre class="q-mx-sm q-my-none" v-if="targetImage.remark && targetImage.remark != '' ">{{targetImage.remark}}</pre>
					</q-card-section>

					<q-card-actions>
						<q-btn v-if="info && info.enableAnnotation" flat :label="targetImage.annotation?'協助驗證':'協助標註' " @click="AnnotateImage();"></q-btn>
						<q-btn flat label="下載影像" @click="DownloadImage();"></q-btn>
						<q-btn v-if="user && user.authType=='admin' && targetImage.annotation " flat label="刪除標註" @click="DeleteAnnotation();"></q-btn>
						<q-btn v-if="user && user.authType=='admin' " flat label="刪除影像" @click="DeleteImage();"></q-btn>
					</q-card-actions>
				</q-card>
			</q-dialog>

			<q-page-sticky position="bottom-left" :offset="[18, 18]" v-if="info && info.enableUpload">
				<q-btn round class="bg-teal text-white" icon="add_photo_alternate" @click="openUploader = true;">
					<q-tooltip content-class="bg-grey-8" @click="openUploader = true">拍照上傳</q-tooltip>
				</q-btn>
			</q-page-sticky>

			<q-dialog maximized v-model="openUploader">
				<uploader :user="user" :dataset="info" @uploaded="ReloadImage();"></uploader>
				<div>
					<q-btn round class="bg-teal text-white q-ma-md absolute-top-right" icon="close" v-close-popup></q-btn>
				</div>
			</q-dialog>

			<q-dialog maximized persistent v-model="openAnnotator" v-if="info">
				<annotator :user="user" :dataset="info" :image="targetImage" @done="FinishAnnotation();" @skip="openAnnotator = false;"></annotator>
				<div>
					<q-btn round class="bg-teal text-white q-ma-md absolute-top-right" icon="close" v-close-popup></q-btn>
				</div>
			</q-dialog>

			<q-dialog v-model="openDatasetEditor">
				<dataset-editor :info="editInfo" @reload="ReloadDataset"></dataset-editor>
			</q-dialog>

			<q-dialog v-model="openLocationView" v-if="targetImage && targetImage.lat && targetImage.lng">
				<q-card class="full-width q-pa-sm">
					<div class="text-h6">資料地點</div>
					<div class="map" style="height: 300px;" ref="map"></div>
					<div class="text-center">座標: {{targetImage.lat.toFixed(5)+" "+targetImage.lng.toFixed(5)}}</div>
					<q-card-actions align="center">
						<q-btn flat label="確定" v-close-popup></q-btn>
					</q-card-actions>
				</q-card>
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
import annotator from "./annotator.vue"
import annotatorView from "./annotator-view.vue"
import datasetEditor from "./dataset-editor.vue"

export default {
	name:"dataset-view",
	components:{
		"topbar":topbar,
		"uploader":uploader,
		"annotator":annotator,
		"annotator-view":annotatorView,
		"dataset-editor":datasetEditor
	},
	data: function () {
		return {
			tab: "",
			user: null,
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
			openUploader: false,
			openAnnotator: false,
			openDatasetEditor: false,
			openLocationView: false,
			editInfo: null,
			favorite: false
		};
	},
	created: function(){
		var param = util.GetUrlParameter();
		this.datasetID = param.id;

		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));

		$.get("/favorite/list-my-favorite?dataset="+this.datasetID, function(result){
			if(result.status != "ok") return;
			if(result.data.length > 0){
				this.favorite = true;
			}
		}.bind(this));

		$.get("/dataset/view-dataset?id="+param.id, function(result){
			if(result.status != "ok") return window.location.href="/?message="+encodeURIComponent("無法顯示資料集");;
			this.info = result.data;

			this.badgeArr = [];
			if(!this.info.isPublic) this.badgeArr.push("不公開");
			if(this.info.enableGPS) this.badgeArr.push("GPS");
			if(!this.info.enableAnnotation){
				this.badgeArr.push("暫停標註");
			}
			else{
				switch(this.info.annotationType){
					case "bbox":
						this.badgeArr.push("框選標註");
						break;
					case "image":
						this.badgeArr.push("整張標註");
						break;
				}
			}
			
		}.bind(this));
	},
	methods: {
		ModifyDataset: function(){
			this.openDatasetEditor = true;
			this.editInfo = Object.assign({}, this.info);
		},
		ReloadDataset: function(){
			window.location.reload();
		},
		GoHome: function(){
			window.location.href="/";
		},
		GoToStatistic: function(){
			window.location.href="/statistic?id="+this.datasetID;
		},
		ReloadImage: function(){
			this.imageArr = [];
			this.$refs.imageScroll.reset();
			this.$refs.imageScroll.resume();
			this.targetImage = null;
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
					if(image.dataTime){
						var t = spacetime(image.dataTime).goto(tz);
						image.time = t.unixFmt("yyyy-MM-dd HH:mm:ss");
					}
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
						if(this.imageArr[i].annotation){
							this.filterArr.push(this.imageArr[i]);
						}
					}
					break;
				case "withoutTag":
					for(var i=0;i<this.imageArr.length;i++){
						if(!this.imageArr[i].annotation){
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
		ViewLocation: function(){
			this.openLocationView = true;
			Vue.nextTick(function(){
				var map = L.map(this.$refs.map).setView([23.682094, 120.7764642], 7);
				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
					maxZoom: 18,
				}).addTo(map);
				var loc = {"lat":this.targetImage.lat,"lng":this.targetImage.lng};
				var marker = L.marker(loc);
				marker.addTo(map);
			}.bind(this));
			
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
		},
		DownloadImage: function(){
			if(!this.targetImage) return;
			var a = $("<a>")
				.attr("href", this.targetImage.url)
				.attr("download", this.targetImage._id+".jpg")
				.appendTo("body");
			a[0].click();
			a.remove();
		},
		AnnotateImage: function(){
			this.openAnnotator = true;
		},
		FinishAnnotation: function(){
			this.openAnnotator = false;
			this.openViewImage = false;
			this.ReloadImage();
		},
		DeleteAnnotation: function(){
			this.openViewImage = false;
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.dataset = this.datasetID;
			data.image = this.targetImage._id;
			data._csrf = csrfToken;
			$.post("/dataset/set-annotation",data,function(result){
				if(result.status != "ok") return alert("刪除標註失敗");
				this.$q.notify("刪除標註成功");
				this.ReloadImage();
			}.bind(this));
		},
		AddFavorite: function(){
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.dataset = this.datasetID;
			data._csrf = csrfToken;
			$.post("/favorite/add-favorite",data,function(result){
				if(result.status != "ok") return alert("收藏失敗");
				this.favorite = true;
				this.$q.notify("收藏成功");
			}.bind(this));
		},
		RemoveFavorite: function(){
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.dataset = this.datasetID;
			data._csrf = csrfToken;
			$.post("/favorite/remove-favorite",data,function(result){
				if(result.status != "ok") return alert("取消收藏失敗");
				this.favorite = false;
				this.$q.notify("取消收藏成功");
			}.bind(this));
		}
	},
	computed: {
		AgreeVerifyRatio: function(){
			var str = this.targetImage.agreeNum+' / '+this.targetImage.verifyNum;
			if(this.targetImage.verifyNum > 0){
				str +=' ('+(100*this.targetImage.agreeNum/this.targetImage.verifyNum).toFixed(0)+'%)';
			}
			return str;
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