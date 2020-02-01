<template lang="html">
	<div class="image-edit">
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
			imageData: null,
		};
	},
	created: function(){
		
	},
	methods: {
		SetImage: function(imageData){
			var image = new Image(); 
			image.onload = function(){
				var canvas = this.$refs.canvas;
				canvas.width = image.width;
				canvas.height = image.height;
				var ctx = canvas.getContext('2d');	
				ctx.drawImage(image,0,0);
			}.bind(this);
			image.src = imageData; 
			this.imageData = imageData;
		}
		
	}
}
</script>

<style lang="scss">
.image-edit{
	width: 100%;
	height: 100%;
	canvas{
		width: 100%;
		height: 100%;
	}
}
</style>