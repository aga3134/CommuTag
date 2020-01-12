<template lang="html">
	<div class="data-admin">
		<div class="row q-px-md">
			<q-btn class="bg-grey-8 text-white" icon="add" label="新增資料集" @click="AddDataset();"></q-btn>
		</div>

		<div class="row">
			<div class="col-12 col-sm-6 col-md-3 q-pa-md">
				<q-input v-model="searchKey" label="搜尋資料集" @keyup.enter="SearchDataset();">
					<template v-slot:append>
						<q-btn class="bg-grey-8 text-white" icon="search" @click="SearchDataset();"></q-btn>
					</template>
				</q-input>
			</div>

			<div class="col-12 col-sm-6 col-md-3 q-pa-md">
				<q-select v-model="sortKey" :options="sortOption" label="排序"></q-select>
			</div>
		</div>
		
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
						<q-btn flat icon="remove_red_eye" label="檢視"></q-btn>
						<q-btn flat icon="edit" label="修改" @click="ModifyDataset(arr);"></q-btn>
						<q-btn flat icon="delete" label="刪除" @click="DeleteDataset(arr);"></q-btn>
					</q-card-actions>
				</q-card>
			</div>
		</div>

		<q-dialog v-model="openDatasetEditor">
			<dataset-editor :info="editInfo"></dataset-editor>
		</q-dialog>

	</div>
</template>

<script>
import datasetEditor from "./dataset-editor.vue"

export default {
	name:"data-admin",
	props: {
		user: Object
	},
	components:{
		"dataset-editor":datasetEditor
	},
	data: function () {
		return {
			searchKey:"",
			sortKey: "更新時間",
			sortOption: [
				{label: "更新時間",value:"updated"},
				{label: "影像數",value:"imageNum"},
				{label: "標註數",value:"annotationNum"},
			],
			datasetArr: "",
			editInfo: {},
			openDatasetEditor: false
		};
	},
	created: function(){
		this.datasetArr = [
	  		{"_id":1, "name": "高麗菜", "picCover": "https://cdn.quasar.dev/img/parallax2.jpg","picNum": 10, "tagNum": 5},
	  		{"_id":2, "name": "青江菜", "picCover": "https://cdn.quasar.dev/img/parallax2.jpg","picNum": 20, "tagNum": 20},
	  		{"_id":3, "name": "百香果", "picCover": "https://cdn.quasar.dev/img/parallax2.jpg","picNum": 20, "tagNum": 20},
	  		{"_id":4, "name": "甘蔗", "picCover": "https://cdn.quasar.dev/img/parallax2.jpg","picNum": 20, "tagNum": 20},
	  	];
	},
	methods: {
		AddDataset: function(){
			this.openDatasetEditor = true;
			this.editInfo = {};
		},
		ModifyDataset: function(data){
			this.openDatasetEditor = true;
			this.editInfo = Object.assign({}, data);
		},
		SearchDataset: function(){
			console.log(this.searchKey);
		},
		DeleteDataset: function(data){
			if(confirm("確定刪除資料集 "+data.name+"?")){

			}
		}
	}
}
</script>

<style lang="scss">
.data-admin{
	width: 100%;
}
</style>