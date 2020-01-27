<template lang="html">
	<div class="dataset-list">
		<div class="row q-px-md" v-if="mode == 'edit' ">
			<q-btn class="bg-grey-8 text-white" icon="add" label="新增資料集" @click="AddDataset();"></q-btn>
		</div>

		<div class="row">
			<div class="col-12 col-sm-6 col-md-3 q-pa-md">
				<q-input v-model="searchKey" label="搜尋資料集" @keyup.enter="ReloadDataset();">
					<template v-slot:append>
						<q-btn class="bg-grey-8 text-white" icon="search" @click="ReloadDataset();"></q-btn>
					</template>
				</q-input>
			</div>

			<div class="col-12 col-sm-6 col-md-3 q-pa-md">
				<q-select v-model="sortKey" :options="sortOption" option-value="value" option-label="label" emit-value map-options label="排序" @input="ReloadDataset();"></q-select>
			</div>
			<div class="col-6 col-sm-4 col-md-2 q-pa-md">
				<q-select v-model="orderType" :options="orderTypeOption" option-value="value" option-label="label" emit-value map-options @input="ReloadDataset();"></q-select>
			</div>
		</div>
		
		<div class="row q-col-gutter-md">
			<div class="col-12 col-sm-6 col-md-3 q-pa-md" v-for="dataset in datasetArr">
				<q-card class="bg-grey-7 text-white">
					<q-img :src="dataset.picCover || '/static/image/logo-16-9.png' " :ratio="16/9"></q-img>

					<q-separator dark></q-separator>

					<q-card-section>
						<div class="text-h6">{{dataset.name}}</div>
						<div class="text-subtitle2">圖片數: {{dataset.picNum}}</div>
						<div class="text-subtitle2">標註數: {{dataset.tagNum}}</div>
					</q-card-section>

					<q-separator dark></q-separator>

					<q-card-actions align="right" v-if="mode == 'edit' ">
						<q-btn flat icon="remove_red_eye" label="檢視"></q-btn>
						<q-btn flat icon="edit" label="修改" @click="ModifyDataset(dataset);"></q-btn>
						<q-btn flat icon="delete" label="刪除" @click="DeleteDataset(dataset);"></q-btn>
					</q-card-actions>

					<q-card-actions align="right" v-if="mode == 'view' ">
						
						<q-btn flat icon="remove_red_eye" label="檢視" @click="GoToDataset(dataset);"></q-btn>
						
						<q-btn flat icon="cloud_download" label="下載" @click="DownloadDataset(dataset);"></q-btn>
					</q-card-actions>
				</q-card>
			</div>
		</div>
		<q-btn class="full-width bg-grey-4" v-show="hasMoreDataset" label="載入更多" @click="LoadMoreDataset();"></q-btn>

		<q-dialog v-model="openDatasetEditor">
			<dataset-editor :info="editInfo" @reload="ReloadDataset"></dataset-editor>
		</q-dialog>

	</div>
</template>

<script>
import datasetEditor from "./dataset-editor.vue"

export default {
	name:"dataset-list",
	props: {
		mode: String
	},
	components:{
		"dataset-editor":datasetEditor
	},
	data: function () {
		return {
			searchKey:"",
			sortKey: "updatedAt",
			sortOption: [
				{label: "更新時間",value:"updatedAt"},
				{label: "影像數",value:"picNum"},
				{label: "標註數",value:"tagNum"},
			],
			orderType: "desc",
			orderTypeOption: [
				{label: "遞減",value:"desc"},
				{label: "遞增",value:"asc"},			
			],
			datasetArr: [],
			datasetPage: 0,
			hasMoreDataset: true,
			editInfo: {},
			openDatasetEditor: false
		};
	},
	created: function(){
		this.LoadMoreDataset();
	},
	methods: {
		LoadMoreDataset: function(){
			var url = "/dataset/list-dataset";
			url += "?page="+this.datasetPage;
			url += "&sort="+this.sortKey;
			url += "&orderType="+this.orderType;
			url += "&keyword="+this.searchKey;
			$.get(url, function(result){
				if(result.status != "ok") return;
				this.hasMoreDataset = result.data.hasMore;
				this.datasetArr = this.datasetArr.concat(result.data.dataset);
				this.datasetPage++;
			}.bind(this));
		},
		ClearDataset: function(){
			this.datasetArr = [];
			this.datasetPage = 0;
		},
		ReloadDataset: function(closeDialog){
			this.ClearDataset();
			this.LoadMoreDataset();
			if(closeDialog) this.openDatasetEditor = false;
		},
		AddDataset: function(){
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data._csrf = csrfToken;
			$.post("/dataset/create-dataset", data, function(result){
				if(result.status != "ok") return alert("新增失敗");
				this.ReloadDataset();
				this.openDatasetEditor = true;
				this.editInfo = result.data;
			}.bind(this));
		},
		ModifyDataset: function(data){
			this.openDatasetEditor = true;
			this.editInfo = Object.assign({}, data);
		},
		DeleteDataset: function(dataset){
			if(confirm("刪除資料集將一併刪除所有影像與標註資料，並且無法復原。確定刪除資料集 "+dataset.name+"?")){
				var csrfToken = $("meta[name='csrf-token']").attr("content");
				var data = {};
				data.id = dataset._id;
				data._csrf = csrfToken;
				$.post("/dataset/delete-dataset",data, function(result){
					if(result.status != "ok") return alert("刪除失敗");
					this.ReloadDataset();
				}.bind(this));
			}
		},
		DownloadDataset: function(dataset){
			
		},
		GoToDataset: function(dataset){
			window.location.href="/view?id="+dataset._id;
		}
	}
}
</script>

<style lang="scss">
.dataset-list{
	width: 100%;
}
</style>