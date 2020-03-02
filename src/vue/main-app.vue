<template lang="html">
	<q-layout view="lHh lpr lFf" container class="main-app bg-grey-1 shadow-2">
		<q-header>
			<topbar :user="user"></topbar>
		</q-header>

		<q-page-container>
			<q-page class="bg-grey-1">
				<q-tab-panels v-model="tab" class="absolute fit" animated>
					<q-tab-panel name="dataset">
						<dataset-list mode="view"></dataset-list>
					</q-tab-panel>

					<q-tab-panel class="q-pa-none" name="upload">
						<uploader :user="user"></uploader>
					</q-tab-panel>

					<q-tab-panel class="q-pa-none" name="annotation">
						<annotator autoTask :user="user"></annotator>
					</q-tab-panel>
				</q-tab-panels>
			</q-page>

			<div class="q-pa-md">
				<q-chip clickable icon="code" @click="GoToUrl('https://github.com/aga3134/CommuTag','_blank');">開放原始碼</q-chip>
				<q-chip clickable icon="computer" @click="GoToUrl('https://agawork.tw/','_blank');">其他專案</q-chip>
			</div>

		</q-page-container>

		<q-footer>
			<q-tabs v-model="tab" inline-label align="justify" active-bg-color="grey-7" class="bg-grey-8 text-white">
				<q-tab name="dataset" icon="folder" label="資料集"></q-tab>
				<q-tab name="upload" icon="add_photo_alternate" label="拍照上傳"></q-tab>
				<q-tab name="annotation" icon="aspect_ratio" label="照片標註"></q-tab>
			</q-tabs>
		</q-footer>

	</q-layout>
</template>

<script>
import util from "../js/util.js"
import "../scss/main.scss"
import topbar from "./topbar.vue"
import datasetList from "./dataset-list.vue"
import uploader from "./uploader.vue"
import annotator from "./annotator.vue"

export default {
	name:"main-app",
	components:{
		"topbar":topbar,
		"dataset-list":datasetList,
		"uploader":uploader,
		"annotator":annotator
	},
	data: function () {
		return {
			tab: "dataset",
			user: null,
		};
	},
	created: function(){
		var urlParam = util.GetUrlParameter();
		if(urlParam.message){
			alert(decodeURIComponent(urlParam.message));
		}

		$.get("/user/info",function(result){
			if(result.status != "ok") return;
			this.user = result.data;
		}.bind(this));

	},
	methods: {
		GoToUrl: function(url,target){
			window.open(url,target);
		}
	}
}
</script>

<style lang="scss">

.main-app{
	width: 100%;
	height: 100%;
}
</style>