<template lang="html">
	<div class="image-edit bg-grey-9">
		<div class="absolute-top row justify-center q-gutter-sm q-pa-sm">
			<q-btn dense color="primary" icon="rotate_left" @click="RotateImage(-90);">
				<q-tooltip content-class="bg-primary">逆時針旋轉90°</q-tooltip>
			</q-btn>
			<q-btn dense color="primary" icon="rotate_right" @click="RotateImage(90);">
				<q-tooltip content-class="bg-primary">順時針旋轉90°</q-tooltip>
			</q-btn>
			<q-btn dense color="primary" icon="crop">
				<q-tooltip content-class="bg-primary">裁切影像</q-tooltip>
			</q-btn>
			<q-btn dense color="primary" icon="clear" @click="ResetImage();">
				<q-tooltip content-class="bg-primary">重設影像</q-tooltip>
			</q-btn>
		</div>
		<canvas ref="canvas"></canvas>
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
			image: null,
			imageControl: null,
			scale:1,
			offsetX:0,
			offsetY:0,
			rotate:0,
			wheelFactor: 0.001,
			offsetFactor: 1,
		};
	},
	mounted: function(){
		var canvas = this.$refs.canvas;
		this.imageControl = new Hammer(canvas);
		this.imageControl.get('pinch').set({enable:true});
		this.imageControl.get('pan').set({direction:Hammer.DIRECTION_ALL,threshold:0});

		this.imageControl.on('pinch', function(event) {
			
		}.bind(this));

		this.imageControl.on('pinchend', function(event) {
			
		}.bind(this));

		this.imageControl.on("panmove",function(event){
			this.offsetX += event.velocityX*this.offsetFactor;
			this.offsetY += event.velocityY*this.offsetFactor;
			this.UpdateTransform();
		}.bind(this));

		canvas.addEventListener("wheel",function(event){
			this.scale += event.deltaY*this.wheelFactor;
			this.UpdateTransform();
		}.bind(this));
		
	},
	methods: {
		SetImage: function(imageData){
			this.image = new Image(); 
			this.image.onload = function(){
				var canvas = this.$refs.canvas;
				canvas.width = this.image.width;
				canvas.height = this.image.height;
				this.UpdateTransform();
			}.bind(this);
			this.image.src = imageData; 
		},
		RotateImage: function(deg){
			this.rotate += Math.PI*deg/180;
			this.UpdateTransform();
		},
		ResetImage: function(){
			if(confirm("確定重設影像?")){
				this.rotate = 0;
				this.offsetX = 0;
				this.offsetY = 0;
				this.scale = 1;
				this.UpdateTransform();
			}
		},
		UpdateTransform: function(){
			var canvas = this.$refs.canvas;
			var ctx = canvas.getContext('2d');
			ctx.clearRect(0,0,canvas.width,canvas.height);
			ctx.save();
			//rotate scale about the center pivot
			ctx.translate(canvas.width*0.5,canvas.height*0.5);
			ctx.scale(this.scale,this.scale);
			ctx.rotate(this.rotate);
			ctx.translate(-canvas.width*0.5,-canvas.height*0.5);
			//apply offset
			ctx.translate(this.offsetX,this.offsetY);
			
			ctx.drawImage(this.image,0,0);
			ctx.restore();
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
	canvas{
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>