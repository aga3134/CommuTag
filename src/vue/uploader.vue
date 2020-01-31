<template lang="html">
	<div class="camera-capture">
		<camera-capture></camera-capture>
	</div>
</template>

<script>
import cameraCapture from "./camera-capture.vue"

export default {
	name:"uploader",
	components:{
		"camera-capture":cameraCapture
	},
	props: {
		
	},
	data: function () {
		return {
			
		};
	},
	created: function(){
		
	},
	methods: {
		
	}
}
</script>

<style lang="scss">
.camera-capture{
	width: 100%;
	height: 100%;
}
</style>