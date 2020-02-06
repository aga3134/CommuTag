<template lang="html">
	<div class="dataset-select">
		<div class="text-h6">選擇資料集</div>
		<div>
			<q-input placeholder="輸入篩選文字" outlined dense square v-model="searchKey" @change="ReloadDataset();"></q-input>
			<q-list bordered separator>
				<q-item clickable v-for="(dataset,i) in datasetArr" :key="dataset._id" :active="selectIndex == i" active-class="bg-green-2" @click="SelectItem(i);">{{dataset.name}}</q-item>
			</q-list>
			<q-btn class="full-width bg-grey-4 q-ma-sm" v-show="hasMoreDataset" label="載入更多" @click="LoadMoreDataset();"></q-btn>
		</div>
	</div>
</template>

<script>

export default {
	name:"dataset-select",
	props: {
		
	},
	components:{
		
	},
	data: function () {
		return {
			searchKey:"",
			datasetArr: [],
			datasetPage: 0,
			hasMoreDataset: true,
			selectIndex: -1
		};
	},
	created: function(){
		this.LoadMoreDataset();
	},
	methods: {
		LoadMoreDataset: function(){
			var url = "/dataset/list-dataset";
			url += "?page="+this.datasetPage;
			url += "&sort=updatedAt";
			url += "&orderType=desc";
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
			this.selectIndex = -1;
		},
		ReloadDataset: function(){
			this.ClearDataset();
			this.LoadMoreDataset();
		},
		GetSelectDataset: function(){
			if(this.selectIndex < 0 || this.selectIndex >= this.datasetArr.length) return null;
			else return this.datasetArr[this.selectIndex];
		},
		SelectItem: function(i){
			this.selectIndex = i;
			this.$emit("change");
		}
	}
}
</script>

<style lang="scss">
.dataset-select{
	width: 100%;
}
</style>