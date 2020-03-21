<template lang="html">
	<div class="annotator bg-grey-9">
		<div class="fit" v-if="datasetSelect && imageSelect && taskSelect">
			<annotator-image v-if="datasetSelect.annotationType=='image' " ref="annotatorImage" :dataset="datasetSelect" :image="imageSelect" :task="taskSelect" @setAnnotation="UploadAnnotation" @setVerification="UploadVerification" @skipTask="SkipTask"></annotator-image>
			<annotator-bbox v-if="datasetSelect.annotationType=='bbox' " ref="annotatorBBox" :dataset="datasetSelect" :image="imageSelect" :task="taskSelect" @setAnnotation="UploadAnnotation" @setVerification="UploadVerification" @skipTask="SkipTask"></annotator-bbox>
		</div>
		<div class="fit row justify-center items-center" v-else>
			<div class="text-h5 text-white">{{status}}</div>
		</div>

		<q-dialog v-model="openDatasetSelect">
			<dataset-select forAnnotation ref="datasetSelect" @confirm="ChangeDataset();" @cancel="openDatasetSelect=false;"></dataset-select>
		</q-dialog>

		<q-page-sticky position="top-left" :offset="[18, 18]">
			<div class="column q-gutter-sm">
				<q-btn flat round class="bg-primary text-white" size="md" icon="help" :disable="imageSelect == null" @click="OpenHelp();">
					<q-tooltip content-class="bg-primary">如何標註</q-tooltip>
				</q-btn>
				<q-btn flat round class="bg-primary text-white" size="md" icon="view_quilt" :disable="dataset != null" @click="openDatasetSelect = true;">
					<q-tooltip content-class="bg-primary">選擇資料集</q-tooltip>
				</q-btn>
			</div>
		</q-page-sticky>
	</div>
</template>

<script>

import datasetSelect from "./dataset-select.vue"
import annotatorImage from "./annotator-image.vue"
import annotatorBBox from "./annotator-bbox.vue"

