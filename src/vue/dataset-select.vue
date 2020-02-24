<template lang="html">
	<q-card class="dataset-select full-width q-pa-sm">
		<q-card-section>
			<div class="text-h6">選擇資料集</div>
	
			<q-scroll-area style="height: 300px;">
				<q-infinite-scroll @load="LoadMoreDataset" ref="datasetScroll">
					<q-input placeholder="輸入篩選文字" outlined dense square v-model="searchKey" @change="ReloadDataset();"></q-input>
					<q-list bordered separator>
						<q-item clickable v-for="(dataset,i) in datasetArr" :key="i" :active="selectIndex == i" active-class="bg-green-2" @click="SelectItem(i);" @dblclick="ConfirmSelect();">
							{{dataset.name}}
						</q-item>
					</q-list>

					<template v-slot:loading>
						<div class="row justify-center q-my-md">
							<q-spinner-dots color="primary" size="40px" />
						</div>
					</template>
				</q-infinite-scroll>
			</q-scroll-area>
		</q-card-section>

		<q-card-actions class="justify-center">
			<q-btn flat label="確定" @click="ConfirmSelect();"></q-btn>
			<q-btn flat label="取消" @click="CancelSelect();"></q-btn>
		</q-card-actions>
	</q-card>

</template>

<script>

export default {
	name:"dataset-select",
	props: {
		forUpload: Boolean,
		forAnnotation: Boolean
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
			if(this.forUpload){
				url += "&enableUpload=1";
			}
			if(this.forAnnotation){
				url += "&enableAnnotation=1";
			}
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
		},
		ConfirmSelect: function(){
			this.$emit("confirm");
		},
		CancelSelect: function(){
			this.$emit("cancel");
		}
	}
}
</script>

<style lang="scss">
.dataset-select{
	width: 100%;
}
</style>