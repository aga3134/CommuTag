<template lang="html">
	<q-layout view="lHh lpr lFf" container class="dataset-view bg-grey-1 shadow-2">
		<q-header>
			<topbar :user="user"></topbar>
		</q-header>

		<q-page-container>
			<div class="q-pa-md" v-if="info">
				<div class="text-h4 q-ma-sm">
					{{info.name}}
					<q-badge class="q-ma-xs" v-for="badge in badgeArr" outline color="primary" :label="badge" :key="badge"></q-badge>
				</div>

				<q-chip icon="image">影像數: {{info.picNum}}</q-chip>
				<q-chip icon="aspect_ratio">標註數: {{info.annotationNum}}</q-chip>
				<q-chip icon="turned_in_not">標籤: {{info.tagArr.join(", ")}}</q-chip>
			</div>

			<div class="row q-px-md q-gutter-sm">
				<q-select dense class="col-1" v-model="filterKey" :options="viewFilter" option-value="value" option-label="label" emit-value map-options label="篩選" @input="FilterData();"></q-select>
				<q-btn v-if="info && info.enableUpload" icon="add_photo_alternate" label="新增照片" flat @click="openUploader = true;"></q-btn>
				<q-btn v-if="info && info.enableDownload && user" icon="cloud_download" label="整包下載" flat @click="OpenBatchDownload();"></q-btn>
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
								<div v-if="image.verifyFinish" class="absolute-bottom">
									驗證完成
								</div>
								<div v-else-if="image.annotation" class="absolute-bottom">
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
						<q-btn v-if="user && user.authType=='admin' " flat label="編輯資訊" @click="openInfoEdit = true;"></q-btn>
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

			<q-dialog v-model="openBatchDownload">
				<q-card class="full-width">
					<q-card-section>
						<div class="text-h6 text-center">整包下載</div>
						
						<div class="row items-center">
							<div class="col-shrink text-subtitle2">影像篩選</div>
							<q-select class="col q-pa-sm" dense v-model="downloadOption.filter" :options="downloadFilter" option-value="value" option-label="label" emit-value map-options></q-select>
						</div>
						<div class="row items-center">
							<div class="col-shrink text-subtitle2">下載格式</div>
							<q-select class="col q-pa-sm" dense v-model="downloadOption.format" :options="downloadFormat" option-value="value" option-label="label" emit-value map-options></q-select>
						</div>
						
					</q-card-section>
					<q-card-actions align="center">
						<q-btn flat label="下載" @click="BatchDownload();"></q-btn>
						<q-btn flat label="取消" v-close-popup></q-btn>
					</q-card-actions>
				</q-card>
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

			<q-dialog v-model="openInfoEdit" v-if="targetImage">
				<image-info ref="imageInfo" :dataset="info" :initDataTime="targetImage.dataTime" :initLat="targetImage.lat" :initLng="targetImage.lng" :initRemark="targetImage.remark" @confirm="UpdateImageInfo();" @cancel="openInfoEdit=false;"></image-info>
			</q-dialog>

			<q-dialog v-model="openLocationView" v-if="targetImage && targetImage.lat && targetImage.lng">

				<q-card class="full-width q-pa-sm">
					<div class="text-h6">資料地點</div>
					<location-select mode="view" ref="locationSelect"></location-select>
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
import locationSelect from "./location-select.vue"
import imageInfo from "./image-info.vue"

export default {
	name:"dataset-view",
	components:{
		"topbar":topbar,
		"uploader":uploader,
		"annotator":annotator,
		"annotator-view":annotatorView,
		"dataset-editor":datasetEditor,
		"location-select": locationSelect,
		"image-info":imageInfo
	},
	data: function () {
		return {
			tab: "",
			user: null,
			filterKey: "all",
			viewFilter: [
				{label: "全部",value:"all"},
				{label: "已標註",value:"withTag"},
				{label: "未標註",value:"withoutTag"},
			],
			downloadFilter: [
				{label: "全部",value:"all"},
				{label: "標註完成",value:"annotateFinish"},
				{label: "驗證完成",value:"verifyFinish"},
			],
			downloadFormat: [],
			downloadOption: {
				filter: "all",
				format: ""
			},
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
			openInfoEdit: false,
			openBatchDownload: false,
			editInfo: null,
			favorite: false,
			verifyCond: null
		};
	},
	created: function(){
		var param = util.GetUrlParameter();
		this.datasetID = param.id;

		$.get("/dataset/verify-condition",function(result){
			if(result.status != "ok") return;
			this.verifyCond = result.data;
			this.CheckVerifyFinish();
		}.bind(this));

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

		this.LoadDatasetInfo();
	},
	methods: {
		LoadDatasetInfo: function(){
			$.get("/dataset/view-dataset?id="+this.datasetID, function(result){
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
			this.LoadDatasetInfo();
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
				this.CheckVerifyFinish();
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
		CheckVerifyFinish: function(){
			for(var i=0;i<this.imageArr.length;i++){
				var image = this.imageArr[i];
				if(!image.annotation){
					image.verifyFinish = false;
					continue;
				}
				if(image.verification.length < this.verifyCond.sample){
					image.verifyFinish = false;
					continue;
				}
				var agreeNum = 0;
				for(var j=0;j<image.verification.length;j++){
					var verify = image.verification[j];
					if(verify.agree == "1") agreeNum++;
				}
				var rate = agreeNum/image.verification.length;
				if(rate > this.verifyCond.accept) image.verifyFinish = true;
				else image.verifyFinish = false;
			}
		},
		ViewImage: function(image){
			this.targetImage = image;
			this.openViewImage = true;
		},
		UpdateImageInfo: function(){
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var info = this.$refs.imageInfo.GetImageInfo();
			var data = {};
			data.dataset = this.datasetID;
			data.image = this.targetImage._id;
			data.dataTime = info.dataTime;
			data.remark = info.remark;
			data.lat = info.loc.lat;
			data.lng = info.loc.lng;
			data._csrf = csrfToken;
			$.post("/dataset/update-image-info", data, function(result){
				if(result.status != "ok") return alert("更新失敗");
				this.ReloadImage();
				this.openInfoEdit = false;
				this.$q.notify("更新成功");
			}.bind(this));
		},
		ViewLocation: function(){
			this.openLocationView = true;
			Vue.nextTick(function(){
				this.$refs.locationSelect.SetPosition(this.targetImage.lat,this.targetImage.lng);
			}.bind(this));
		},
		DeleteImage: function(){
			if(confirm("確定刪除此影像?")){
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
			if(confirm("確定刪除此影像的標註?")){
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
			}
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
		},
		OpenBatchDownload: function(){
			this.openBatchDownload = true;
			this.downloadFormat = [];
			switch(this.info.annotationType){
				case "image":
					this.downloadFormat.push({label:"依標籤分資料夾",value:"folder"});
					break;
				case "bbox":
					this.downloadFormat.push({label:"VOC",value:"voc"});
					break;
			}
			this.downloadOption.format = this.downloadFormat[0].value;
		},
		BatchDownload: function(){
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.dataset = this.datasetID;
			data.filter = this.downloadOption.filter;
			data.format = this.downloadOption.format;
			data._csrf = csrfToken;
			$.post("/dataset/batch-download",data,function(result){
				if(result.status != "ok") return alert("整包下載失敗");
				var link = document.createElement('a');
		        link.href = result.data;
		        link.download="";
		        link.click();
				this.openBatchDownload = false;
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