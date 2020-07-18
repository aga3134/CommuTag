<template lang="html">
	<div class="annotator-view bg-grey-7">
		<div class="fit" v-if="dataset && image">
			<annotator-image v-if="dataset.annotationType=='image' " :dataset="dataset" :image="image" task="view"></annotator-image>
			<annotator-bbox v-if="dataset.annotationType=='bbox' " :dataset="dataset" :image="image" task="view"></annotator-bbox>
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
		<div class="fit row justify-center items-center" v-else>
			<div class="text-h5 text-white">無影像</div>
		</div>

	</div>
</template>

<script>

import annotatorImage from "./annotator-image.vue"
import annotatorBBox from "./annotator-bbox.vue"

export default {
	name:"annotator-view",
	components:{
		"annotator-image":annotatorImage,
		"annotator-bbox":annotatorBBox
	},
	props: {
		dataset: Object,
		image: Object,
	},
	data: function () {
		return {
			
		};
	},
	mounted: function(){

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
		}
	}
}
</script>

<style lang="scss">
.annotator-view{
	width: 100%;
	height: 100%;
}
</style>