<template lang="html">
	<div class="dataset-select-list q-pa-sm">
		<div class="row items-center">
			<div v-if="enableAdd" class="col-shrink q-pr-lg">
				<q-btn class="bg-grey-8 text-white" icon="add" label="加入資料集" @click="openDatasetSelect = true;"></q-btn>
			</div>
		</div>
		
		<q-list class="q-my-md" bordered>
			<q-item v-for="(dataset,i) in datasetArr" :key="dataset._id">
				<q-item-section avatar>
					<q-avatar>
						<img :src="dataset.picCover||'/static/image/logo.png' ">
					</q-avatar>
				</q-item-section>

				<q-item-section>
					<q-item-label>{{dataset.name}}</q-item-label>
				</q-item-section>

				<q-item-section side v-if="enableRemove">
					<q-btn flat icon="close" class="text-gray-8" @click="RemoveDataset(i);"></q-btn>
				</q-item-section>
			</q-item>
		</q-list>

		<q-dialog v-model="openDatasetSelect">
			<dataset-select ref="datasetSelect" @confirm="AddDataset();" @cancel="openDatasetSelect = false;"></dataset-select>
		</q-dialog>

	</div>
</template>

<script>
import datasetSelect from "./dataset-select.vue"

export default {
	name:"dataset-select-list",
	props: {
		enableAdd: Boolean,
		enableRemove: Boolean,
		list: Array
	},
	components:{
		"dataset-select": datasetSelect
	},
	data: function () {
		return {
			datasetArr: [],
			openDatasetSelect: false
		};
	},
	created: function(){
		this.LoadDatasetList();
	},
	methods: {
		LoadDatasetList: function(){
			if(!this.list || this.list.length == 0){
				this.datasetArr = [];
				return;
			}
			var idArr = this.list.join();
			$.get("/dataset/list-dataset-by-id?id="+idArr, function(result){
				if(result.status != "ok") return alert("讀取資料集列表失敗");
				this.datasetArr = result.data;
			}.bind(this));
		},
		AddDataset: function(){
			this.openDatasetSelect = false;
			var dataset = this.$refs.datasetSelect.GetSelectDataset();
			if(!dataset) return;
			var sameID = this.datasetArr.filter(function(d){
				return dataset._id == d._id;
			}.bind(this));
			if(sameID.length == 0){
				this.datasetArr.push(dataset);
				this.$emit("add",dataset);
			}
		},
		RemoveDataset: function(i){
			if(i < 0 || i >= this.datasetArr.length) return;
			this.datasetArr.splice(i,1);
			this.$emit("remove",i);
		}
	}
}
</script>

<style lang="scss">
.dataset-select-list{
	width: 100%;
}
</style>