<template lang="html">
	<div class="image-control" v-if="dataset && image">
		<q-card class="full-width">
			<div style="height: 400px;">
				<annotator-view :dataset="dataset" :image="image"></annotator-view>
				<div v-if="showNavigate">
					<q-page-sticky position="left" :offset="[18, 0]">
						<q-btn round color="accent" icon="arrow_back" @click="GoToPrev();"></q-btn>
					</q-page-sticky>
					<q-page-sticky position="right" :offset="[18, 0]">
						<q-btn round color="accent" icon="arrow_upward" class="rotate-90" @click="GoToNext();"></q-btn>
					</q-page-sticky>
					<q-page-sticky position="top-right" :offset="[18, -18]">
						<q-btn round color="primary" icon="close" @click="CloseView();"></q-btn>
					</q-page-sticky>
				</div>
			</div>
			<q-card-section>
				<q-chip class="transparent" dense v-if="image.time" icon="access_time">{{image.time}}</q-chip>
				<q-chip class="transparent" dense clickable v-if="image.lat && image.lng" icon="room" @click="ViewLocation();">觀看地點</q-chip>
				<q-chip class="transparent" dense v-if="image.annotation">{{'認同數 / 驗證數 : '+AgreeVerifyRatio}}</q-chip>
				<pre class="q-mx-sm q-my-none" v-if="image.remark && image.remark != '' ">{{image.remark}}</pre>
				<div class="row">
					<div class="q-pa-sm" v-if="uploader" @click="OpenUserInfo(uploader)">上傳者:
						<span class="cursor-pointer text-blue-10">{{uploader.name}}</span>
					</div>
					<div class="q-pa-sm" v-if="annotator" @click="OpenUserInfo(annotator);">標註者:
						<span class="cursor-pointer  text-blue-10">{{annotator.name}}</span>
					</div>
				</div>
			</q-card-section>

			<q-card-actions>
				<div v-if="editable">
					<q-btn v-if="dataset && dataset.enableAnnotation" flat :label="image.annotation?'協助驗證':'協助標註' " @click="AnnotateImage();"></q-btn>
					<q-btn flat label="影像網址" @click="GoToImageUrl();"></q-btn>
					<q-btn flat label="下載影像" @click="DownloadImage();"></q-btn>
					<q-btn v-if="CheckAnnotationDelete" flat label="刪除標註" @click="DeleteAnnotation();"></q-btn>
					<q-btn v-if="CheckMasterAuth" flat label="編輯資訊" @click="OpenInfoEditor();"></q-btn>
					<q-btn v-if="CheckMasterAuth" flat label="刪除影像" @click="DeleteImage();"></q-btn>
				</div>

				<q-btn v-if="dataset && dataset.externalLink=='riverlog' " flat label="前往山河事件簿" @click="GoToExternalLink();"></q-btn>
				<q-btn v-if="dataset && dataset.externalLink=='purbao' " flat label="前往紫豹在哪裡" @click="GoToExternalLink();"></q-btn>
			</q-card-actions>
		</q-card>

		<q-dialog maximized persistent v-model="openAnnotator" v-if="dataset">
			<annotator :user="user" :dataset="dataset" :image="image" @done="FinishAnnotation();" @skip="openAnnotator = false;"></annotator>
			<div>
				<q-btn round class="bg-teal text-white q-ma-md absolute-top-right" icon="close" v-close-popup></q-btn>
			</div>
		</q-dialog>

		<q-dialog v-model="openInfoEdit" v-if="editImage">
			<image-info ref="imageInfo" :dataset="dataset" :initDataTime="editImage.dataTime" :initLat="editImage.lat" :initLng="editImage.lng" :initRemark="editImage.remark" @confirm="UpdateImageInfo();" @cancel="openInfoEdit=false;"></image-info>
		</q-dialog>

		<q-dialog v-model="openLocationView" v-if="image && image.lat && image.lng">

			<q-card class="full-width q-pa-sm">
				<div class="text-h6">資料地點</div>
				<location-select mode="view" ref="locationSelect"></location-select>
				<div class="text-center">座標: {{image.lat.toFixed(5)+" "+image.lng.toFixed(5)}}</div>
				<q-card-actions align="center">
					<q-btn flat label="確定" v-close-popup></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog v-model="openUserInfo" v-if="targetUser">
			<q-card class="q-pa-lg">
				<div class="row justify-center q-pa-sm">
					<q-avatar size="150px">
						<img style="object-fit:cover;" :src="user.photo"/>
					</q-avatar>
				</div>
				<div class="column q-pa-sm">
					<div>{{targetUser.name}}</div>
					<div>{{targetUser.contactEmail}}</div>
				</div>
				<q-card-actions align="center">
					<q-btn flat label="確定" v-close-popup></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>
	</div>
</template>

<script>
import annotator from "./annotator.vue"
import annotatorView from "./annotator-view.vue"
import locationSelect from "./location-select.vue"
import imageInfo from "./image-info.vue"

