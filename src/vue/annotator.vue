<template lang="html">
	<div class="annotator bg-grey-9">
		<div v-if="datasetSelect">
			<annotate-image v-if="datasetSelect.annotationType=='image' " ref="annotateImage"></annotate-image>
			<annotate-bbox v-if="datasetSelect.annotationType=='bbox' " ref="annotateBBox"></annotate-bbox>
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

		<q-page-sticky position="bottom-right" :offset="[18, 18]">
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
import annotateImage from "./annotate-image.vue"
import annotateBBox from "./annotate-bbox.vue"

export default {
	name:"annotator",
	components:{
		"dataset-select":datasetSelect,
		"annotate-image":annotateImage,
		"annotate-bbox":annotateBBox
	},
	props: {
		dataset: Object,
		image: Object,
		task: String
	},
	data: function () {
		return {
			datasetSelect:null,
			imageSelect:null,
			mode:"",
			openDatabaseSelect: false,
		};
	},
	mounted: function(){
		if(this.dataset){
			this.datasetSelect = this.dataset;
			this.GenRandomTask();
		}
		else{
			this.openDatabaseSelect = true;
		}
	},
	methods: {
		ChangeDataset: function(){
			this.datasetSelect = this.$refs.datasetSelect.GetSelectDataset();
			this.GenRandomTask();
			this.openDatabaseSelect = false;
		},
		GenRandomTask: function(){
			function GetRandomMode(){
				var r = Math.random();
				return r>0.5?"annotate":"verify";
			}
			function GetRandomImage(){

			}
			this.mode = this.task||GetRandomMode();
			this.imageSelect = this.image||GetRandomImage();
			
		},
		UploadAnnotation: function(){
			var dataset = this.dataset || this.datasetSelect;
		},
		VerifyAnnotation: function(){

		},
		OpenHelp: function(){
			if(!this.datasetSelect) return;
			var annotate = null;
			switch(this.datasetSelect.annotationType){
				case "image":
					annotate = this.$refs.annotateImage;
					break;
				case "bbox":
					annotate = this.$refs.annotateBBox;
					break;
			};
			if(annotate){
				annotate.openHelp = true;
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