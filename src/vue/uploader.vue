<template lang="html">
	<div class="camera-capture bg-grey-8">
		<div class="full-width" v-show="stepArr[step] && stepArr[step].id == 'capture' ">
			<camera-capture ref="cam"></camera-capture>

			<q-page-sticky position="bottom" :offset="[18, 18]">
				<q-btn round push :disable="camStatus!='ok' " class="bg-white text-grey-8" size="lg" icon="camera_alt" @click="CaptureCameraImage();">
					<q-tooltip content-class="bg-primary">拍照上傳</q-tooltip>
				</q-btn>
			</q-page-sticky>
			<q-page-sticky position="bottom-right" :offset="[18, 18]">
				<div class="column q-gutter-sm">
					<q-btn flat round class="bg-primary text-white" size="md" icon="flip_camera_ios" @click="ChangeCamera();">
						<q-tooltip content-class="bg-primary">切換相機</q-tooltip>
					</q-btn>

					<q-btn flat round class="bg-primary text-white" size="md" icon="folder" @click="SelectFile();">
						<q-tooltip content-class="bg-primary">檔案上傳</q-tooltip>
					</q-btn>
					
				</div>
			</q-page-sticky>
		</div>

		<div class="full-width" v-show="stepArr[step] && stepArr[step].id == 'crop' ">
			<image-edit ref="imageEdit" ></image-edit>
			
			<div class="absolute-bottom row justify-center q-gutter-sm q-pa-sm">
				<q-btn color="primary" label="確定" @click="NextStep();">
				</q-btn>
				<q-btn color="primary" label="取消" @click="PrevStep();">
				</q-btn>
			</div>
		</div>

		<q-dialog v-model="stepArr[step] && stepArr[step].id == 'dataset'">
			<q-card class="full-width q-pa-sm">
				<q-card-section>
					<dataset-select ref="datasetSelect" @change="DatasetChange();"></dataset-select>
				</q-card-section>
				<q-card-actions class="justify-center">
					<q-btn flat label="確定" @click="NextStep();"></q-btn>
					<q-btn flat label="取消" @click="PrevStep();"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-dialog v-model="stepArr[step] && stepArr[step].id == 'location'">
			<q-card class="full-width q-pa-sm">
				<q-card-section>
					<location-select ref="locationSelect" @change="LocationChange();"></location-select>
				</q-card-section>
				<q-card-actions class="justify-center">
					<q-btn flat label="確定" @click="NextStep();"></q-btn>
					<q-btn flat label="取消" @click="PrevStep();"></q-btn>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<image-upload ref="uploader" v-show="false"></image-upload>

		<q-page-sticky position="bottom-left" :offset="[9,9]" v-if="stepArr[step]">
			<q-badge color="secondary q-pa-sm">
				{{stepArr[step].name+" ("+(step+1)+"/"+stepArr.length+")"}}
			</q-badge>
		</q-page-sticky>
	</div>
</template>

<script>
import cameraCapture from "./camera-capture.vue"
import imageUpload from "./image-upload.vue"
import imageEdit from "./image-edit.vue"
import datasetSelect from "./dataset-select.vue"
import locationSelect from "./location-select.vue"

export default {
	name:"uploader",
	components:{
		"camera-capture":cameraCapture,
		"image-upload":imageUpload,
		"image-edit":imageEdit,
		"dataset-select":datasetSelect,
		"location-select":locationSelect
	},
	props: {
		dataset: Object,
	},
	data: function () {
		return {
			camStatus:"",
			datasetArr: [],
			filterArr:[],
			stepArr:[],
			step:0,
			locationIndex:-1,
			datasetSelect:null,
			locationSelect:null
		};
	},
	mounted: function(){
		this.stepArr = [];
		this.stepArr.push({"id":"capture",name:"拍照選檔"});
		this.stepArr.push({"id":"crop",name:"旋轉裁切"});
		if(!this.dataset){
			this.stepArr.push({"id":"dataset",name:"選擇資料集"});
		}
		else{
			if(this.dataset.enableGPS){
				this.locationIndex = this.stepArr.length;
				this.stepArr.push({"id":"location",name:"確認位置"});
			}
		}
		this.ChangeCamera();
	},
	methods: {
		ChangeCamera: function(){
			var cam = this.$refs.cam;
			cam.OnCamStart = function(){
				this.camStatus = cam.camStatus;
			}.bind(this);
			cam.OpenCameraSelect();
		},
		CaptureCameraImage: function(){
			var cam = this.$refs.cam;
			cam.OnCamCapture = function(){
				this.$refs.imageEdit.SetImage(cam.imageData);
				this.NextStep();
			}.bind(this);
			cam.CaptureImage();
		},
		SelectFile: function(){
			var uploader = this.$refs.uploader;
			uploader.OnChange = function(){
				this.$refs.imageEdit.SetImage(uploader.imageData);
				this.NextStep();
			}.bind(this);
			uploader.SelectFile();
		},
		NextStep: function(){
			this.step++;
			if(this.step >= this.stepArr.length){
				this.UploadImageToDataset();
			}
		},
		PrevStep: function(){
			this.step--;
			if(this.step < 0) this.step = 0;
		},
		DatasetChange: function(){
			if(this.dataset) return;
			this.datasetSelect = this.$refs.datasetSelect.GetSelectDataset();
			if(this.datasetSelect.enableGPS){
				if(this.locationIndex == -1){
					this.locationIndex = this.stepArr.length;
					this.stepArr.push({"id":"location",name:"確認位置"});
				}
			}
			else{
				if(this.locationIndex != -1){
					this.stepArr.splice(this.locationIndex,1);
					this.locationIndex = -1;
				}
			}
		},
		LocationChange: function(){
			this.locationSelect = this.$refs.locationSelect.loc;
		},
		UploadImageToDataset: function(){
			var dataset = this.dataset || this.datasetSelect;
			var loc = this.locationSelect;

			var uploader = this.$refs.uploader;

			uploader.OnSucc = function(result){
				if(result.status != "ok") return alert("上傳圖片失敗");
				this.step = 0;
				this.$q.notify("已將影像上傳至"+dataset.name);
				this.$emit("uploaded");
			}.bind(this);

			uploader.OnFail = function(errorMessage){
				console.log(errorMessage);
				switch(errorMessage){
					case "Request Entity Too Large": return alert("影像資料過大");
				}
			}.bind(this);

			uploader.url = "/dataset/upload-image";
			var data = {};
			data.dataset = dataset._id
			if(loc){
				data.lat = loc.lat;
				data.lng = loc.lng;
			}
			uploader.additionData = data;
			var canvas = this.$refs.imageEdit.GetCanvasData();
			uploader.FitCanvasFromCanvas(canvas);
			uploader.UploadImage();
		}
	}
}
</script>

<style lang="scss">
.camera-capture{
	width: 100%;
	height: 100%;
}
</style>