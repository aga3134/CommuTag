<template lang="html">
	<div class="camera-capture">
		<div class="full-width" v-show="state =='capture' ">
			<camera-capture ref="cam"></camera-capture>

			<div class="absolute-top q-pa-sm">
				<div v-if="camStatus != 'ok' " class="text-subtitle2 text-yellow">{{camStatus}}</div>
				<div v-if="gpsStatus != 'ok' " class="text-subtitle2 text-yellow">{{gpsStatus}}</div>
				<div v-else class="text-subtitle2 text-yellow">{{"GPS: "+curGPS.latitude.toFixed(6)+" "+curGPS.longitude.toFixed(6)}}</div>
			</div>

			<q-page-sticky position="bottom" :offset="[18, 18]">
				<q-btn round push class="bg-white text-grey-8" size="lg" icon="camera_alt" @click="CaptureCameraImage();">
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

		<image-edit ref="imageEdit" v-show="state == 'edit' "></image-edit>

		<image-upload ref="uploader" v-show="false"></image-upload>
	</div>
</template>

<script>
import cameraCapture from "./camera-capture.vue"
import imageUpload from "./image-upload.vue"
import imageEdit from "./image-edit.vue"

export default {
	name:"uploader",
	components:{
		"camera-capture":cameraCapture,
		"image-upload":imageUpload,
		"image-edit":imageEdit
	},
	props: {
		
	},
	data: function () {
		return {
			camStatus:"",
			gpsStatus:"",
			curGPS:null,
			state: "capture"
		};
	},
	mounted: function(){
		this.ChangeCamera();
	},
	methods: {
		ChangeCamera: function(){
			var cam = this.$refs.cam;
			cam.OnCamStart = function(){
				this.camStatus = cam.camStatus;
				cam.GetGPS();
			}.bind(this);
			cam.OnGPSReady = function(){
				this.curGPS = cam.curGPS;
				this.gpsStatus = cam.gpsStatus;
			}.bind(this);
			cam.OpenCameraSelect();
		},
		CaptureCameraImage: function(){
			var cam = this.$refs.cam;
			cam.OnCamCapture = function(){
				this.$refs.imageEdit.SetImage(cam.imageData);
				this.state = "edit";
			}.bind(this);
			cam.CaptureImage();
		},
		SelectFile: function(){
			var uploader = this.$refs.uploader;
			uploader.OnChange = function(){
				this.$refs.imageEdit.SetImage(uploader.imageData);
				this.state = "edit";
			}.bind(this);
			uploader.SelectFile();
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