<template lang="html">
	<q-layout view="lHh lpr lFf" container class="main-app bg-grey-1 shadow-2">
		<q-header>
			<topbar :user="user"></topbar>
		</q-header>

		<q-page-container>
			<q-tab-panels v-model="tab" class="q-pa-md bg-grey-1" animated>
				<q-tab-panel name="dataset">
					<div class="row q-col-gutter-md">
						<div class="col-12 col-sm-6 col-md-3 q-pa-md" v-for="arr in datasetArr">
							<q-card class="bg-grey-7 text-white">
								<q-img :src="arr.picCover" :ratio="16/9"></q-img>

								<q-card-section>
									<div class="text-h6">{{arr.name}}</div>
									<div class="text-subtitle2">圖片數: {{arr.picNum}}</div>
									<div class="text-subtitle2">標註數: {{arr.tagNum}}</div>
								</q-card-section>

								<q-separator dark></q-separator>

								<q-card-actions align="right">
									<q-btn flat>Action 1</q-btn>
									<q-btn flat>Action 2</q-btn>
								</q-card-actions>
							</q-card>
						</div>
					</div>
					
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

export default {
	name:"main-app",
	components:{
		"topbar":topbar
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

		this.datasetArr = [
	  		{"name": "高麗菜", "picCover": "https://cdn.quasar.dev/img/parallax2.jpg","picNum": 10, "tagNum": 5},
	  		{"name": "青江菜", "picCover": "https://cdn.quasar.dev/img/parallax2.jpg","picNum": 20, "tagNum": 20},
	  		{"name": "百香果", "picCover": "https://cdn.quasar.dev/img/parallax2.jpg","picNum": 20, "tagNum": 20},
	  		{"name": "甘蔗", "picCover": "https://cdn.quasar.dev/img/parallax2.jpg","picNum": 20, "tagNum": 20},
	  	];
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