export default {
	name:"image-control",
	props: {
		user: Object,
		dataset: Object,
		image: Object,
		showNavigate: Boolean,
		editable: Boolean
	},
	components:{
		"annotator":annotator,
		"annotator-view":annotatorView,
		"location-select": locationSelect,
		"image-info":imageInfo
	},
	data: function () {
		return {
			openAnnotator: false,
			openLocationView: false,
			openInfoEdit: false,
			editImage: null,
			uploader: null,
			annotator: null,
			openUserInfo: false,
			targetUser: null
		};
	},
	mounted: function(){
		var idArr = [];
		var hasUploader = this.image.uploadFrom == "user" && this.image.uploader;
		var hasAnnotator = this.image.annotation && this.image.annotation.user;
		if(hasUploader){
			idArr.push(this.image.uploader);
		}
		if(hasAnnotator){
			idArr.push(this.image.annotation.user);
		}
		if(idArr.length == 0) return;
		$.get("/user/list-name?id="+idArr.join(),function(result){
			if(result.status != "ok") return alert("取得貢獻者資料失敗");
			var userHash = {};
			for(var i=0;i<result.data.length;i++){
				var d = result.data[i];
				userHash[d._id] = d;
			}
			if(hasUploader){
				this.uploader = userHash[this.image.uploader];
			}
			if(hasAnnotator){
				this.annotator = userHash[this.image.annotation.user];
			}
		}.bind(this));
	},
	methods: {
		GoToPrev: function(){
			this.$emit("goToPrev");
		},
		GoToNext: function(){
			this.$emit("goToNext");
		},
		CloseView: function(){
			this.$emit("closeView");
		},
		AnnotateImage: function(){
			this.openAnnotator = true;
		},
		FinishAnnotation: function(){
			this.openAnnotator = false;
			this.openViewImage = false;
			this.$emit("reload");
		},
		ViewLocation: function(){
			this.openLocationView = true;
			Vue.nextTick(function(){
				this.$refs.locationSelect.SetPosition(this.image.lat,this.image.lng);
			}.bind(this));
		},
		OpenInfoEditor: function(){
			//編輯前從伺服器取得最新資料，減少共同編輯時被蓋掉的機率
			$.get("/dataset/view-image?dataset="+this.dataset._id+"&image="+this.image._id, function(result){
				if(result.status != "ok") return window.location.href="/?message="+encodeURIComponent("無法顯示影像");

				var tz = spacetime().name;	//get browser time zone
				this.editImage = result.data;
				if(this.editImage.dataTime){
					var t = spacetime(this.editImage.dataTime).goto(tz);
					this.editImage.time = t.unixFmt("yyyy-MM-dd HH:mm:ss");
				}
				this.editImage.url = "/static/upload/dataset/"+this.dataset._id+"/image/"+this.image._id+".jpg";
				this.openInfoEdit = true;
			}.bind(this));
		},
		OpenUserInfo: function(user){
			this.targetUser = user;
			this.openUserInfo = true;
		},
		UpdateImageInfo: function(){
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var info = this.$refs.imageInfo.GetImageInfo();
			var data = {};
			data.dataset = this.dataset._id;
			data.image = this.image._id;
			data.dataTime = info.dataTime;
			data.remark = info.remark;
			if(info.loc){
				data.lat = info.loc.lat;
				data.lng = info.loc.lng;
			}
			data._csrf = csrfToken;
			$.post("/dataset/update-image-info", data, function(result){
				if(result.status != "ok") return alert("更新失敗");
				this.$emit("reload");
				this.openInfoEdit = false;
				this.$q.notify("更新成功");
			}.bind(this));
		},
		DeleteImage: function(){
			if(confirm("確定刪除此影像?")){
				var csrfToken = $("meta[name='csrf-token']").attr("content");
				var data = {};
				data.dataset = this.dataset._id;
				data.image = this.image._id;
				data._csrf = csrfToken;
				$.post("/dataset/delete-image", data, function(result){
					if(result.status != "ok") return alert("刪除失敗");
					this.$emit("reload");
					this.$q.notify("刪除成功");
				}.bind(this));
			}
		},
		DownloadImage: function(){
			if(!this.image) return;
			var a = $("<a>")
				.attr("href", this.image.url)
				.attr("download", this.image._id+".jpg")
				.appendTo("body");
			a[0].click();
			a.remove();
		},
		GoToImageUrl: function(){
			if(!this.image) return;
			window.open("/image?dataset="+this.dataset._id+"&image="+this.image._id,"_blank");
		},
		DeleteAnnotation: function(){
			if(confirm("確定刪除此影像的標註?")){
				this.openViewImage = false;
				var csrfToken = $("meta[name='csrf-token']").attr("content");
				var data = {};
				data.dataset = this.dataset._id;
				data.image = this.image._id;
				data._csrf = csrfToken;
				$.post("/dataset/set-annotation",data,function(result){
					if(result.status != "ok") return alert("刪除標註失敗");
					this.$q.notify("刪除標註成功");
					this.$emit("reload");
				}.bind(this));
			}
		},
	},
	computed:{
		AgreeVerifyRatio: function(){
			var str = this.image.agreeNum+' / '+this.image.verifyNum;
			if(this.image.verifyNum > 0){
				str +=' ('+(100*this.image.agreeNum/this.image.verifyNum).toFixed(0)+'%)';
			}
			return str;
		},
		CheckAnnotationDelete: function(){
			if(!this.user) return false;
			if(!this.image) return false;
			if(!this.image.annotation) return false;
			if(this.user.authType == "admin") return true;
			//使用者可以刪除自己的標註
			if(this.image.annotation.user == this.user._id) return true;
			//確認目前使用者是不是在master list裡
			if(!this.info) return false;
			var isMaster = this.info.master.filter(function(master){
				return master._id == this.user._id;
			}.bind(this));
			if(isMaster.length > 0) return true;
			return false;
		},
		CheckMasterAuth: function(){
			if(!this.user) return false;
			if(this.user.authType == "admin") return true;
			//確認目前使用者是不是在master list裡
			if(!this.dataset) return false;
			var isMaster = this.dataset.master.filter(function(master){
				return master._id == this.user._id;
			}.bind(this));
			if(isMaster.length > 0) return true;
			return false;
		}
	}
}
</script>

<style lang="scss">
.image-control{
	width: 100%;
	height: 100%;
}
</style>