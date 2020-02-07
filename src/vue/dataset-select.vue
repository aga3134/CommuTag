<template lang="html">
	<div class="dataset-select">
		<div class="text-h6">選擇資料集</div>
		
		<q-scroll-area style="height: 300px;">
			<q-infinite-scroll @load="LoadMoreDataset" ref="datasetScroll">
				<q-input placeholder="輸入篩選文字" outlined dense square v-model="searchKey" @change="ReloadDataset();"></q-input>
				<q-list bordered separator>
					<q-item clickable v-for="(dataset,i) in datasetArr" :key="i" :active="selectIndex == i" active-class="bg-green-2" @click="SelectItem(i);">
						{{dataset.name}}
					</q-item>
				</q-list>
			</q-infinite-scroll>
		</q-scroll-area>
		
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
			hasMore: true,
			selectIndex: -1
		};
	},
	created: function(){
		
	},
	methods: {
		LoadMoreDataset: function(index,done){
			var url = "/dataset/list-dataset";
			url += "?page="+(index-1);
			url += "&sort=updatedAt";
			url += "&orderType=desc";
			url += "&keyword="+this.searchKey;
			$.get(url,function(result){
				if(result.status != "ok") return;
				this.hasMore = result.data.hasMore;
				if(!this.hasMore){
					this.$refs.datasetScroll.stop();
				}
				this.datasetArr = this.datasetArr.concat(result.data.dataset);
				done();
			}.bind(this));
		},
		ReloadDataset: function(){
			this.datasetArr = [];
			this.$refs.datasetScroll.reset();
			this.$refs.datasetScroll.resume();
			this.selectIndex = -1;
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