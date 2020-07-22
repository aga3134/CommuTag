<template lang="html">
	<div class="api-key-list q-pa-md">
		<div class="row">
			<div class="col-shrink">
				<q-btn class="bg-grey-8 text-white" icon="add" label="新增金鑰" @click="AddNewKey();"></q-btn>
			</div>
		</div>
		
		<q-list class="q-my-md" bordered>
			<q-item v-for="(key,i) in keyArr" :key="key._id">
				<q-item-section>
					<q-item-label>{{key.key}}</q-item-label>
					<q-item-label caption lines="1">{{key.desc}}</q-item-label>
				</q-item-section>

				<q-item-section side>
					<div class="row">
						<q-btn flat dense icon="edit" class="text-gray-8" @click="EditKey(i);"></q-btn>
						<q-btn flat dense icon="close" class="text-gray-8" @click="DeleteKey(i);"></q-btn>
					</div>
				</q-item-section>
			</q-item>
		</q-list>

		<q-dialog v-model="openEditKey">
			<q-card class="full-width">
				<q-card-section>
					<div v-if="editKey._id" class="text-h6">編輯金鑰</div>
					<div v-else class="text-h6">新增金鑰</div>
				</q-card-section>

				<q-card-section>
					<q-input class="q-ma-sm" v-model="editKey.key" label="金鑰" :disable="editKey._id">
						<template v-slot:append>
							<q-btn flat class="bg-grey-8 text-white" label="亂數產生" @click="GenRandomKey();"></q-btn>
						</template>
					</q-input>

					<q-select class="q-ma-sm" dense v-model="editKey.scope" :options="scopeOption" option-value="value" option-label="label" emit-value map-options label="適用範圍"></q-select>

					<dataset-select-list v-if="editKey.scope=='target' " :list="editKey.dataset" enableAdd enableRemove @add="AddDatasetToKey" @remove="RemoveDatasetFromKey"></dataset-select-list>
					
					<div class="text-subtitle1">金鑰說明</div>
					<q-input v-model="editKey.desc" filled></q-input>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn flat label="儲存" color="primary" @click="AddKey();" />
					<q-btn flat label="取消" color="primary" v-close-popup />
				</q-card-actions>
			</q-card>
		</q-dialog>

	</div>
</template>

<script>
import datasetSelectList from "./dataset-select-list.vue"


export default {
	name:"api-key-list",
	props: {
		
	},
	components:{
		"dataset-select-list": datasetSelectList
	},
	data: function () {
		return {
			keyArr: [],
			openEditKey: false,
			editKey: {key:"",desc:"",scope:"all",dataset:[]},
			scopeOption: [
				{label: "全部資料集",value:"all"},
				{label: "特定資料集",value:"target"}
			],
		};
	},
	created: function(){
		this.LoadKey();
	},
	methods: {
		LoadKey: function(){
			$.get("/api/list-key", function(result){
				if(result.status != "ok") return;
				this.keyArr = result.data;
			}.bind(this));
		},
		GenRandomKey: function(){
			this.editKey.key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		},
		AddNewKey: function(){
			this.editKey = {key:"",desc:"",scope:"all",dataset:[]};
			this.openEditKey = true;
		},
		AddKey: function(){
			if(!this.editKey.key || this.editKey.key == "") return alert("請輸入金鑰");
			this.openEditKey = false;
			var csrfToken = $("meta[name='csrf-token']").attr("content");
			var data = {};
			data.key = this.editKey.key;
			data.desc = this.editKey.desc;
			data.scope = this.editKey.scope;
			data.dataset = this.editKey.dataset;
			data._csrf = csrfToken;
			$.post("/api/add-key",data,function(result){
				if(result.status != "ok") return alert("修改金鑰失敗");
				this.$q.notify("修改金鑰成功");
				this.LoadKey();
			}.bind(this));
		},
		DeleteKey: function(i){
			if(i<0 || i>= this.keyArr.length) return;
			var key = this.keyArr[i];
			if(confirm("確定刪除金鑰 "+key.key+" ?")){
				var csrfToken = $("meta[name='csrf-token']").attr("content");
				var data = {};
				data.id = key._id;
				data._csrf = csrfToken;
				$.post("/api/delete-key",data,function(result){
					if(result.status != "ok") return alert("刪除金鑰失敗");
					this.$q.notify("刪除金鑰成功");
					this.LoadKey();
				}.bind(this));
			}
		},
		EditKey: function(i){
			if(i<0 || i>= this.keyArr.length) return;
			this.editKey = this.keyArr[i];
			this.openEditKey = true;
		},
		AddDatasetToKey: function(dataset){
			this.editKey.dataset.push(dataset._id);
		},
		RemoveDatasetFromKey: function(i){
			if(i<0 || i>= this.keyArr.length) return;
			this.editKey.dataset.splice(i,1);
		}
	}
}
</script>

<style lang="scss">
.api-key-list{
	width: 100%;
}
</style>