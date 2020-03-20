<template lang="html">
	<div class="image-edit bg-grey-9">
		
		<img ref="image" :src="imageData"></img>

		<q-page-sticky position="top" :offset="[9, 9]">
			<q-btn dense color="primary" icon="rotate_left" @click="cropper.rotate(-90);">
				<q-tooltip content-class="bg-primary">逆時針旋轉90°</q-tooltip>
			</q-btn>
			<q-btn dense color="primary" icon="rotate_right" @click="cropper.rotate(90);">
				<q-tooltip content-class="bg-primary">順時針旋轉90°</q-tooltip>
			</q-btn>
			<q-btn v-show="mode=='move' " dense color="primary" icon="crop" @click="ChangeMode('crop');">
				<q-tooltip content-class="bg-primary">框選裁切</q-tooltip>
			</q-btn>
			<q-btn v-show="mode=='crop' " dense color="primary" icon="gamepad" @click="ChangeMode('move');">
				<q-tooltip content-class="bg-primary">移動影像</q-tooltip>
			</q-btn>
			<q-btn dense color="primary" icon="clear" @click="ClearEdit();">
				<q-tooltip content-class="bg-primary">重設影像</q-tooltip>
			</q-btn>
		</q-page-sticky>

		<q-page-sticky position="bottom" :offset="[9, 9]">
			<q-btn color="primary" label="確定" @click="ConfirmEdit();">
			</q-btn>
			<q-btn color="primary" label="取消" @click="CancelEdit();">
			</q-btn>
		</q-page-sticky>

	</div>
</template>

<script>

export default {
	name:"image-edit",
	props: {
		"maxResW":{type: Number,default: 1024},
		"maxResH":{type: Number,default: 1024},
	},
	data: function () {
		return {
			imageData: null,
			cropper: null,
			mode: "move"
		};
	},
	mounted: function(){
		
		
	},
	methods: {
		SetImage: function(imageData){
			if(this.cropper){
				this.cropper.destroy();
			}
			var image = this.$refs.image;
			image.onload = function(){
				this.cropper = new Cropper(image, {
					viewMode: 2,
					dragMode: this.mode,
					autoCrop: false
				});
			}.bind(this);
			this.imageData = imageData;
		},
		ChangeMode: function(mode){
			this.mode = mode;
			this.cropper.setDragMode(mode);
		},
		ClearEdit: function(){
			if(confirm("確定清除所有編輯動作?")){
				this.cropper.clear();
				this.cropper.reset();
			}
		},
		GetCanvasData: function(){
			return this.cropper.getCroppedCanvas();
		},
		ConfirmEdit: function(){
			this.$emit("confirm");
		},
		CancelEdit: function(){
			this.$emit("cancel");
		}
	}
}
</script>

<style lang="scss">
.image-edit{
	width: 100%;
	height: 100%;
	position: relative;
	display: flex;
	justify-content: center;
	img{
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>