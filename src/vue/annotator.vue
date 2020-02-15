<template lang="html">
	<div class="annotator bg-grey-9">
		<div class="fit" v-if="datasetSelect && imageSelect">
			<annotator-image v-if="datasetSelect.annotationType=='image' " ref="annotatorImage" :dataset="datasetSelect" :image="imageSelect" :task="taskSelect" @setAnnotation="UploadAnnotation" @setVerification="UploadVerification" @skipTask="SkipTask"></annotator-image>
			<annotator-bbox v-if="datasetSelect.annotationType=='bbox' " ref="annotatorBBox" :dataset="datasetSelect" :image="imageSelect" :task="taskSelect" @setAnnotation="UploadAnnotation" @setVerification="UploadVerification" @skipTask="SkipTask"></annotator-bbox>
		</div>
		<div class="fit row justify-center items-center" v-else>
			<div class="text-h5 text-white">{{status}}</div>
		</div>

		<q-dialog v-model="openDatabaseSelect">
			<q-card class="full-width q-pa-sm">
				<q-card-section>
					<dataset-select ref="datasetSelect"></dataset-select>
				</q-card-section>
				<q-card-actions class="justify-center">
					<q-btn flat label="確定" @click="ChangeDataset();"></q-btn>
					<q-btn flat label="取消" v-close-popup></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-page-sticky position="top-left" :offset="[18, 18]">
			<div class="column q-gutter-sm">
				<q-btn flat round class="bg-primary text-white" size="md" icon="help" @click="OpenHelp();">
					<q-tooltip content-class="bg-primary">如何標註</q-tooltip>
				</q-btn>
				<q-btn flat round class="bg-primary text-white" size="md" icon="view_quilt" :disable="dataset != null" @click="openDatabaseSelect = true;">
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
		dataset: Object,
		image: Object,
		autoTask: Boolean
	},
	data: function () {
		return {
			datasetSelect:null,
			imageSelect:null,
			taskSelect:"",
			openDatabaseSelect: false,
			imageArr: [],
			status: ""
		};
	},
	mounted: function(){
		this.datasetSelect = this.dataset;
		this.imageSelect = this.image;
		if(!this.dataset){
			this.status = "請選擇資料集";
			this.openDatabaseSelect = true;
		}
		else{
			this.GenerateTask();
		}
	},
	methods: {
		ChangeDataset: function(){
			this.openDatabaseSelect = false;
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
			if(!this.datasetSelect){
				this.status = "請選擇資料集";
				return;
			}
			
			var GetRandomImage = function(){
				if(this.imageArr.length == 0) return null;
				var index = Math.floor(Math.random()*this.imageArr.length);
				return this.imageArr[index];
			}.bind(this);

			this.imageSelect = this.image || GetRandomImage();
			if(!this.imageSelect){
				this.status = "此資料集影像皆已標註完成";
				return;
			}
			this.taskSelect = this.imageSelect.annotation?"verify":"annotate";
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
				if(result.status != "ok") return alert("標註失敗");
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
			data.agree = agree;
			data._csrf = csrfToken;
			$.post("/dataset/add-verification",data,function(result){
				if(result.status != "ok") return alert("驗證失敗");
				this.$q.notify("驗證成功");
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
				this.$emit("done");
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