export default {
	name:"annotator",
	components:{
		"dataset-select":datasetSelect,
		"annotator-image":annotatorImage,
		"annotator-bbox":annotatorBBox
	},
	props: {
		user: Object,
		dataset: Object,
		image: Object,
		autoTask: Boolean
	},
	data: function () {
		return {
			datasetSelect:null,
			imageSelect:null,
			taskSelect:"",
			openDatasetSelect: false,
			imageArr: [],
			status: "",
			verify: null
		};
	},
	mounted: function(){
		if(!this.user) window.location.href="/login?intentUrl="+encodeURIComponent(window.location.pathname+window.location.search);

		this.datasetSelect = this.dataset;
		this.imageSelect = this.image;
		if(!this.dataset){
			this.status = "請選擇資料集";
			this.openDatasetSelect = true;
		}
		else{
			this.GenerateTask();
		}
	},
	methods: {
		ChangeDataset: function(){
			this.openDatasetSelect = false;
			this.datasetSelect = this.$refs.datasetSelect.GetSelectDataset();
			var url = "/dataset/list-image-for-annotation";
			url += "?dataset="+this.datasetSelect._id;
			$.get(url,function(result){
				if(result.status != "ok") return;
				for(var i=0;i<result.data.length;i++){
					var image = result.data[i];
					image.url = "/static/upload/dataset/"+this.datasetSelect._id+"/image/"+image._id+".jpg";
				}
				this.imageArr = result.data;
				this.GenerateTask();
			}.bind(this));
			
		},
		GenerateTask: function(){
			this.imageSelect = null;
			if(!this.datasetSelect){
				this.status = "請選擇資料集";
				return;
			}
			if(this.image){	//有指定標註影像
				if(this.image.annotation){
					var myVerify = this.image.verification.filter(function(d){
						return d.user == this.user._id;
					}.bind(this));
					if(myVerify.length > 0){
						this.status = "您已驗證過此影像，感謝您的協助";
						return;
					}
				}
				this.imageSelect = this.image;
			}
			else{	//沒指定標註影像，隨機選擇
				if(this.imageArr.length == 0){
					this.status = "此資料集影像皆已標註完成";
					return;
				}

				var activeArr = [];
				for(var i=0;i<this.imageArr.length;i++){
					var image = this.imageArr[i];
					if(!image.annotation) activeArr.push(image);
					else{
						var myVerify = image.verification.filter(function(d){
							return d.user == this.user._id;
						}.bind(this));
						if(myVerify.length == 0) activeArr.push(image);
					}
				}
				if(activeArr.length == 0){
					this.status = "您已驗證過此資料集所有資料，感謝您的協助";
					return;
				}
				var GetRandomImage = function(){
					if(activeArr.length == 0) return null;
					var index = Math.floor(Math.random()*activeArr.length);
					return activeArr[index];
				}.bind(this);

				this.imageSelect = GetRandomImage();
			}

			var CheckTask = function(){
				//未標註 -> 標註
				if(!this.imageSelect.annotation) this.taskSelect = "annotate";
				else{
					//驗證數不夠 -> 驗證
					if(this.imageSelect.verifyNum < this.verify.sample) this.taskSelect = "verify";
					else{
						//認同率太低 -> 重新標註
						if(this.imageSelect.agreeNum < this.imageSelect.verifyNum*this.verify.reject) this.taskSelect = "annotate";
						else this.taskSelect = "verify";
					}
				}
			}.bind(this);

			if(!this.verify){
				$.get("/dataset/verify-condition", function(result){
					if(result.status != "ok") return alert("讀取驗證條件失敗");
					this.verify = result.data;
					CheckTask();
				}.bind(this));
			}
			else CheckTask();
			
		},
		GetAnnotator: function(){
			if(!this.datasetSelect) return null;
			var annotator = null;
			switch(this.datasetSelect.annotationType){
				case "image":
					annotator = this.$refs.annotatorImage;
					break;
				case "bbox":
					annotator = this.$refs.annotatorBBox;
					break;
			};
			return annotator;
		},
		UploadAnnotation: function(){
			var annotator = this.GetAnnotator();
			if(!annotator) return;

			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.dataset = annotator.dataset._id;
			data.image = annotator.image._id;
			data.annotation = annotator.GetAnnotation();
			data._csrf = csrfToken;
			$.post("/dataset/set-annotation",data,function(result){
				if(result.status != "ok"){
					switch(result.message){
						case "blacklist":
							return alert("黑名單使用者無此權限");
						default:
							return alert("標註失敗");
					}
				}
				this.imageSelect.annotation = {
					user: this.user._id,
					annotation: data.annotation
				};
				this.$q.notify("標註成功");
				if(this.autoTask){
					this.GenerateTask();
				}
				else{
					this.$emit("done");
				}
			}.bind(this));
		},
		UploadVerification: function(agree){
			var annotator = this.GetAnnotator();
			if(!annotator) return;

			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.dataset = annotator.dataset._id;
			data.image = annotator.image._id;
			data.agree = agree?"1":"0";
			data._csrf = csrfToken;
			$.post("/dataset/add-verification",data,function(result){
				if(result.status != "ok"){
					switch(result.message){
						case "verification duplicate":
							this.$q.notify("您之前已驗證過這個標註");
							break;
						case "blacklist":
							alert("黑名單使用者無此權限");
							break;
						default:
							alert("驗證失敗");
							break;
					}
				}
				else this.$q.notify("驗證成功");
				this.imageSelect.verification.push({
					user: this.user._id,
					agree: data.agree
				});

				if(this.autoTask){
					this.GenerateTask();
				}
				else{
					this.$emit("done");
				}
			}.bind(this));
		},
		OpenHelp: function(){
			var annotator = this.GetAnnotator();
			if(!annotator) return;
			annotator.openHelp = true;
		},
		SkipTask: function(){
			if(this.autoTask){
				this.GenerateTask();
			}
			else{
				this.$emit("skip");
			}
		}
	}
}
</script>

<style lang="scss">
.annotator{
	width: 100%;
	height: 100%;
}
</style>