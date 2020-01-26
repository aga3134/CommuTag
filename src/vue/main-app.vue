<template lang="html">
	<q-layout view="lHh lpr lFf" container class="main-app bg-grey-1 shadow-2">
		<q-header>
			<topbar :user="user"></topbar>
		</q-header>

		<q-page-container>
			<q-tab-panels v-model="tab" class="bg-grey-1" animated>
				<q-tab-panel name="dataset">
					<dataset-list mode="view"></dataset-list>
					
				</q-tab-panel>

				<q-tab-panel name="upload">
					<div class="text-h6">拍照上傳</div>
				</q-tab-panel>

				<q-tab-panel name="annotation">
					<div class="text-h6">照片標註</div>
				</q-tab-panel>
			</q-tab-panels>

		</q-page-container>

		<q-footer>
			<q-tabs v-model="tab" inline-label align="justify" active-bg-color="grey-7" class="bg-grey-8 text-white">
				<q-tab name="dataset" icon="folder" label="資料集"></q-tab>
				<q-tab name="upload" icon="cloud_upload" label="拍照上傳"></q-tab>
				<q-tab name="annotation" icon="aspect_ratio" label="照片標註"></q-tab>
			</q-tabs>
		</q-footer>

	</q-layout>
</template>

<script>
import "../scss/main.scss"
import topbar from "./topbar.vue"
import datasetList from "./dataset-list.vue"

export default {
	name:"main-app",
	components:{
		"topbar":topbar,
		"dataset-list":datasetList,
	},
	data: function () {
		return {
			tab: "dataset",
			user: {},
    		datasetArr: []
		};
	},
	created: function(){
		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));

		$.get("/dataset/list-dataset", function(result){
			if(result.status != "ok") return;
			this.datasetArr = result.data;
		}.bind(this));

	},
	methods: {
		
	}
}
</script>

<style lang="scss">

.main-app{
	width: 100%;
	height: 100%;
}
</style>