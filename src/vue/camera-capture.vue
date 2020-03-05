<template lang="html">
	<div class="camera-capture bg-grey-9">
		<video autoplay playsinline muted :srcObject.prop="camStream" ref="video"></video>

		<div class="fixed-center text-white text-h5" v-show="camStatus !='ok' ">{{camStatus}}</div>
		
		<q-dialog v-model="openCameraSelect">
			<q-card class="full-width">
				
				<div class="text-h6 q-pa-md">選擇相機</div>
				
				<q-list bordered separator>
					<q-item clickable v-for="camera in cameraList" :key="camera.id" v-on:click="SelectCamera(camera.id);">{{camera.name}}</q-item>
				</q-list>

			</q-card>
		</q-dialog>
	</div>
</template>

<script>

export default {
	name:"camera-capture",
	props: {
		
	},
	data: function () {
		return {
			selectCamerea: null,
			cameraList:[],
			camStatus: "無相機",
			camStream: null,
			openCameraSelect: false,
			OnCamSelect: null,
			OnCamStart: null,
			OnCamCapture: null,
			imageData: null
		};
	},
	created: function(){
		
	},
	beforeDestroy: function(){
		this.StopCamera();
	},
	methods: {
		OpenCameraSelect: function(){
			//list device
			if(!navigator.mediaDevices){
				this.camStatus = "無法讀取裝置列表，請開啟權限";
				return;
			}
			navigator.mediaDevices.enumerateDevices().then(function(devices){
				this.cameraList = [];
				for(var i=0;i<devices.length;i++){
					var device = devices[i];
					var name = device.label;
					if(name == "") name = "相機"+(this.cameraList.length+1);
					if (device.kind === 'videoinput'){
						this.cameraList.push({"id": device.deviceId, "name": name});
					}
				}
				if(this.cameraList.length>0){
					this.selectCamera = this.cameraList[0].id;
				}
				this.openCameraSelect = true;
			}.bind(this));
		},
		SelectCamera(id){
			this.selectCamera = id;
			this.StartCamera();
			if(this.OnCamSelect) this.OnCamSelect();
		},
		StartCamera: function(){
			this.camStatus = "無相機";
			var option = {};
			option.video = {};
			if(this.selectCamera){
				option.video.deviceId = {exact: this.selectCamera};
			}
			else{
				option.video.facingMode = "environment";
			}
			//取得相機權限
			if(navigator.getUserMedia) {
				navigator.getUserMedia(option,
					function(stream){
						this.camStream = stream;
						this.camStatus = "ok";
						if(this.OnCamStart) this.OnCamStart();
					}.bind(this),
					function(error){
						this.camStatus = "讀取相機失敗";
					}.bind(this));
			}
			else{
				this.camStatus = "瀏覽器不支援相機";
			}
			this.openCameraSelect = false;
		},
		StopCamera: function(){
			if(this.camStream){
				this.camStream.getTracks()[0].stop();
				this.camStream = null;
			}
		},
		CaptureImage: function(){
			var video = this.$refs.video;
			var dstCanvas = document.createElement("canvas");
			dstCanvas.width = video.videoWidth;
			dstCanvas.height = video.videoHeight;
			var dstCtx = dstCanvas.getContext('2d');	
			dstCtx.save();
			dstCtx.drawImage(video,0,0);
			dstCtx.restore();
			this.imageData = dstCanvas.toDataURL('image/jpeg', 0.9);
			if(this.OnCamCapture) this.OnCamCapture();
		},
	}
}
</script>

<style lang="scss">
.camera-capture{
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	video{
		width: auto;
		height: 100%;
	}
	
}
</style>